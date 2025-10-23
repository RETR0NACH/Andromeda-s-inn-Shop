import React from 'react';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../features/products/ProductCard'; // Usamos el componente de feature

function HomePage() {
  const { productos } = useProducts();
  // Mostrar solo 4 productos destacados, por ejemplo
  const productosDestacados = productos.slice(0, 4);

  return (
    <>
      <div id="welcome-page" background>
        <div id="welcome-text-container">
          <h2>Andromeda's Inn Shop</h2>
          <p>Donde los cielos se encuentran con la tierra. Descubre productos de otro mundo y eleva tu cultivo a nuevas alturas.</p>
        </div>
      </div>
      
      <section id="product-section">
        <h3>Productos Destacados</h3>    
        <div className="product-grid">
          {productosDestacados.map(producto => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;