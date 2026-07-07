/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { Product } from '../types';
import {
  Plus,
  Trash2,
  Edit2,
  ArrowLeft,
  Upload,
  RotateCcw,
  Check,
  AlertCircle,
  Lock,
  DollarSign,
  LogOut,
  Loader2,
  X,
  Star,
} from 'lucide-react';
import { signIn, signOut, getCurrentSession, onAuthStateChange } from '../services/authService';
import {
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  deleteProductImageIfOwned,
} from '../services/productsService';

interface AdminProps {
  products: Product[];
  onProductsChange: (newProducts: Product[]) => void;
  onBack: () => void;
  onResetToDefaults: () => void | Promise<void>;
  onRefresh: () => void | Promise<void>;
}

const CATEGORIES = ['Sillas y Salas', 'Mesas y Comedores', 'Accesorios', 'Pets y Nidos'] as const;

export const Admin: React.FC<AdminProps> = ({
  products,
  onProductsChange,
  onBack,
  onResetToDefaults,
  onRefresh,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // null = verificando sesión
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  // Edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Form fields
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formCategory, setFormCategory] = useState<typeof CATEGORIES[number]>('Sillas y Salas');
  const [formDescription, setFormDescription] = useState('');
  const [formLongDescription, setFormLongDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [formGallery, setFormGallery] = useState<string[]>([]); // varias imágenes por producto
  const [uploadingCount, setUploadingCount] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCurrentSession().then((session) => setIsAuthenticated(!!session));
    const subscription = onAuthStateChange((authed) => setIsAuthenticated(authed));
    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');
    try {
      await signIn(email.trim(), password);
    } catch (err: any) {
      setAuthError('Correo o contraseña incorrectos.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut();
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setIsCreating(false);
    setFormName(product.name);
    setFormTagline(product.tagline);
    setFormPrice(product.price);
    setFormCategory(product.category as typeof CATEGORIES[number]);
    setFormDescription(product.description);
    setFormLongDescription(product.longDescription || '');
    setFormFeatures(product.features || []);
    setFormGallery(product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startCreate = () => {
    setEditingProduct(null);
    setIsCreating(true);
    setFormName('');
    setFormTagline('');
    setFormPrice(0);
    setFormCategory('Sillas y Salas');
    setFormDescription('');
    setFormLongDescription('');
    setFormFeatures([]);
    setFormGallery([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleImageFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (list.length === 0) {
      alert('Por favor selecciona archivos de imagen válidos.');
      return;
    }
    setUploadingCount(list.length);
    try {
      const uploadedUrls = await Promise.all(list.map((file) => uploadProductImage(file)));
      setFormGallery((prev) => [...prev, ...uploadedUrls]);
    } catch (err) {
      console.error(err);
      alert('Ocurrió un error subiendo una o más imágenes. Intenta de nuevo.');
    } finally {
      setUploadingCount(0);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleImageFiles(e.target.files);
      e.target.value = '';
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImageFiles(e.dataTransfer.files);
    }
  };

  const handleAddImageUrl = (url: string) => {
    if (url.trim()) {
      setFormGallery((prev) => [...prev, url.trim()]);
    }
  };

  const handleRemoveGalleryImage = async (index: number) => {
    const url = formGallery[index];
    setFormGallery((prev) => prev.filter((_, i) => i !== index));
    const stillUsedElsewhere = products.some(
      (p) => p.id !== editingProduct?.id && (p.imageUrl === url || p.gallery?.includes(url))
    );
    if (!stillUsedElsewhere) {
      deleteProductImageIfOwned(url).catch(() => {});
    }
  };

  const handleSetCover = (index: number) => {
    setFormGallery((prev) => {
      const next = [...prev];
      const [selected] = next.splice(index, 1);
      next.unshift(selected);
      return next;
    });
  };

  const handleAddFeature = () => {
    if (newFeatureText.trim()) {
      setFormFeatures([...formFeatures, newFeatureText.trim()]);
      setNewFeatureText('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormFeatures(formFeatures.filter((_, idx) => idx !== index));
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto?')) return;
    try {
      await deleteProduct(id);
      onProductsChange(products.filter((p) => p.id !== id));
      showNotification('Producto eliminado correctamente.');
      if (editingProduct?.id === id) cancelForm();
    } catch {
      alert('No se pudo eliminar el producto. Intenta de nuevo.');
    }
  };

  const showNotification = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const cancelForm = () => {
    setEditingProduct(null);
    setIsCreating(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('El nombre del producto es obligatorio.');
      return;
    }
    if (formPrice <= 0) {
      alert('El precio debe ser mayor a cero.');
      return;
    }
    if (formGallery.length === 0) {
      alert('Debes agregar al menos una imagen para el producto.');
      return;
    }

    setIsSaving(true);
    try {
      if (isCreating) {
        const newProduct: Product = {
          id: `prod_${Date.now()}`,
          name: formName.trim(),
          tagline: formTagline.trim() || 'Tejido artesanal premium',
          description: formDescription.trim() || 'Hecho con rattan seleccionado por artesanos en Cali.',
          longDescription: formLongDescription.trim(),
          price: formPrice,
          category: formCategory,
          imageUrl: formGallery[0],
          gallery: formGallery,
          features: formFeatures.length > 0 ? formFeatures : ['Tejido 100% artesanal', 'Durabilidad garantizada'],
        };
        const created = await createProduct(newProduct);
        onProductsChange([created, ...products]);
        showNotification('¡Producto creado con éxito!');
      } else if (editingProduct) {
        const updated: Product = {
          ...editingProduct,
          name: formName.trim(),
          tagline: formTagline.trim(),
          description: formDescription.trim(),
          longDescription: formLongDescription.trim(),
          price: formPrice,
          category: formCategory,
          imageUrl: formGallery[0],
          gallery: formGallery,
          features: formFeatures,
        };
        const saved = await updateProduct(updated);
        onProductsChange(products.map((p) => (p.id === saved.id ? saved : p)));
        showNotification('¡Producto actualizado con éxito!');
      }
      cancelForm();
    } catch {
      alert('No se pudo guardar el producto. Revisa tu conexión e intenta de nuevo.');
    } finally {
      setIsSaving(false);
    }
  };

  const triggerReset = async () => {
    if (!confirm('¿Estás seguro de que deseas restablecer el catálogo de fábrica? Esto eliminará tus productos personalizados para TODOS los visitantes.')) {
      return;
    }
    await onResetToDefaults();
    showNotification('Catálogo restablecido al diseño editorial original.');
    cancelForm();
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB]">
        <Loader2 className="w-6 h-6 animate-spin text-[#2C2A26]" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F2EB] px-6 py-12">
        <div className="w-full max-w-md bg-[#EBE7DE] border border-[#D6D1C7] p-8 md:p-10 shadow-xl space-y-8 animate-slide-up-fade">
          <div className="text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-[#2C2A26] flex items-center justify-center text-[#F5F2EB] rounded-full">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl md:text-3xl font-serif text-[#2C2A26]">Acceso de Administrador</h2>
            <p className="text-xs text-[#A8A29E] uppercase tracking-widest">RATTAN TALLER NATURAL — CALI</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Correo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@tudominio.com"
                className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
              />
            </div>

            {authError && (
              <div className="flex gap-2 items-start bg-red-50 text-red-700 p-3 text-xs border border-red-200">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{authError}</span>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="button"
                onClick={onBack}
                className="flex-1 bg-transparent border border-[#2C2A26] text-[#2C2A26] py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#2C2A26] hover:text-[#F5F2EB] transition-colors"
              >
                Volver
              </button>
              <button
                type="submit"
                disabled={authLoading}
                className="flex-1 bg-[#2C2A26] text-[#F5F2EB] py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#444] transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {authLoading && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>Ingresar</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F2EB] pt-24 pb-32 px-6 md:px-12 font-sans">
      <div className="max-w-[1400px] mx-auto space-y-12">
        {successMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#2C2A26] text-[#F5F2EB] border border-[#D6D1C7]/30 px-6 py-4 shadow-2xl flex items-center gap-3 animate-slide-up-fade">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium tracking-wide">{successMessage}</span>
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#D6D1C7]">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A8A29E]">
              <span>Panel de Control</span>
              <span>•</span>
              <span className="text-[#5D5A53] font-medium">Panel Administrativo</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#2C2A26]">Gestor de Inventario</h1>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 border border-[#2C2A26] text-[#2C2A26] px-5 py-3 text-xs uppercase tracking-widest hover:bg-[#2C2A26] hover:text-[#F5F2EB] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Tienda</span>
            </button>
            <button
              onClick={triggerReset}
              className="flex items-center gap-2 border border-[#A8A29E] text-[#5D5A53] px-5 py-3 text-xs uppercase tracking-widest hover:border-[#2C2A26] hover:text-[#2C2A26] transition-all"
              title="Restablece los productos de fábrica de Rattan Taller Natural"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Restablecer</span>
            </button>
            <button
              onClick={startCreate}
              className="flex items-center gap-2 bg-[#2C2A26] text-[#F5F2EB] px-6 py-3 text-xs uppercase tracking-widest hover:bg-[#444] transition-all shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Nuevo Producto</span>
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 border border-[#A8A29E] text-[#5D5A53] px-5 py-3 text-xs uppercase tracking-widest hover:border-red-400 hover:text-red-600 transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span>Salir</span>
            </button>
          </div>
        </div>

        {(isCreating || editingProduct) && (
          <div className="bg-[#EBE7DE] border border-[#D6D1C7] p-6 md:p-10 shadow-xl space-y-8 animate-slide-up-fade">
            <div className="flex items-center justify-between pb-4 border-b border-[#D6D1C7]">
              <h2 className="text-xl md:text-2xl font-serif text-[#2C2A26]">
                {isCreating ? 'Agregar Nuevo Mueble o Accesorio' : `Editar: ${editingProduct?.name}`}
              </h2>
              <button
                onClick={cancelForm}
                className="text-[#5D5A53] hover:text-[#2C2A26] text-xs uppercase tracking-widest"
              >
                Cancelar
              </button>
            </div>

            <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ej. Silla Acapulco Rattan"
                      className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Categoría *</label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as typeof CATEGORIES[number])}
                      className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Precio (COP) *</label>
                    <div className="relative">
                      <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A8A29E]" />
                      <input
                        type="number"
                        required
                        min="1"
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        placeholder="Ej. 380000"
                        className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] pl-10 pr-4 py-3 text-sm outline-none transition-colors text-[#2C2A26] font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Eslogan / Slogan Corto</label>
                    <input
                      type="text"
                      value={formTagline}
                      onChange={(e) => setFormTagline(e.target.value)}
                      placeholder="Ej. Clásico reinterpretado con calidez natural"
                      className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Descripción Corta *</label>
                  <textarea
                    rows={2}
                    required
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Descripción rápida para la grilla de productos..."
                    className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Descripción Detallada (Historia, Curado, etc.)</label>
                  <textarea
                    rows={4}
                    value={formLongDescription}
                    onChange={(e) => setFormLongDescription(e.target.value)}
                    placeholder="Escribe la historia o especificaciones de este mueble para la vista detallada..."
                    className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">
                    Fotografías del Mueble * <span className="text-[#A8A29E]">(puedes subir varias)</span>
                  </label>
                  <div className="space-y-4">
                    {formGallery.length > 0 && (
                      <div className="grid grid-cols-3 gap-3">
                        {formGallery.map((url, idx) => (
                          <div key={url + idx} className="relative group aspect-square bg-white border border-[#D6D1C7] overflow-hidden">
                            <img src={url} alt={`Foto ${idx + 1}`} className="w-full h-full object-cover" />
                            {idx === 0 && (
                              <span className="absolute top-1 left-1 bg-[#2C2A26] text-[#F5F2EB] text-[9px] px-1.5 py-0.5 uppercase tracking-wider flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-current" /> Portada
                              </span>
                            )}
                            <div className="absolute inset-0 bg-[#2C2A26]/75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                              {idx !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => handleSetCover(idx)}
                                  title="Usar como portada"
                                  className="bg-[#F5F2EB] text-[#2C2A26] p-1.5 hover:bg-white transition-colors"
                                >
                                  <Star className="w-3.5 h-3.5" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveGalleryImage(idx)}
                                title="Eliminar foto"
                                className="bg-[#F5F2EB] text-red-600 p-1.5 hover:bg-white transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    <div
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`aspect-video border-2 border-dashed flex flex-col items-center justify-center gap-3 p-6 text-center cursor-pointer transition-colors ${
                        dragActive
                          ? 'border-[#2C2A26] bg-[#2C2A26]/5'
                          : 'border-[#D6D1C7] bg-white hover:border-[#2C2A26]'
                      }`}
                    >
                      {uploadingCount > 0 ? (
                        <>
                          <Loader2 className="w-8 h-8 text-[#2C2A26] animate-spin" />
                          <p className="text-xs font-medium text-[#2C2A26]">Subiendo {uploadingCount} imagen(es)...</p>
                        </>
                      ) : (
                        <>
                          <Upload className="w-8 h-8 text-[#A8A29E]" />
                          <div className="space-y-1">
                            <p className="text-xs font-medium text-[#2C2A26]">Sube una o varias fotos del mueble</p>
                            <p className="text-[11px] text-[#A8A29E]">Arrastra y suelta tus archivos aquí o haz clic para buscar</p>
                          </div>
                        </>
                      )}
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        multiple
                        className="hidden"
                      />
                    </div>

                    <div>
                      <span className="block text-[11px] text-[#5D5A53] mb-1 uppercase tracking-widest">O agrega un enlace de imagen de la web (Instagram, Unsplash, etc.)</span>
                      <div className="flex gap-2">
                        <input
                          type="url"
                          id="admin-image-url-input"
                          placeholder="https://..."
                          className="flex-1 bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              handleAddImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('admin-image-url-input') as HTMLInputElement;
                            if (input) {
                              handleAddImageUrl(input.value);
                              input.value = '';
                            }
                          }}
                          className="bg-[#2C2A26] text-[#F5F2EB] px-4 hover:bg-[#444] transition-colors text-xs uppercase tracking-widest font-medium"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Características Clave (Ej. Tejido 100% artesanal)</label>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeatureText}
                        onChange={(e) => setNewFeatureText(e.target.value)}
                        placeholder="Ej. Madera maciza curada..."
                        className="flex-1 bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="bg-[#2C2A26] text-[#F5F2EB] px-4 hover:bg-[#444] transition-colors text-xs uppercase tracking-widest font-medium"
                      >
                        Agregar
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {formFeatures.map((feat, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 bg-[#2C2A26] text-[#F5F2EB] px-3 py-1.5 text-xs font-light"
                        >
                          <span>{feat}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveFeature(idx)}
                            className="text-[#A8A29E] hover:text-[#F5F2EB] transition-colors"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {formFeatures.length === 0 && (
                        <span className="text-xs italic text-[#A8A29E]">No has agregado características especiales aún.</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-6 border-t border-[#D6D1C7] justify-end">
                  <button
                    type="button"
                    onClick={cancelForm}
                    className="border border-[#2C2A26] text-[#2C2A26] px-6 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-[#2C2A26] hover:text-[#F5F2EB] transition-colors"
                  >
                    Descartar
                  </button>
                  <button
                    type="submit"
                    disabled={isSaving || uploadingCount > 0}
                    className="bg-[#2C2A26] text-[#F5F2EB] px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-[#444] transition-colors shadow-md flex items-center gap-2 disabled:opacity-60"
                  >
                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                    <span>{isCreating ? 'Crear Producto' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        <div className="bg-[#EBE7DE] border border-[#D6D1C7] overflow-hidden shadow-sm">
          <div className="p-6 md:p-8 border-b border-[#D6D1C7] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="font-serif text-xl md:text-2xl text-[#2C2A26]">Artículos en Exhibición ({products.length})</h3>
            <span className="text-xs text-[#5D5A53]">Los cambios se reflejarán instantáneamente en el catálogo de cara al cliente</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#E2DED5] text-xs uppercase tracking-widest text-[#5D5A53] font-medium border-b border-[#D6D1C7]">
                  <th className="py-4 px-6 w-24">Imagen</th>
                  <th className="py-4 px-6">Detalles del Producto</th>
                  <th className="py-4 px-6 w-40">Categoría</th>
                  <th className="py-4 px-6 w-40">Precio</th>
                  <th className="py-4 px-6 w-32 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D6D1C7]/60 text-sm">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-[#E2DED5]/40 transition-colors">
                    <td className="py-5 px-6">
                      <div className="w-16 h-16 bg-white border border-[#D6D1C7] overflow-hidden relative">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        {product.gallery && product.gallery.length > 1 && (
                          <span className="absolute bottom-0 right-0 bg-[#2C2A26] text-[#F5F2EB] text-[9px] px-1">
                            +{product.gallery.length - 1}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-5 px-6 space-y-1 max-w-md">
                      <h4 className="font-medium text-[#2C2A26] text-base">{product.name}</h4>
                      <p className="text-xs italic text-[#5D5A53] line-clamp-1">{product.tagline}</p>
                      <p className="text-xs text-[#A8A29E] line-clamp-2">{product.description}</p>
                    </td>

                    <td className="py-5 px-6">
                      <span className="inline-block bg-[#D6D1C7]/40 text-[#2C2A26] text-xs px-3 py-1 uppercase tracking-wider font-light">
                        {product.category}
                      </span>
                    </td>

                    <td className="py-5 px-6 font-mono font-medium text-[#2C2A26] text-base">
                      ${product.price.toLocaleString('es-CO')} COP
                    </td>

                    <td className="py-5 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => startEdit(product)}
                          className="p-2.5 bg-white border border-[#D6D1C7] text-[#5D5A53] hover:text-[#2C2A26] hover:border-[#2C2A26] transition-colors"
                          title="Editar"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="p-2.5 bg-white border border-[#D6D1C7] text-red-700 hover:bg-red-50 hover:border-red-300 transition-colors"
                          title="Eliminar"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {products.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-sm italic text-[#A8A29E]">
                      No hay productos registrados en este momento. Haz clic en "Nuevo Producto" para registrar uno.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
