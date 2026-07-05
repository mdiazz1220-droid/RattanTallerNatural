import React, { useState, useRef } from 'react';
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
  Sparkles, 
  Lock, 
  DollarSign, 
  Image as ImageIcon 
} from 'lucide-react';

interface AdminProps {
  products: Product[];
  onProductsChange: (newProducts: Product[]) => void;
  onBack: () => void;
  onResetToDefaults: () => void;
}

const CATEGORIES = ['Sillas y Salas', 'Mesas y Comedores', 'Accesorios', 'Pets y Nidos'] as const;

export const Admin: React.FC<AdminProps> = ({ 
  products, 
  onProductsChange, 
  onBack, 
  onResetToDefaults 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');
  
  // Edit state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Form fields
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState(0);
  const [formCategory, setFormCategory] = useState<typeof CATEGORIES[number]>('Sillas y Salas');
  const [formDescription, setFormDescription] = useState('');
  const [formLongDescription, setFormLongDescription] = useState('');
  const [formFeatures, setFormFeatures] = useState<string[]>([]);
  const [newFeatureText, setNewFeatureText] = useState('');
  const [formImageUrl, setFormImageUrl] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '1234' || passcode === 'admin' || passcode === '') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Contraseña incorrecta. (Consejo: usa "1234" o déjalo vacío)');
    }
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
    setFormImageUrl(product.imageUrl);
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
    setFormImageUrl('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Convert uploaded image to Base64
  const handleImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona un archivo de imagen válido.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result && typeof e.target.result === 'string') {
        setFormImageUrl(e.target.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFile(e.target.files[0]);
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageFile(e.dataTransfer.files[0]);
    }
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

  const handleDeleteProduct = (id: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      const newProducts = products.filter(p => p.id !== id);
      onProductsChange(newProducts);
      showNotification('Producto eliminado correctamente.');
      if (editingProduct?.id === id) {
        cancelForm();
      }
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

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('El nombre del producto es obligatorio.');
      return;
    }
    if (formPrice <= 0) {
      alert('El precio debe ser mayor a cero.');
      return;
    }
    if (!formImageUrl) {
      alert('Debes agregar o subir una imagen para el producto.');
      return;
    }

    if (isCreating) {
      const newProduct: Product = {
        id: `prod_${Date.now()}`,
        name: formName.trim(),
        tagline: formTagline.trim() || 'Tejido artesanal premium',
        description: formDescription.trim() || 'Hecho con rattan seleccionado por artesanos en Cali.',
        longDescription: formLongDescription.trim(),
        price: formPrice,
        category: formCategory,
        imageUrl: formImageUrl,
        gallery: [formImageUrl],
        features: formFeatures.length > 0 ? formFeatures : ['Tejido 100% artesanal', 'Durabilidad garantizada']
      };

      onProductsChange([newProduct, ...products]);
      showNotification('¡Producto creado con éxito!');
    } else if (editingProduct) {
      const updatedProducts = products.map(p => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            name: formName.trim(),
            tagline: formTagline.trim(),
            description: formDescription.trim(),
            longDescription: formLongDescription.trim(),
            price: formPrice,
            category: formCategory,
            imageUrl: formImageUrl,
            gallery: [formImageUrl],
            features: formFeatures
          };
        }
        return p;
      });

      onProductsChange(updatedProducts);
      showNotification('¡Producto actualizado con éxito!');
    }

    cancelForm();
  };

  const triggerReset = () => {
    if (confirm('¿Estás seguro de que deseas restablecer el catálogo de fábrica? Esto eliminará tus productos personalizados.')) {
      onResetToDefaults();
      showNotification('Catálogo restablecido al diseño editorial original.');
      cancelForm();
    }
  };

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
              <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Contraseña o Pin de acceso</label>
              <input 
                type="password" 
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Ingresa la contraseña para continuar..."
                className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
              />
              <span className="block text-[11px] text-[#A8A29E] mt-2">PIN por defecto: <span className="font-mono text-[#5D5A53]">1234</span> (o simplemente presiona "Ingresar")</span>
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
                className="flex-1 bg-[#2C2A26] text-[#F5F2EB] py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#444] transition-colors"
              >
                Ingresar
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
        {/* Banner de Éxito Flotante */}
        {successMessage && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50 bg-[#2C2A26] text-[#F5F2EB] border border-[#D6D1C7]/30 px-6 py-4 shadow-2xl flex items-center gap-3 animate-slide-up-fade">
            <Check className="w-5 h-5 text-emerald-400" />
            <span className="text-sm font-medium tracking-wide">{successMessage}</span>
          </div>
        )}

        {/* Top Header Row */}
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
          </div>
        </div>

        {/* Form Overlay or Panel */}
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
              {/* Left Column: Form Details */}
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
                      {CATEGORIES.map(cat => (
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

              {/* Right Column: Image and Features */}
              <div className="space-y-6">
                {/* Image Upload Area */}
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#5D5A53] mb-2 font-medium">Fotografía del Mueble *</label>
                  <div className="space-y-4">
                    {formImageUrl ? (
                      <div className="relative group aspect-video bg-white border border-[#D6D1C7] overflow-hidden flex items-center justify-center">
                        <img 
                          src={formImageUrl} 
                          alt="Previsualización" 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-[#2C2A26]/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                          <button 
                            type="button"
                            onClick={() => setFormImageUrl('')}
                            className="bg-[#F5F2EB] text-[#2C2A26] px-4 py-2 text-xs uppercase tracking-widest font-medium hover:bg-white transition-colors"
                          >
                            Eliminar foto
                          </button>
                        </div>
                      </div>
                    ) : (
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
                        <Upload className="w-8 h-8 text-[#A8A29E]" />
                        <div className="space-y-1">
                          <p className="text-xs font-medium text-[#2C2A26]">Sube una foto de tus redes sociales o tu galería</p>
                          <p className="text-[11px] text-[#A8A29E]">Arrastra y suelta tu archivo aquí o haz clic para buscar</p>
                        </div>
                        <input 
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/*"
                          className="hidden"
                        />
                      </div>
                    )}

                    <div>
                      <span className="block text-[11px] text-[#5D5A53] mb-1 uppercase tracking-widest">O pega un enlace de imagen de la web (Instagram, Unsplash, etc.)</span>
                      <input 
                        type="url" 
                        value={formImageUrl}
                        onChange={(e) => setFormImageUrl(e.target.value)}
                        placeholder="https://..."
                        className="w-full bg-white border border-[#D6D1C7] focus:border-[#2C2A26] px-4 py-3 text-sm outline-none transition-colors text-[#2C2A26]"
                      />
                    </div>
                  </div>
                </div>

                {/* Features Creator */}
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

                {/* Buttons Bar */}
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
                    className="bg-[#2C2A26] text-[#F5F2EB] px-8 py-3.5 text-xs uppercase tracking-widest font-medium hover:bg-[#444] transition-colors shadow-md flex items-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>{isCreating ? 'Crear Producto' : 'Guardar Cambios'}</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}

        {/* Products List Grid/Table */}
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
                {products.map(product => (
                  <tr key={product.id} className="hover:bg-[#E2DED5]/40 transition-colors">
                    {/* Thumbnail */}
                    <td className="py-5 px-6">
                      <div className="w-16 h-16 bg-white border border-[#D6D1C7] overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    {/* Description */}
                    <td className="py-5 px-6 space-y-1 max-w-md">
                      <h4 className="font-medium text-[#2C2A26] text-base">{product.name}</h4>
                      <p className="text-xs italic text-[#5D5A53] line-clamp-1">{product.tagline}</p>
                      <p className="text-xs text-[#A8A29E] line-clamp-2">{product.description}</p>
                    </td>

                    {/* Category */}
                    <td className="py-5 px-6">
                      <span className="inline-block bg-[#D6D1C7]/40 text-[#2C2A26] text-xs px-3 py-1 uppercase tracking-wider font-light">
                        {product.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-5 px-6 font-mono font-medium text-[#2C2A26] text-base">
                      ${product.price.toLocaleString('es-CO')} COP
                    </td>

                    {/* Actions */}
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
