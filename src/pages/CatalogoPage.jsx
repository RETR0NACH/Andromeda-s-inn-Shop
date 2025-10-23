// RUTA: src/pages/CatalogoPage.jsx
import React, { useState, useMemo } from 'react'; // Asegúrate de importar useMemo
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../features/products/ProductCard';
import { useSearchParams } from 'react-router-dom';

function CatalogoPage() {
  const { productos } = useProducts();
  const [searchParams] = useSearchParams();
  const categoriaFiltro = searchParams.get('categoria');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('default');

  // --- Lógica de Filtrado y Ordenamiento (Ajustada con useMemo) ---
  const productosAMostrar = useMemo(() => {
    // 1. Filtrar por categoría (si existe)
    let productosFiltrados = categoriaFiltro
      ? productos.filter(p => p.categoria === categoriaFiltro)
      : productos;

    // 2. Filtrar por término de búsqueda
    if (searchTerm) {
      productosFiltrados = productosFiltrados.filter(producto =>
        producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // 3. Ordenar los productos filtrados
    const sortedProducts = [...productosFiltrados]; // Crea una copia para ordenar
    switch (sortOrder) {
      case 'nombre-asc':
        sortedProducts.sort((a, b) => a.nombre.localeCompare(b.nombre));
        break;
      case 'nombre-desc':
        sortedProducts.sort((a, b) => b.nombre.localeCompare(a.nombre));
        break;
      case 'precio-asc':
        sortedProducts.sort((a, b) => a.precio - b.precio);
        break;
      case 'precio-desc':
        sortedProducts.sort((a, b) => b.precio - a.precio);
        break;
      case 'default':
      default:
        // Orden por defecto (por ID, por ejemplo)
        sortedProducts.sort((a, b) => a.id - b.id);
        break;
    }
    return sortedProducts;
    // useMemo recalculará esto solo si 'productos', 'categoriaFiltro', 'searchTerm', o 'sortOrder' cambian
  }, [productos, categoriaFiltro, searchTerm, sortOrder]);
  // --- Fin Lógica ---

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div className="catalog-page">
      <div className="catalog-header">
        <h2 className="catalog-title">{categoriaFiltro || 'Todo el Catálogo'}</h2>

        <div className="catalog-controls">
          <div className="catalog-search-bar">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="catalog-sort-filter">
            <select value={sortOrder} onChange={handleSortChange} aria-label="Ordenar productos por">
              <option value="default">Ordenar por...</option>
              <option value="nombre-asc">Nombre (A-Z)</option>
              <option value="nombre-desc">Nombre (Z-A)</option>
              <option value="precio-asc">Precio (Menor a Mayor)</option>
              <option value="precio-desc">Precio (Mayor a Menor)</option>
            </select>
          </div>
        </div>
      </div>

      {productosAMostrar.length > 0 ? (
        <div className="product-grid">
          {productosAMostrar.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      ) : (
        <p className="catalog-empty-message">
          {searchTerm
            ? `No se encontraron productos para "${searchTerm}" ${categoriaFiltro ? `en ${categoriaFiltro}` : ''}.`
            : `No hay productos en esta categoría.`}
        </p>
      )}
    </div>
  );
}

export default CatalogoPage;