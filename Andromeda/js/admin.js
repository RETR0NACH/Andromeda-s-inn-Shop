document.addEventListener('DOMContentLoaded', () => {

    // --- SIMULACIÓN DE BASE DE DATOS ---
    let productos = JSON.parse(localStorage.getItem('productos')) || [
        { id: 1, nombre: 'Bong de Vidrio Clásico', precio: 45000, img: 'images/bong1.png', categoria: 'Bongs', descripcion: 'Bong de vidrio resistente de 30cm, ideal para una experiencia suave y filtrada. Diseño clásico y fácil de limpiar.' },
        { id: 2, nombre: 'Bong de Vidrio Percolador', precio: 65000, img: 'images/bong2.png', categoria: 'Bongs', descripcion: 'Experimenta una filtración superior con este bong de percolador de nido de abeja. Suavidad garantizada en cada uso.' },
        { id: 3, nombre: 'Cenicero de Cerámica', precio: 12000, img: 'images/mono podrio.png', categoria: 'Accesorios', descripcion: 'Cenicero de cerámica con diseño moderno y múltiples ranuras. Perfecto para compartir.' },
        { id: 4, nombre: 'Cenicero de Viaje Portátil', precio: 8500, img: 'images/mono podrio.png', categoria: 'Accesorios', descripcion: 'Lleva tu cenicero a todas partes. Diseño compacto y a prueba de olores para máxima discreción.' },
        { id: 5, nombre: 'Grinder Metálico 4 Piezas', precio: 18000, img: 'images/moledor.png', categoria: 'Accesorios', descripcion: 'Grinder de metal duradero con 4 compartimentos, incluyendo un recogedor de polen. Molienda fina y uniforme.' },
        { id: 6, nombre: 'Kit de Cultivo Indoor Completo', precio: 250000, img: 'images/macetero.png', categoria: 'Cultivo', descripcion: 'Todo lo que necesitas para empezar tu cultivo en casa: carpa, luces, ventilación y más. ¡Resultados profesionales!' },
        { id: 7, nombre: 'Set Limpia Pipas', precio: 5000, img: 'images/mono podrio.png', categoria: 'Accesorios', descripcion: 'Mantén tus bongs y pipas como nuevos con este set de cepillos de limpieza de alta calidad.' },
        { id: 8, nombre: 'Papelillos RAW Clásico', precio: 1500, img: 'images/pap_raw.png', categoria: 'Papelillos', descripcion: 'Papel de liar RAW tamaño King Size, sin blanquear y 100% natural para una combustión lenta y pura.' },
        { id: 9, nombre: 'Pipa de Cristal Soplado', precio: 15000, img: 'images/pipa_vidrio.png', categoria: 'Pipas', descripcion: 'Pipa de cristal de borosilicato, diseño ergonómico y portátil para un uso cómodo y discreto.' },
        { id: 10, nombre: 'Pipa de Madera Noble', precio: 22000, img: 'images/pipa_tabaco.png', categoria: 'Pipas', descripcion: 'Elegante pipa tallada en madera noble. Ofrece un sabor clásico y una experiencia de uso única.' },
        { id: 11, nombre: 'Sustrato Light Mix 50L', precio: 20000, img: 'images/sustrato.png', categoria: 'Cultivo', descripcion: 'Sustrato de alta calidad, ligeramente fertilizado, ideal para un control total sobre la nutrición de tus plantas.' },
        { id: 12, nombre: 'Tabaco American Spirit Orgánico', precio: 8000, img: 'images/tabaco_naranja.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar 100% orgánico, sin aditivos. Sabor puro y natural.' },
        { id: 13, nombre: 'Vaporizador G-Pen Pro', precio: 95000, img: 'images/stundenglass.png', categoria: 'Accesorios', descripcion: 'Vaporizador portátil para hierbas secas. Calentamiento rápido y cámara de cerámica para un sabor puro.' },
        { id: 14, nombre: 'Bandeja para Liar RAW', precio: 16000, img: 'images/mono podrio.png', categoria: 'Accesorios', descripcion: 'Bandeja metálica RAW de tamaño mediano. La superficie perfecta para liar sin desorden.' }
    ];
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

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
        addProductBtn.addEventListener('click', () => {
            document.getElementById('form-title').innerText = 'Agregar Producto';
            productForm.reset();
            document.getElementById('product-id').value = '';
            productFormContainer.style.display = 'block';
            productFormContainer.scrollIntoView({ behavior: 'smooth' });
        });

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
                productFormContainer.style.display = 'block';
                productFormContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });

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
            productFormContainer.style.display = 'none';
        });
    }


    // LÓGICA PARA usuarios_admin.html 
    const allUsersList = document.getElementById('all-users-list');
    const customersList = document.getElementById('customers-list');
    const userModal = document.getElementById('user-modal');
    const userForm = document.getElementById('user-form');
    const closeUserModalBtn = document.getElementById('close-user-modal');

    const renderizarUsuariosAdmin = () => {
        if (!allUsersList) return;
        
        allUsersList.innerHTML = '';
        customersList.innerHTML = '';

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
                    <button class="delete-user-btn" data-id="${usuario.id}">Eliminar</button>
                </div>
            `;
            return card;
        };

        const idsDeClientes = new Set(pedidos.map(p => p.usuarioId));
        usuarios.forEach(usuario => {
            const tarjeta = crearTarjetaUsuario(usuario);
            if (idsDeClientes.has(usuario.id)) {
                customersList.appendChild(tarjeta);
            } else {
                allUsersList.appendChild(tarjeta);
            }
        });

        const allUsersHeader = allUsersList.previousElementSibling;
        if (allUsersHeader) {
            allUsersHeader.innerText = 'Usuarios sin Compras';
        }
    };

    if (allUsersList) {
        document.body.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            if (e.target.classList.contains('edit-btn') && e.target.closest('.user-card')) {
                const usuario = usuarios.find(u => u.id == id);
                document.getElementById('user-id').value = usuario.id;
                document.getElementById('user-name').value = usuario.nombre;
                document.getElementById('user-email').value = usuario.email;
                userModal.style.display = 'block';
            }
            if (e.target.classList.contains('delete-user-btn')) {
                if (confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción no se puede deshacer.')) {
                    usuarios = usuarios.filter(u => u.id != id);
                    guardarUsuarios();
                    renderizarUsuariosAdmin();
                }
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
    if (event.target.id === 'product-modal' || event.target.id === 'user-modal') {
        event.target.style.display = "none";
    }
}