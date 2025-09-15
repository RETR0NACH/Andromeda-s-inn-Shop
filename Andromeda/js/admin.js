document.addEventListener('DOMContentLoaded', () => {

    // --- SIMULACIÓN DE BASE DE DATOS ---
    let productos = JSON.parse(localStorage.getItem('productos')) || [
        { id: 1, nombre: 'Kit de Cultivo Indoor Básico', categoria: 'Cultivo', precio: 150000, img: 'https://via.placeholder.com/300', descripcion: 'Un kit ideal para empezar.' },
        { id: 2, nombre: 'Fertilizante Orgánico', categoria: 'Cultivo', precio: 15000, img: 'https://via.placeholder.com/300', descripcion: 'Fertilizante 100% orgánico.' },
    ];
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [
        { id: 101, nombre: 'Ana Fuentes', email: 'ana@cliente.com', password: '123' },
        { id: 102, nombre: 'Carlos Vera', email: 'carlos@cliente.com', password: '456' },
        { id: 103, nombre: 'Usuario sin Compras', email: 'sincompras@cliente.com', password: '789' }
    ];
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [
        { pedidoId: 1001, usuarioId: 101, productos: [{ productoId: 1, nombre: 'Kit de Cultivo Indoor Básico', precio: 150000 }], total: 150000 },
        { pedidoId: 1002, usuarioId: 102, productos: [{ productoId: 2, nombre: 'Fertilizante Orgánico', precio: 15000 }], total: 15000 }
    ];

    // --- FUNCIONES PARA GUARDAR DATOS ---
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
    const productModal = document.getElementById('product-modal');
    const addProductBtn = document.getElementById('add-product-btn');
    const closeProductModalBtn = document.getElementById('close-product-modal');
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
        addProductBtn.addEventListener('click', () => {
            document.getElementById('modal-title').innerText = 'Agregar Producto';
            productForm.reset();
            document.getElementById('product-id').value = '';
            productModal.style.display = 'block';
        });

        closeProductModalBtn.addEventListener('click', () => productModal.style.display = 'none');

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
                document.getElementById('modal-title').innerText = 'Editar Producto';
                document.getElementById('product-id').value = producto.id;
                document.getElementById('product-name').value = producto.nombre;
                document.getElementById('product-price').value = producto.precio;
                document.getElementById('product-img').value = producto.img;
                document.getElementById('product-category').value = producto.categoria;
                document.getElementById('product-description').value = producto.descripcion || '';
                productModal.style.display = 'block';
            }
        });

        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('product-id').value;
            const producto = {
                nombre: document.getElementById('product-name').value,
                precio: parseFloat(document.getElementById('product-price').value),
                img: document.getElementById('product-img').value,
                categoria: document.getElementById('product-category').value,
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
            productModal.style.display = 'none';
        });
    }


  
    // LÓGICA PARA usuarios_admin.html 
    const allUsersList = document.getElementById('all-users-list');
    const customersList = document.getElementById('customers-list');
    const userModal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const closeUserModalBtn = document.getElementById('close-user-modal');

    const renderizarUsuariosAdmin = () => {
        if (!allUsersList) return; // Si no estamos en la página de usuarios, no hacer nada.
        
        allUsersList.innerHTML = '';
        customersList.innerHTML = '';

        // **CAMBIO:** Creamos una función reutilizable para generar la tarjeta de un usuario.
        const crearTarjetaUsuario = (usuario) => {
            const userOrders = pedidos.filter(p => p.usuarioId === usuario.id);
            const card = document.createElement('div');
            card.className = 'user-card';
            let purchasesHTML = '<p>Este usuario no ha realizado compras.</p>';

            if (userOrders.length > 0) {
                const totalGastado = userOrders.reduce((acc, order) => acc + order.total, 0);
                const productosComprados = userOrders.flatMap(o => o.productos.map(p => `<li>${p.nombre}</li>`)).join('');
                purchasesHTML = `
                    <div class="user-purchases">
                        <strong>Total Gastado: $${totalGastado.toLocaleString('es-CL')}</strong>
                        <ul>${productosComprados}</ul>
                    </div>
                `;
            }
            
            card.innerHTML = `
                <h3>${usuario.nombre} ${usuario.apellido || ''}</h3>
                <p>${usuario.email}</p>
                ${purchasesHTML}
                <div class="card-actions">
                    <button class="edit-btn" data-id="${usuario.id}">Editar</button>
                </div>
            `;
            return card;
        };

        // Separamos la lógica para evitar duplicados.
        const idsDeClientes = new Set(pedidos.map(p => p.usuarioId));

        usuarios.forEach(usuario => {
            const tarjeta = crearTarjetaUsuario(usuario);
            if (idsDeClientes.has(usuario.id)) {
                // Si el ID del usuario está en el set de clientes, lo añadimos a la lista de clientes.
                customersList.appendChild(tarjeta);
            } else {
                // Si no, lo añadimos a la lista de "otros usuarios".
                allUsersList.appendChild(tarjeta);
            }
        });

        // Actualizamos el título de la segunda sección para que sea más claro.
        const allUsersHeader = allUsersList.previousElementSibling; // Busca el <h2> anterior
        if (allUsersHeader) {
            allUsersHeader.innerText = 'Usuarios sin Compras';
        }
    };

    if (allUsersList) {
        document.body.addEventListener('click', (e) => {
            if (e.target.classList.contains('edit-btn') && e.target.closest('.user-card')) {
                const id = e.target.dataset.id;
                const usuario = usuarios.find(u => u.id == id);
                document.getElementById('user-id').value = usuario.id;
                document.getElementById('user-name').value = usuario.nombre;
                document.getElementById('user-email').value = usuario.email;
                userModal.style.display = 'block';
            }
        });
        
        closeUserModalBtn.addEventListener('click', () => userModal.style.display = 'none');
        
        userForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const id = document.getElementById('user-id').value;
            const index = usuarios.findIndex(u => u.id == id);
            usuarios[index].nombre = document.getElementById('user-name').value;
            usuarios[index].email = document.getElementById('user-email').value;
            guardarUsuarios();
            renderizarUsuariosAdmin();
            userModal.style.display = 'none';
        });
    }

    // --- LLAMADAS INICIALES ---
    renderizarProductosAdmin();
    renderizarUsuariosAdmin();
});

// Cierre de modales
window.onclick = function(event) {
    if (event.target == document.getElementById('product-modal')) {
        document.getElementById('product-modal').style.display = "none";
    }
    if (event.target == document.getElementById('user-modal')) {
        document.getElementById('user-modal').style.display = "none";
    }
}