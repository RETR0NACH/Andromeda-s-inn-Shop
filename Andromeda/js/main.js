document.addEventListener('DOMContentLoaded', () => {

    // 1. CARGA DE DATOS Y VARIABLES GLOBALES
    let productos = JSON.parse(localStorage.getItem('productos')) || [];
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

    // 3. LÓGICA DE REGISTRO
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

    // 4. LÓGICA DE LOGIN (CON CAMBIO PARA ADMIN)
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // 1. Primero, revisamos si las credenciales son del administrador
            if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                mostrarNotificacion('Bienvenido, Administrador.', 'success');
                setTimeout(() => {
                    // Si es admin, redirige al panel de administración
                    window.location.href = 'principal_admin.html';
                }, 1500);
                return; 
            }
            
            // 2. Si no es admin, continúa con la lógica normal para clientes
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

    //mostrar productos en catálogo, destacados, etc.
    const featuredProductList = document.getElementById('product-list');
    if (featuredProductList) { /* ... */ }
    const productGrid = document.getElementById('product-grid');
    if (productGrid) { /* ... */ }
    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) { /* ... */ }

    
    // 6. LÓGICA DEL CARRITO Y COMPRA 
    // ... (Tu código para el carrito y finalizar compra va aquí)
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) { /* ... */ }
    document.body.addEventListener('click', (event) => { /* ... */ });

});