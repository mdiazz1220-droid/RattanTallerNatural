/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import About from './components/About';
import Journal from './components/Journal';
import Assistant from './components/Assistant';
import Footer from './components/Footer';
import ProductDetail from './components/ProductDetail';
import JournalDetail from './components/JournalDetail';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import { Admin } from './components/Admin';
import WhatsAppButton from './components/WhatsAppButton';
import { PRODUCTS } from './constants';
import { Product, JournalArticle, ViewState } from './types';
import { fetchProducts, resetToDefaults } from './services/productsService';

function App() {
  const [view, setView] = useState<ViewState>({ type: 'home' });
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const data = await fetchProducts();
      setProducts(data);
    } catch (e) {
      console.error('No se pudo cargar el catálogo desde Supabase:', e);
      setProductsError('No se pudo cargar el catálogo en este momento. Mostrando catálogo de referencia.');
      setProducts(PRODUCTS);
    } finally {
      setProductsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // El Admin ya persiste los cambios directamente en Supabase;
  // aquí solo sincronizamos el estado local para reflejarlos al instante.
  const handleProductsChange = (newProducts: Product[]) => {
    setProducts(newProducts);
  };

  const handleResetToDefaults = async () => {
    try {
      const restored = await resetToDefaults();
      setProducts(restored);
    } catch (e) {
      console.error('Error restableciendo catálogo de fábrica:', e);
      alert('No se pudo restablecer el catálogo. Intenta de nuevo.');
    }
  };

  // Handle navigation (clicks on Navbar or Footer links)
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // If we are not home, go home first
    if (view.type !== 'home') {
      setView({ type: 'home' });
      // Allow state update to render Home before scrolling
      setTimeout(() => scrollToSection(targetId), 0);
    } else {
      scrollToSection(targetId);
    }
  };

  const scrollToSection = (targetId: string) => {
    if (!targetId) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });

      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  const addToCart = (product: Product) => {
    setCartItems([...cartItems, product]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index: number) => {
    const newItems = [...cartItems];
    newItems.splice(index, 1);
    setCartItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] font-sans text-[#2C2A26] selection:bg-[#D6D1C7] selection:text-[#2C2A26]">
      {view.type !== 'checkout' && view.type !== 'admin' && (
        <Navbar 
            onNavClick={handleNavClick} 
            cartCount={cartItems.length}
            onOpenCart={() => setIsCartOpen(true)}
        />
      )}
      
      <main>
        {view.type === 'home' && (
          <>
            <Hero />
            {productsError && (
              <div className="max-w-3xl mx-auto mt-6 px-4">
                <div className="bg-amber-50 border border-amber-300 text-amber-800 text-xs px-4 py-3 text-center">
                  {productsError}
                </div>
              </div>
            )}
            <ProductGrid 
              products={products}
              onProductClick={(p) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'product', product: p });
              }} 
            />
            <About />
            <Journal onArticleClick={(a) => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setView({ type: 'journal', article: a });
            }} />
          </>
        )}

        {view.type === 'product' && (
          <ProductDetail 
            product={view.product} 
            onBack={() => {
              setView({ type: 'home' });
              setTimeout(() => scrollToSection('products'), 50);
            }}
            onAddToCart={addToCart}
          />
        )}

        {view.type === 'journal' && (
          <JournalDetail 
            article={view.article} 
            onBack={() => setView({ type: 'home' })}
          />
        )}

        {view.type === 'checkout' && (
            <Checkout 
                items={cartItems}
                onBack={() => setView({ type: 'home' })}
            />
        )}

        {view.type === 'admin' && (
          <Admin 
            products={products}
            onProductsChange={handleProductsChange}
            onResetToDefaults={handleResetToDefaults}
            onRefresh={loadProducts}
            onBack={() => setView({ type: 'home' })}
          />
        )}
      </main>

      {view.type !== 'checkout' && view.type !== 'admin' && (
        <Footer 
          onLinkClick={handleNavClick} 
          onAdminClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'admin' });
          }}
        />
      )}
      
      <Assistant />
      <WhatsAppButton />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
            setIsCartOpen(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setView({ type: 'checkout' });
        }}
      />
    </div>
  );
}

export default App;
