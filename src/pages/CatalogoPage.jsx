import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../features/products/ProductCard';
import { useSearchParams } from 'react-router-dom';

function CatalogoPage() {
  const { productos } = useProducts();
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria');

  const productosFiltrados = categoriaFiltro
    ? productos.filter(p => p.categoria === categoriaFiltro)
    : productos;

  return (
    <div className="catalog-page">
        <h2 className="catalog-title">{categoriaFiltro || 'Todo el Catálogo'}</h2>
        
        {productosFiltrados.length > 0 ? (
            <div className="product-grid">
                {productosFiltrados.map(producto => (
                    <ProductCard key={producto.id} producto={producto} />
                ))}
            </div>
        ) : (
            <p className="catalog-empty-message">No hay productos en esta categoría.</p>
        )}
    </div>
  );
}

export default CatalogoPage;