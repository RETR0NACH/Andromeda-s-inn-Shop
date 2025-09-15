document.addEventListener('DOMContentLoaded', () => {

    // ===================================================
    // 1. CARGA DE DATOS Y VARIABLES GLOBALES
    // ===================================================
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    const saveCart = () => localStorage.setItem('cart', JSON.stringify(cart));
    const guardarUsuarios = () => localStorage.setItem('usuarios', JSON.stringify(usuarios));

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    const mostrarNotificacion = (mensaje, tipo = 'success') => {
        const notificacion = document.createElement('div');
        notificacion.className = `notification ${tipo}`;
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        setTimeout(() => { notificacion.remove(); }, 3000);
    };

    // ===================================================
    // 2. GESTIÓN DE LA SESIÓN DE USUARIO
    // ===================================================
    const usuarioActivo = JSON.parse(sessionStorage.getItem('usuarioActivo'));
    const userSessionLi = document.getElementById('user-session-li');
    const welcomeMessageContainer = document.getElementById('welcome-message');

    if (usuarioActivo) {
        if (welcomeMessageContainer) {
            welcomeMessageContainer.innerText = `Bienvenido, ${usuarioActivo.nombre}`;
        }
        if (userSessionLi) {
            userSessionLi.innerHTML = `<a href="#" id="logout-btn">Cerrar Sesión</a>`;
        }
    } else {
        if (userSessionLi) {
            userSessionLi.innerHTML = `<a href="login.html">Iniciar Sesión</a>`;
        }
    }

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (event) => {
            event.preventDefault(); 
            sessionStorage.removeItem('usuarioActivo');
            mostrarNotificacion('Has cerrado sesión.', 'info');
            setTimeout(() => { window.location.href = 'principal.html'; }, 1500);
        });
    }

    // ===================================================
    // 3. LÓGICA DE REGISTRO
    // ===================================================
    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nombre = document.getElementById('register-nombre').value.trim();
            const apellido = document.getElementById('register-apellido').value.trim();
            const email = document.getElementById('register-email').value.trim();
            const password = document.getElementById('register-password').value;
            const passwordConfirm = document.getElementById('register-password-confirm').value;

            if (!nombre || !apellido || !email || !password) {
                mostrarNotificacion('Todos los campos son obligatorios.', 'error');
                return;
            }
            if (password.length < 6) {
                mostrarNotificacion('La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }
            if (password !== passwordConfirm) {
                mostrarNotificacion('Las contraseñas no coinciden.', 'error');
                return;
            }
            const usuarioExistente = usuarios.find(user => user.email === email);
            if (usuarioExistente) {
                mostrarNotificacion('El correo electrónico ya está registrado.', 'error');
                return;
            }

            const nuevoUsuario = { id: Date.now(), nombre, apellido, email, password };
            usuarios.push(nuevoUsuario);
            guardarUsuarios();
            
            mostrarNotificacion('¡Cuenta creada con éxito! Redirigiendo...', 'success');
            setTimeout(() => { window.location.href = 'login.html'; }, 1500);
        });
    }

    // ===================================================
    // 4. LÓGICA DE LOGIN
    // ===================================================
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
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

    // ===================================================
    // 5. LÓGICA PARA MOSTRAR PRODUCTOS
    // ===================================================

    // --- PARA LA PÁGINA PRINCIPAL (PRODUCTOS DESTACADOS) ---
    const featuredProductList = document.getElementById('product-list');
    if (featuredProductList) {
        // Muestra 4 productos al azar como destacados
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

    // --- PARA LA PÁGINA DE CATÁLOGO ---
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

    // --- PARA LA PÁGINA DE DETALLES DEL PRODUCTO ---
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
            } else {
                 productDetailContainer.innerHTML = '<h2>Producto no encontrado</h2>';
            }
        }
    }

    // ===================================================
    // 6. LÓGICA DEL CARRITO Y COMPRA
    // ===================================================
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
            const index = event.target.dataset.index;
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
        
        const checkoutBtn = document.getElementById('pay-button'); // O el ID que tenga tu botón de pagar
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
});