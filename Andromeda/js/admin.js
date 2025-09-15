document.addEventListener('DOMContentLoaded', () => {

    // --- SIMULACIÓN DE BASE DE DATOS ---
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    const guardarProductos = () => localStorage.setItem('productos', JSON.stringify(productos));
    const guardarUsuarios = () => localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // LÓGICA PARA principal_admin.html
    const statsContainer = document.getElementById('admin-stats');
    if (statsContainer) {
        statsContainer.innerHTML = `
            <div class="item-card"><h3>Total de Productos</h3><p class="price">${productos.length}</p></div>
            <div class="item-card"><h3>Total de Usuarios</h3><p class="price">${usuarios.length}</p></div>
            <div class="item-card"><h3>Total de Pedidos</h3><p class="price">${pedidos.length}</p></div>
        `;
    }

    // LÓGICA PARA productos_admin.html  
    const productList = document.getElementById('product-list');
    
    const productFormContainer = document.getElementById('product-form-container');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeFormBtn = document.getElementById('close-form-btn');
    const productForm = document.getElementById('product-form');

    const renderizarProductosAdmin = () => {
        if (!productList) return;
        productList.innerHTML = '';
        productos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'item-card';
            card.innerHTML = `
                <img src="${p.img}" alt="${p.nombre}">
                <h3>${p.nombre}</h3>
                <p class="price">$${p.precio.toLocaleString('es-CL')}</p>
                <div class="card-actions">
                    <button class="edit-btn" data-id="${p.id}">Editar</button>
                    <button class="delete-btn" data-id="${p.id}">Eliminar</button>
                </div>
            `;
            productList.appendChild(card);
        });
    };

    if (productList) {
        // Abrir el contenedor del formulario y desplazarse a él
        addProductBtn.addEventListener('click', () => {
            document.getElementById('form-title').innerText = 'Agregar Producto';
            productForm.reset();
            document.getElementById('product-id').value = '';
            productFormContainer.style.display = 'block';
            // Esta línea hace que la página se desplace suavemente hasta el formulario
            productFormContainer.scrollIntoView({ behavior: 'smooth' });
        });

        // Cerrar el contenedor del formulario
        closeFormBtn.addEventListener('click', () => {
            productFormContainer.style.display = 'none';
        });

        productList.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('delete-btn')) {
                if (confirm('¿Seguro que quieres eliminar este producto?')) {
                    productos = productos.filter(p => p.id != id);
                    guardarProductos();
                    renderizarProductosAdmin();
                }
            }
            if (e.target.classList.contains('edit-btn')) {
                const producto = productos.find(p => p.id == id);
                document.getElementById('form-title').innerText = 'Editar Producto';
                document.getElementById('product-id').value = producto.id;
                document.getElementById('product-name').value = producto.nombre;
                document.getElementById('product-price').value = producto.precio;
                document.getElementById('product-img').value = producto.img;
                document.getElementById('product-category').value = producto.categoria;
                document.getElementById('product-description').value = producto.descripcion || '';
                //  Mostrar y desplazarse al formulario para editar
                productFormContainer.style.display = 'block';
                productFormContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });

        //  Ocultar el formulario después de guardar
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const categoria = document.getElementById('product-category').value;
            if (!categoria) {
                alert('Por favor, elige una categoría para el producto.');
                return;
            }
            const producto = {
                nombre: document.getElementById('product-name').value,
                precio: parseFloat(document.getElementById('product-price').value),
                img: document.getElementById('product-img').value,
                categoria: categoria,
                descripcion: document.getElementById('product-description').value
            };
            if (id) {
                const index = productos.findIndex(p => p.id == id);
                productos[index] = { ...productos[index], ...producto };
            } else {
                producto.id = Date.now();
                productos.push(producto);
            }
            guardarProductos();
            renderizarProductosAdmin();
            productFormContainer.style.display = 'none'; // Oculta el formulario
        });
    }
    // --- LLAMADAS INICIALES ---
    renderizarProductosAdmin();
    
});
