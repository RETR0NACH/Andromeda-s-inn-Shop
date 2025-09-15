let productos = JSON.parse(localStorage.getItem('productos')) || []; //Implementación de localStorage
document.addEventListener('DOMContentLoaded', () => {
    // SIMULACIÓN DE BASE DE DATOS DE USUARIOS
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Función para guardar los usuarios en localStorage
    const guardarUsuarios = () => {
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
    };

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');


    // FUNCIÓN PARA MOSTRAR NOTIFICACIONES
    const mostrarNotificacion = (mensaje, tipo = 'success') => {
        const notificacion = document.createElement('div');
        notificacion.className = `notification ${tipo}`;
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);

        setTimeout(() => {
            notificacion.remove();
        }, 3000);
    };



//LÓGICA DE REGISTRO DE CUENTA
    if (registerForm) {
        const emailInput = document.getElementById('register-email');
        const passwordInput = document.getElementById('register-password');

        registerForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Evita que la página se recargue


            const email = emailInput.value;
            const password = passwordInput.value;

            // 1. Validar que el correo no exista
            const usuarioExistente = usuarios.find(user => user.email === email);
            if (usuarioExistente) {
                mostrarNotificacion('El correo electrónico ya está registrado.', 'error');
                return;
            }

            // 2. Validar que la contraseña sea segura
            if (password.length < 6) {
                mostrarNotificacion('La contraseña debe tener al menos 6 caracteres.', 'error');
                return;
            }

            // 3. Si todo está bien, crear el nuevo usuario
            const nuevoUsuario = { email, password };
            usuarios.push(nuevoUsuario);
            guardarUsuarios();

            mostrarNotificacion('¡Cuenta creada con éxito! Redirigiendo...', 'success');

            // 4. Redirigir a la página de login
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        });
    }

    // --- LÓGICA DE INICIO DE SESIÓN  ---
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        loginForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const email = emailInput.value;
            const password = passwordInput.value;

            // 1. Buscar si el usuario existe en nuestra base de datos simulada
            const usuario = usuarios.find(user => user.email === email);

            // 2. Si el usuario no existe...
            if (!usuario) {
                mostrarNotificacion('El usuario no se encuentra registrado.', 'error');
                return;
            }

            // 3. Si el usuario existe, comparar la contraseña
            if (usuario.password === password) {
                mostrarNotificacion(`¡Bienvenido de vuelta!`, 'success');
                // Aquí podrías redirigir a la página principal o a un panel de usuario
                setTimeout(() => {
                    window.location.href = 'principal.html';
                }, 1000);
            } else {
                mostrarNotificacion('La contraseña es incorrecta.', 'error');
            }
        });
    }
    //=============================================
    //= AQUÍ FINALIZA LA ETAPA DE LOGGIN/REGISTRO =
    //=============================================


    
    // ===================================================
    // LÓGICA DEL CARRITO DE COMPRAS
    // ===================================================
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('total-price');
    const clearCartBtn = document.getElementById('clear-cart-btn');

    const saveCart = () => {
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    const addToCart = (productName, productPrice) => {
        cart.push({ nombre: productName, precio: productPrice });
        saveCart();
    };

    const renderCart = () => {
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            let total = 0;
            if (cart.length === 0) {
                cartItemsContainer.innerHTML = '<p>Your shopping cart is empty.</p>';
            }
            cart.forEach((item, index) => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('cart-product');
                productDiv.innerHTML = `
                    <h3>${item.nombre}</h3>
                    <p>Price: $<span class="product-price">${item.precio.toFixed(2)}</span></p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                `;
                cartItemsContainer.appendChild(productDiv);
                total += item.precio;
            });
            if (totalElement) {
                totalElement.textContent = total.toFixed(2);
            }
        }
    };

    // New function to remove a single item from the cart
    const removeItemFromCart = (index) => {
        if (index > -1) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    };

    const clearCart = () => {
        cart.length = 0;
        saveCart();
        renderCart();
    };

    // Add event listener to handle clicks on the cart container
    if (cartItemsContainer) {
        cartItemsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('remove-item')) {
                const index = event.target.getAttribute('data-index');
                removeItemFromCart(parseInt(index));
            }
        });
    }

    // Add event listener for the "Clear Cart" button
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
    }

    renderCart();

    // ===================================================
    // LÓGICA PARA LA PÁGINA PRINCIPAL
    // ===================================================
    const mostrarProductosDestacados = () => {
        const productosDestacadosContainer = document.getElementById('product-list');
        if (!productosDestacadosContainer) {
            return;
        }

        const productosAleatorios = [...productos].sort(() => 0.5 - Math.random());
        const productosParaMostrar = productosAleatorios.slice(0, 6);

        productosParaMostrar.forEach(producto => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)}</p>
                <a href="producto.html?id=${producto.id}" class="view-details-btn">Ver Detalles</a>
            `;
            productosDestacadosContainer.appendChild(productCard);
        });
    };

    mostrarProductosDestacados();

    // ===================================================
    // LÓGICA PARA LA PÁGINA DE CATÁLOGO
    // ===================================================
    const productGrid = document.getElementById('product-grid');
    if (productGrid) {
        const params = new URLSearchParams(window.location.search);
        const categoriaSeleccionada = params.get('categoria');
        let productosAmostrar = productos;

        if (categoriaSeleccionada) {
            productosAmostrar = productos.filter(producto => producto.categoria === categoriaSeleccionada);
        }

        productosAmostrar.forEach(producto => {
            const productElement = document.createElement('div');
            productElement.classList.add('product-card');
            productElement.innerHTML = `
                <a href="producto.html?id=${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <h3>${producto.nombre}</h3>
                    <p>$${producto.precio.toFixed(2)}</p>
                </a>
            `;
            productGrid.appendChild(productElement);
        });
    }

    // ===================================================
    // LÓGICA PARA LA PÁGINA DE DETALLES DEL PRODUCTO
    // ===================================================
    const productDetailContainer = document.getElementById('product-detail');
    if (productDetailContainer) {
        const params = new URLSearchParams(window.location.search);
        const productId = params.get('id');

        if (productId) {
            const producto = productos.find(p => p.id == productId);

            if (producto) {
                productDetailContainer.innerHTML = `
                    <div class="product-info-container">
                        <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image-large">
                        <div class="product-details-text">
                            <h2>${producto.nombre}</h2>
                            <p class="product-description">Una descripción detallada de ${producto.nombre}.</p>
                            <p class="product-price-large">$${producto.precio.toFixed(2)}</p>
                            <div class="product-actions">
                                <button id="buy-now-btn">Comprar Ahora</button>
                                <button id="add-to-cart-btn">Agregar al Carrito</button>
                            </div>
                        </div>
                    </div>
                `;

                document.getElementById('add-to-cart-btn').addEventListener('click', () => {
                    addToCart(producto.nombre, producto.precio);
                    alert(`${producto.nombre} ha sido agregado al carrito.`);
                });

                document.getElementById('buy-now-btn').addEventListener('click', () => {
                    addToCart(producto.nombre, producto.precio);
                    window.location.href = 'carrito.html';
                });

            } else {
                productDetailContainer.innerHTML = '<p>Producto no encontrado.</p>';
            }
        } else {
            productDetailContainer.innerHTML = '<p>ID de producto no especificado.</p>';
        }
    }

}); // Fin de DOMContentLoaded