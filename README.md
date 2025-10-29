# Andromeda's Inn Shop - Frontend React

## Introducción

**Andromeda's Inn Shop** es la interfaz de usuario (frontend) para una tienda en línea especializada en productos de growshop. Este proyecto fue desarrollado como parte de la asignatura Desarrollo FullStack II, utilizando **React** y **Vite** para crear una Single Page Application (SPA) moderna y dinámica.

La aplicación simula un entorno de e-commerce completo, incluyendo catálogo de productos, carrito de compras, autenticación de usuarios (clientes y administrador) y un panel de administración funcional. La persistencia de datos (productos, usuarios, carritos, pedidos) se gestiona localmente mediante **LocalStorage** para fines demostrativos.

## ✨ Características Principales

### Para Clientes:

* **Catálogo de Productos:** Visualización de productos con imágenes, nombres y precios.
* **Filtrado por Categoría:** Navegación sencilla a través de categorías de productos.
* **Detalle de Producto:** Página dedicada con descripción completa, imagen ampliada y precio.
* **Autenticación:** Sistema de Registro e Inicio de Sesión para usuarios.
* **Carrito de Compras:** Funcionalidad para agregar, ver, modificar cantidad y eliminar productos del carrito. Persistente por usuario.
* **Finalizar Compra (Simulado):** Proceso para "comprar" los productos del carrito, generando un registro de pedido.
* **Interfaz Responsiva:** Diseño adaptable a dispositivos móviles con menú lateral deslizable.

### Para Administradores:

* **Panel de Administración:** Sección separada y protegida para la gestión de la tienda.
* **Gestión de Productos (CRUD):** Creación, visualización, **actualización** y eliminación de productos del catálogo.
* **Gestión de Usuarios:** Visualización, **edición** (nombre, apellido, email) y **eliminación** de usuarios clientes.
* **Visualización de Pedidos:** Listado de los pedidos realizados por los clientes con sus detalles.
* **Interfaz con Bootstrap:** El panel de administración utiliza **React Bootstrap** para una interfaz consistente y profesional.

## 🛠️ Tecnologías Utilizadas

* **Frontend:**
    * React (v19+)
    * React Router DOM (v7+)
    * Vite (Bundler y Servidor de Desarrollo)
    * JavaScript (ES6+)
    * CSS
* **UI Framework (Admin):**
    * React Bootstrap
    * Bootstrap 5
    * Bootstrap Icons
* **Iconos (Público):**
    * Font Awesome
* **Estado Global:**
    * React Context API
* **Persistencia (Simulada):**
    * LocalStorage (a través del hook `useLocalStorage`)
* **Testing:**
    * Karma (Test Runner)
    * Jasmine (Framework de Pruebas)
    * Karma-Chrome-Launcher / Karma-Brave-Launcher
    * Karma-Babel-Preprocessor
* **Transpilación:**
    * Babel (@babel/preset-env, @babel/preset-react)
* **Gestión de Paquetes:**
    * NPM
* **Control de Versiones:**
    * Git / GitHub

## 🚀 Instalación y Ejecución

1.  **Clonar el repositorio:**
    ```bash
    git clone [URL-del-repositorio-GitHub]
    cd Andromeda-inn-Shop
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Ejecutar el servidor de desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:XXXX` (Vite indicará el puerto exacto).

4.  **Ejecutar las pruebas unitarias:**
    ```bash
    npm test
    ```
    Karma iniciará, abrirá un navegador (Chrome o Brave, según `karma.conf.js`) y mostrará los resultados en la terminal.

## 📁 Estructura del Proyecto
'''
andromeda-inn-shop/ ├── public/ # Archivos estáticos (imágenes, index.html base) │ ├── images/ │ └── index.html ├── src/ # Código fuente de la aplicación React │ ├── components/ # Componentes reutilizables │ │ ├── common/ # Componentes generales (ej: Toast) │ │ └── layout/ # Componentes de estructura (Header, Footer, Layouts...) │ ├── contexts/ # Context API para estado global y pruebas unitarias │ │ ├── AuthContext.jsx │ │ ├── AuthContext.spec.js │ │ ├── CartContext.jsx │ │ ├── CartContext.spec.js │ │ ├── OrderContext.jsx │ │ └── ProductContext.jsx │ ├── data/ # Datos iniciales (ej: initialProducts.js) │ ├── features/ # Componentes más específicos (ej: ProductCard.jsx) │ ├── hooks/ # Hooks personalizados (ej: useLocalStorage.js) │ ├── pages/ # Componentes que representan páginas completas │ │ ├── admin/ # Páginas del panel de administración │ │ │ ├── AdminDashboardPage.jsx │ │ │ ├── AdminOrdersPage.jsx │ │ │ ├── AdminProductsPage.jsx │ │ │ └── AdminUsersPage.jsx │ │ ├── CartPage.jsx │ │ ├── CatalogoPage.jsx │ │ ├── ContactPage.jsx │ │ ├── HomePage.jsx │ │ ├── LoginPage.jsx │ │ ├── ProductDetailPage.jsx │ │ └── RegisterPage.jsx │ ├── styles/ # Archivos CSS │ │ ├── admin.css │ │ └── style.css │ └── main.jsx # Punto de entrada de React y configuración de rutas ├── .gitignore # Archivos y carpetas ignorados por Git ├── babel.config.js # Configuración de Babel ├── index.html # Plantilla HTML principal (usada por Vite) ├── karma.conf.js # Configuración de Karma (Test Runner) ├── package-lock.json # Lockfile de dependencias NPM ├── package.json # Metadatos del proyecto y dependencias NPM ├── README.md # Documentación del proyecto (este archivo) └── vite.config.js # Configuración de Vite
'''
## 🔮 Posibles Mejoras Futuras

* Conectar el frontend a un backend real (Node.js, Express, etc.) con una base de datos (MongoDB, PostgreSQL) para persistencia real.
* Implementar subida de archivos para las imágenes de productos en el panel de admin.
* Mejorar la funcionalidad de búsqueda de productos.
* Expandir la cobertura de pruebas unitarias a más componentes y utilidades.
* Implementar pruebas de integración y/o end-to-end (E2E).
* Refinar la interfaz de usuario y la experiencia del usuario (UX).
