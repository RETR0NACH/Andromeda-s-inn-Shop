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
    <div>
        <h2>{categoriaFiltro || 'Todo el Catálogo'}</h2>
        <div className="product-grid">
            {productosFiltrados.length > 0 ? (
                productosFiltrados.map(producto => (
                    <ProductCard key={producto.id} producto={producto} />
                ))
            ) : (
                <p>No hay productos en esta categoría.</p>
            )}
        </div>
    </div>
  );
}

export default CatalogoPage;