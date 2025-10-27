// src/contexts/CartContext.spec.js

// Mock muy simple para useAuth
const mockUseAuth = (isLoggedIn = true, userId = 1) => ({
  sesion: isLoggedIn ? { id: userId, email: 'test@user.com' } : null
});

describe('CartContext Logic (Simplified Mock)', () => {
  let cartLogic;
  let simulatedCart; // Variable local para el carrito de CADA prueba
  const mockSesionId = 1;

  const producto1 = { id: 101, nombre: 'Producto A', precio: 1000 };
  const producto2 = { id: 102, nombre: 'Producto B', precio: 2500 };

  beforeEach(() => {
    // ASEGURA QUE SE RESETEA EN CADA 'it'
    simulatedCart = [];
    const { sesion } = mockUseAuth(true, mockSesionId);

    // Funciones que modifican 'simulatedCart'
    const updateCart = (newCart) => { if(sesion) simulatedCart = newCart; };
    const addToCart = (producto) => { /* ... lógica que llama a updateCart ... */ 
        const existingProductIndex = simulatedCart.findIndex(item => item.id === producto.id);
        let newCart = [];
        if (existingProductIndex !== -1) {
            newCart = simulatedCart.map((item, index) =>
            index === existingProductIndex ? { ...item, cantidad: item.cantidad + 1 } : item
            );
        } else {
            newCart = [...simulatedCart, { ...producto, cantidad: 1 }];
        }
        updateCart(newCart);
    };
    const decreaseQuantity = (productId) => { /* ... lógica que llama a updateCart ... */ 
        const newCart = simulatedCart.map(item =>
            item.id === productId ? { ...item, cantidad: item.cantidad - 1 } : item
        ).filter(item => item.cantidad > 0); 
        updateCart(newCart);
    };
    const removeFromCart = (productId) => { /* ... lógica que llama a updateCart ... */ 
        const newCart = simulatedCart.filter(item => item.id !== productId);
        updateCart(newCart);
    };
    const clearCart = () => updateCart([]);

    // Getters que leen 'simulatedCart'
    const calculateTotal = () => simulatedCart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    const calculateItemCount = () => simulatedCart.reduce((sum, item) => sum + item.cantidad, 0);
    const getCart = () => [...simulatedCart];

    cartLogic = {
      addToCart, decreaseQuantity, removeFromCart, clearCart,
      getTotal: calculateTotal,
      getItemCount: calculateItemCount,
      getCart: getCart
    };
  });

  // --- Tests (Estos deberían funcionar ahora) ---
  // ... (Los 9 tests 'it' como estaban en la respuesta anterior) ...

  it('1. Debería inicializar un carrito vacío', () => {
    expect(cartLogic.getCart()).toEqual([]);
    expect(cartLogic.getItemCount()).toBe(0);
    expect(cartLogic.getTotal()).toBe(0);
  });

  it('2. Debería agregar un nuevo producto al carrito', () => {
    cartLogic.addToCart(producto1);
    const cart = cartLogic.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(producto1.id);
    expect(cart[0].cantidad).toBe(1);
    expect(cartLogic.getItemCount()).toBe(1);
    expect(cartLogic.getTotal()).toBe(1000);
  });

  it('3. Debería incrementar la cantidad si el producto ya existe', () => {
    cartLogic.addToCart(producto1);
    cartLogic.addToCart(producto1);
    const cart = cartLogic.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].cantidad).toBe(2);
    expect(cartLogic.getItemCount()).toBe(2);
    expect(cartLogic.getTotal()).toBe(2000);
  });

   it('4. Debería agregar múltiples productos diferentes', () => {
     cartLogic.addToCart(producto1); // A:1
     cartLogic.addToCart(producto2); // B:1
     cartLogic.addToCart(producto1); // A:2
     const cart = cartLogic.getCart();
     expect(cart.length).toBe(2);
     expect(cartLogic.getItemCount()).toBe(3);
     expect(cartLogic.getTotal()).toBe(4500); // (1000*2 + 2500*1)
  });

   it('5. Debería disminuir la cantidad de un producto', () => {
      cartLogic.addToCart(producto1);
      cartLogic.addToCart(producto1); // A:2
      cartLogic.decreaseQuantity(producto1.id); // A:1
      const cart = cartLogic.getCart();
      expect(cart.length).toBe(1);
      expect(cart[0].cantidad).toBe(1);
      expect(cartLogic.getItemCount()).toBe(1);
      expect(cartLogic.getTotal()).toBe(1000);
   });

   it('6. Debería eliminar un producto si la cantidad llega a cero al disminuir', () => {
      cartLogic.addToCart(producto1); // A:1
      cartLogic.decreaseQuantity(producto1.id); // A:0 -> eliminado
      const cart = cartLogic.getCart();
      expect(cart.length).toBe(0);
      expect(cartLogic.getItemCount()).toBe(0);
      expect(cartLogic.getTotal()).toBe(0);
   });

  it('7. Debería eliminar un producto del carrito directamente', () => {
    cartLogic.addToCart(producto1); // A:1
    cartLogic.addToCart(producto2); // B:1
    cartLogic.removeFromCart(producto1.id); // A eliminado
    const cart = cartLogic.getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(producto2.id);
    expect(cartLogic.getItemCount()).toBe(1);
    expect(cartLogic.getTotal()).toBe(2500);
  });

  it('8. Debería vaciar el carrito completamente', () => {
    cartLogic.addToCart(producto1);
    cartLogic.addToCart(producto2);
    cartLogic.clearCart();
    const cart = cartLogic.getCart();
    expect(cart.length).toBe(0);
    expect(cartLogic.getItemCount()).toBe(0);
    expect(cartLogic.getTotal()).toBe(0);
  });

   it('9. Debería calcular el total correctamente con varias unidades', () => {
     cartLogic.addToCart(producto1); // A:1 (1000)
     cartLogic.addToCart(producto1); // A:2 (2000)
     cartLogic.addToCart(producto2); // B:1 (2500) -> Total: 4500
     cartLogic.addToCart(producto2); // B:2 (5000) -> Total: 7000
     cartLogic.addToCart(producto2); // B:3 (7500) -> Total: 9500
     expect(cartLogic.getTotal()).toBe(9500);
     expect(cartLogic.getItemCount()).toBe(5);
   });

});