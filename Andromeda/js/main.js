document.addEventListener('DOMContentLoaded', () => {

    // 1. CARGA DE DATOS Y VARIABLES GLOBALES ...
    let productos = JSON.parse(localStorage.getItem('productos')) || [
        { id: 1, nombre: 'Bong de Vidrio Clásico', precio: 45000, img: 'images/bong1.png', categoria: 'Bongs', descripcion: 'Bong de vidrio resistente de 30cm, ideal para una experiencia suave y filtrada. Diseño clásico y fácil de limpiar.' },
        { id: 2, nombre: 'Bong de Vidrio Percolador', precio: 65000, img: 'images/bong2.png', categoria: 'Bongs', descripcion: 'Experimenta una filtración superior con este bong de percolador de nido de abeja. Suavidad garantizada en cada uso.' },
        { id: 3, nombre: 'Blunt de Menta', precio: 1500, img: 'images/blunt_menta.png', categoria: 'Accesorios', descripcion: 'Blunt de menta con sabor fresco y suave. Ideal para disfrutar en cualquier momento.' },
        { id: 4, nombre: 'Papelillos OCB Clásicos', precio: 1000, img: 'images/pap_ocb.png', categoria: 'Papelillos', descripcion: 'Papel de liar OCB clásico, ideal para una experiencia de fumar suave y controlada.' },
        { id: 5, nombre: 'Grinder Metálico 4 Piezas', precio: 18000, img: 'images/moledor.png', categoria: 'Accesorios', descripcion: 'Grinder de metal duradero con 4 compartimentos, incluyendo un recogedor de polen. Molienda fina y uniforme.' },
        { id: 6, nombre: 'Kit de Cultivo Indoor Completo', precio: 250000, img: 'images/macetero.png', categoria: 'Cultivo', descripcion: 'Todo lo que necesitas para empezar tu cultivo en casa: carpa, luces, ventilación y más. ¡Resultados profesionales!' },
        { id: 7, nombre: 'Sustrato Premium Natural', precio: 16000, img: 'images/sustrato_pro.png', categoria: 'Cultivo', descripcion: 'Sustrato de alta calidad, ideal para un crecimiento óptimo de tus plantas.' },
        { id: 8, nombre: 'Papelillos RAW Clásico', precio: 1500, img: 'images/pap_raw.png', categoria: 'Papelillos', descripcion: 'Papel de liar RAW tamaño King Size, sin blanquear y 100% natural para una combustión lenta y pura.' },
        { id: 9, nombre: 'Pipa de Cristal Soplado', precio: 15000, img: 'images/pipa_vidrio.png', categoria: 'Pipas', descripcion: 'Pipa de cristal de borosilicato, diseño ergonómico y portátil para un uso cómodo y discreto.' },
        { id: 10, nombre: 'Pipa de Madera Noble', precio: 22000, img: 'images/pipa_tabaco.png', categoria: 'Pipas', descripcion: 'Elegante pipa tallada en madera noble. Ofrece un sabor clásico y una experiencia de uso única.' },
        { id: 11, nombre: 'Sustrato Light Mix 50L', precio: 20000, img: 'images/sustrato.png', categoria: 'Cultivo', descripcion: 'Sustrato de alta calidad, ligeramente fertilizado, ideal para un control total sobre la nutrición de tus plantas.' },
        { id: 12, nombre: 'Tabaco American Spirit Orgánico', precio: 8000, img: 'images/tabaco_m.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar 100% orgánico, sin aditivos. Sabor puro y natural.' },
        { id: 13, nombre: 'Vaporizador G-Pen Pro', precio: 95000, img: 'images/stundenglass.png', categoria: 'Bongs', descripcion: 'Vaporizador portátil para hierbas secas. Calentamiento rápido y cámara de cerámica para un sabor puro.' },
        { id: 14, nombre: 'Papelillos con Filtros', precio: 1500, img: 'images/pap_filtro.png', categoria: 'Accesorios', descripcion: 'Papelillos con filtros integrados para una experiencia de fumar más suave y limpia.' },
        {id: 15, nombre: 'Bolso oZ', precio: 30000, img: 'images/bolso.png', categoria: 'Accesorios', descripcion: 'Bolso de transporte para tus accesorios de fumar. Diseño discreto y funcional.' },
        {id: 16, nombre: 'Tabaco de Chocolate', precio: 5000, img: 'images/tabaco_ch.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar con sabor a chocolate. Ideal para quienes buscan una experiencia dulce y única.' },
        {id: 17, nombre: 'Tabaco de Mango', precio: 5000, img: 'images/tabaco_mango.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar con sabor a mango. Ideal para quienes buscan una experiencia tropical y afrutada.' },
        {id: 18, nombre: 'Tabaco de Naranja', precio: 5000, img: 'images/tabaco_naranja.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar con sabor a naranja. Ideal para quienes buscan una experiencia cítrica y refrescante.' },
        {id: 19, nombre: 'Tabaco de Premium', precio: 6500, img: 'images/tabaco_premium.png', categoria: 'Tabacos', descripcion: 'Tabaco de liar con sabor a premium. Ideal para quienes buscan una experiencia cítrica y refrescante.' },
        {id: 20, nombre: 'Enrolador de Tabaco', precio: 3000, img: 'images/enrrolador.png', categoria: 'Accesorios', descripcion: 'Enrolador manual para tabaco. Facilita el proceso de liar cigarrillos de manera rápida y uniforme.' }
    ];

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
    const guardarUsuarios = () => localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    const ADMIN_EMAIL = 'andromeda@growshop.com';
    const ADMIN_PASSWORD = 'admin123';

    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    const mostrarNotificacion = (mensaje, tipo = 'success') => {
        const notificacion = document.createElement('div');
        notificacion.className = `notification ${tipo}`;
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        setTimeout(() => { notificacion.remove(); }, 3000);
    };


    // 2. GESTIÓN DE LA SESIÓN DE USUARIO 
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    const esAdmin = sessionStorage.getItem('isAdmin') === 'true';
    const userSessionLi = document.getElementById('user-session-li');
    const adminLinkLi = document.getElementById('admin-link-li');
    const welcomeMessageContainer = document.getElementById('welcome-message');

    if (usuarioActivo) {
        // Lógica para usuario normal logueado
        if (welcomeMessageContainer) welcomeMessageContainer.innerText = `Bienvenido, ${usuarioActivo.nombre}`;
        if (userSessionLi) userSessionLi.innerHTML = `<a href="#" id="logout-btn">Cerrar Sesión</a>`;
    } else if (esAdmin) {
        // Lógica para admin logueado
        if (welcomeMessageContainer) welcomeMessageContainer.innerText = `Modo Administrador`;
        if (userSessionLi) userSessionLi.innerHTML = `<a href="#" id="logout-btn">Cerrar Sesión</a>`;
        if (adminLinkLi) adminLinkLi.innerHTML = `<a href="principal_admin.html" style="color: #3498db; font-weight: bold;">Panel de Admin</a>`;
    } else {
        // Lógica para usuario no logueado
        if (userSessionLi) userSessionLi.innerHTML = `<a href="login.html"><i class="fa-solid fa-user"></i> Iniciar Sesión</a>`;
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault();
            sessionStorage.removeItem('usuarioActivo');
            sessionStorage.removeItem('isAdmin');
            mostrarNotificacion('Has cerrado sesión.', 'info');
            setTimeout(() => { window.location.href = 'principal.html'; }, 1500);
        });
    }

    // 3. LÓGICA DE REGISTRO
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = document.getElementById('register-nombre').value.trim();
            const apellido = document.getElementById('register-apellido').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const passwordConfirm = document.getElementById('register-password-confirm').value;

            if (!nombre || !apellido || !email || !password || !passwordConfirm) {
                mostrarNotificacion('Todos los campos son obligatorios.', 'error'); return;
            }
            if (password.length < 6) {
                mostrarNotificacion('La contraseña debe tener al menos 6 caracteres.', 'error'); return;
            }
            if (password !== passwordConfirm) {
                mostrarNotificacion('Las contraseñas no coinciden.', 'error'); return;
            }
            if (usuarios.find(user => user.email === email)) {
                mostrarNotificacion('El correo electrónico ya está registrado.', 'error'); return;
            }

            const nuevoUsuario = { id: Date.now(), nombre, apellido, email, password };
            usuarios.push(nuevoUsuario);
            guardarUsuarios();
            
            mostrarNotificacion('¡Cuenta creada con éxito! Redirigiendo...', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        });
    }


    // 4. LÓGICA DE LOGIN
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                sessionStorage.setItem('isAdmin', 'true');
                mostrarNotificacion('Bienvenido, Administrador.', 'success');
                setTimeout(() => { window.location.href = 'principal_admin.html'; }, 1500);
                return;
            }
            
            const usuario = usuarios.find(user => user.email === email);
            if (usuario && usuario.password === password) {
                sessionStorage.setItem('usuarioActivo', JSON.stringify(usuario));
                mostrarNotificacion(`¡Bienvenido de vuelta, ${usuario.nombre}!`, 'success');
                setTimeout(() => { window.location.href = 'principal.html'; }, 1500);
            } else {
                mostrarNotificacion('Usuario o contraseña incorrectos.', 'error');
            }
        });
    }


    // 5. LÓGICA PARA MOSTRAR PRODUCTOS 
    const featuredProductList = document.getElementById('product-list');
    if (featuredProductList) {
        const productosDestacados = [...productos].sort(() => 0.5 - Math.random()).slice(0, 4);
        productosDestacados.forEach(producto => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');
            productElement.innerHTML = `
                <a href="producto.html?id=${producto.id}">
                    <img src="${producto.img}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p class="product-price">$${producto.precio.toFixed(2)}</p>
                </a>
                <button class="add-to-cart-btn" data-id="${producto.id}">Agregar al Carrito</button>
            `;
            featuredProductList.appendChild(productElement);
        });
    }

    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        const params = new URLSearchParams(window.location.search);
        const categoriaSeleccionada = params.get('categoria');
        let productosAmostrar = categoriaSeleccionada ? productos.filter(p => p.categoria === categoriaSeleccionada) : productos;

        productGrid.innerHTML = '';
        if (productosAmostrar.length > 0) {
            productosAmostrar.forEach(producto => {
                const productElement = document.createElement('div');
                productElement.classList.add('product-card');
                productElement.innerHTML = `
                    <a href="producto.html?id=${producto.id}">
                        <img src="${producto.img}" alt="${producto.nombre}">
                        <h3>${producto.nombre}</h3>
                        <p class="product-price">$${producto.precio.toFixed(2)}</p>
                    </a>
                    <button class="add-to-cart-btn" data-id="${producto.id}">Agregar al Carrito</button>
                `;
                productGrid.appendChild(productElement);
            });
        } else {
            productGrid.innerHTML = '<h2>No hay productos en esta categoría.</h2><p>Prueba seleccionando otra opción en el menú.</p>';
        }
    }

    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');
        if (productId) {
            const producto = productos.find(p => p.id == productId);
            if (producto) {
                productDetailContainer.innerHTML = `
                    <div class="product-info-container">
                        <img src="${producto.img}" alt="${producto.nombre}" class="product-image-large">
                        <div class="product-details-text">
                            <h2>${producto.nombre}</h2>
                            <p class="product-description">${producto.descripcion || 'No hay descripción disponible.'}</p>
                            <p class="product-price-large">$${producto.precio.toFixed(2)}</p>
                            <div class="product-actions">
                                <button class="add-to-cart-btn" data-id="${producto.id}">Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
    }


    // 6. LÓGICA DEL CARRITO Y COMPRA
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    
    const renderCart = () => {
        if (!cartItemsContainer) return;
        cartItemsContainer.innerHTML = '';
        let total = 0;
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<tr><td colspan="4">Tu carrito está vacío.</td></tr>';
            if (totalElement) totalElement.textContent = '0.00';
            return;
        }
        cart.forEach((item, index) => {
            const cartRow = document.createElement('tr');
            cartRow.innerHTML = `
                <td><img src="${item.img}" alt="${item.nombre}" width="50"></td>
                <td>${item.nombre}</td>
                <td>$${item.precio.toFixed(2)}</td>
                <td><button class="remove-item" data-index="${index}">Eliminar</button></td>
            `;
            cartItemsContainer.appendChild(cartRow);
            total += item.precio;
        });
        if (totalElement) totalElement.textContent = total.toFixed(2);
    };

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const productId = event.target.dataset.id;
            const producto = productos.find(p => p.id == productId);
            if (producto) {
                cart.push(producto);
                saveCart();
                mostrarNotificacion(`${producto.nombre} ha sido agregado al carrito.`, 'success');
            }
        }
        if (event.target.classList.contains('remove-item')) {
            cart.splice(event.target.dataset.index, 1);
            saveCart();
            renderCart();
        }
        const checkoutBtn = document.getElementById('pay-button');
        if (checkoutBtn && event.target.id === checkoutBtn.id) {
             if (!usuarioActivo) {
                mostrarNotificacion('Debes iniciar sesión para poder comprar.', 'error');
                setTimeout(() => { window.location.href = 'login.html'; }, 2000);
                return;
            }
            if (cart.length === 0) {
                mostrarNotificacion('Tu carrito está vacío.', 'info');
                return;
            }
            let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
            const total = cart.reduce((acc, item) => acc + item.precio, 0);
            const nuevoPedido = {
                pedidoId: Date.now(),
                usuarioId: usuarioActivo.id,
                productos: [...cart],
                total: total
            };
            pedidos.push(nuevoPedido);
            localStorage.setItem('pedidos', JSON.stringify(pedidos));
            cart = [];
            saveCart();
            mostrarNotificacion('¡Gracias por tu compra!', 'success');
            setTimeout(() => { window.location.href = 'principal.html'; }, 2000);
        }
    });

    renderCart();



    let pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];

    // --- FUNCIONES PARA GUARDAR DATOS ---
    const guardarProductos = () => localStorage.setItem('productos', JSON.stringify(productos));


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
};

