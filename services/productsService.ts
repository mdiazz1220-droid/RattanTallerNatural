/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { supabase, PRODUCT_IMAGES_BUCKET } from '../lib/supabaseClient';
import { Product } from '../types';
import { PRODUCTS as DEFAULT_PRODUCTS } from '../constants';

// Fila tal como vive en la tabla `products` de Supabase (snake_case)
interface ProductRow {
  id: string;
  name: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  price: number;
  category: string;
  image_url: string;
  gallery: string[] | null;
  features: string[] | null;
}

const rowToProduct = (row: ProductRow): Product => ({
  id: row.id,
  name: row.name,
  tagline: row.tagline || '',
  description: row.description || '',
  longDescription: row.long_description || '',
  price: Number(row.price),
  category: row.category as Product['category'],
  imageUrl: row.image_url,
  gallery: row.gallery && row.gallery.length > 0 ? row.gallery : [row.image_url],
  features: row.features || [],
});

const productToRow = (product: Product) => ({
  id: product.id,
  name: product.name,
  tagline: product.tagline,
  description: product.description,
  long_description: product.longDescription || '',
  price: product.price,
  category: product.category,
  image_url: product.imageUrl,
  gallery: product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl],
  features: product.features,
  updated_at: new Date().toISOString(),
});

/** Trae todo el catálogo, ordenado por fecha de creación (más nuevo primero) */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error cargando productos desde Supabase:', error);
    throw error;
  }
  return (data as ProductRow[]).map(rowToProduct);
}

/** Crea un producto nuevo. Genera un id único si no se provee. */
export async function createProduct(product: Product): Promise<Product> {
  const row = productToRow(product);
  const { data, error } = await supabase
    .from('products')
    .insert(row)
    .select()
    .single();

  if (error) {
    console.error('Error creando producto en Supabase:', error);
    throw error;
  }
  return rowToProduct(data as ProductRow);
}

/** Actualiza un producto existente por id */
export async function updateProduct(product: Product): Promise<Product> {
  const row = productToRow(product);
  const { data, error } = await supabase
    .from('products')
    .update(row)
    .eq('id', product.id)
    .select()
    .single();

  if (error) {
    console.error('Error actualizando producto en Supabase:', error);
    throw error;
  }
  return rowToProduct(data as ProductRow);
}

/** Elimina un producto por id */
export async function deleteProduct(id: string): Promise<void> {
  const { error } = await supabase.from('products').delete().eq('id', id);
  if (error) {
    console.error('Error eliminando producto en Supabase:', error);
    throw error;
  }
}

/**
 * Borra todo el catálogo actual en Supabase y lo reemplaza por los
 * productos de fábrica definidos en constants.ts
 */
export async function resetToDefaults(): Promise<Product[]> {
  const { error: deleteError } = await supabase
    .from('products')
    .delete()
    .not('id', 'is', null); // borra todas las filas

  if (deleteError) {
    console.error('Error limpiando productos en Supabase:', deleteError);
    throw deleteError;
  }

  const rows = DEFAULT_PRODUCTS.map(productToRow);
  const { data, error: insertError } = await supabase
    .from('products')
    .insert(rows)
    .select();

  if (insertError) {
    console.error('Error reinsertando productos de fábrica:', insertError);
    throw insertError;
  }
  return (data as ProductRow[]).map(rowToProduct);
}

/**
 * Sube una imagen al bucket `product-images` y devuelve su URL pública.
 * El nombre de archivo se prefija con un timestamp para evitar colisiones.
 */
export async function uploadProductImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const path = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}_${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from(PRODUCT_IMAGES_BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    });

  if (uploadError) {
    console.error('Error subiendo imagen a Supabase Storage:', uploadError);
    throw uploadError;
  }

  const { data } = supabase.storage.from(PRODUCT_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Elimina una imagen del bucket si la URL pertenece a nuestro storage.
 * Si la imagen es una URL externa (Unsplash, etc.) o un asset local (/assets/...), no hace nada.
 */
export async function deleteProductImageIfOwned(url: string): Promise<void> {
  try {
    const marker = `/storage/v1/object/public/${PRODUCT_IMAGES_BUCKET}/`;
    const idx = url.indexOf(marker);
    if (idx === -1) return; // no es una imagen de nuestro bucket, no borrar

    const path = url.slice(idx + marker.length);
    const { error } = await supabase.storage.from(PRODUCT_IMAGES_BUCKET).remove([path]);
    if (error) console.error('Error eliminando imagen del storage:', error);
  } catch (e) {
    console.error('Error procesando eliminación de imagen:', e);
  }
}
