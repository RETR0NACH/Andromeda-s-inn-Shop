let mockStorage = {};
const mockUseLocalStorage = (key, initialValue) => {
    if (mockStorage[key] === undefined) {
        mockStorage[key] = typeof initialValue === 'function' ? initialValue() : initialValue;
    }
    const setValue = (newValue) => {
        if (typeof newValue === 'function') {
            mockStorage[key] = newValue(mockStorage[key]);
        } else {
            mockStorage[key] = newValue;
        }
    };
    return [mockStorage[key], setValue];
};


// --- Inicio de las pruebas ---
describe('AuthContext Logic (Simplified Mock)', () => {

  let authLogic;
  let simulatedUsuarios; // Variable local para usuarios
  let simulatedSesion;   // Variable local para sesion
  const adminCredentials = { id: 0, nombre: 'Admin', apellido: '', email: 'andromeda@growshop.cl', password: 'admin123', rol: 'admin' };


  beforeEach(() => {
    // Reinicia el estado simulado ANTES de cada prueba 'it'
    simulatedUsuarios = [];
    simulatedSesion = null;

    // Funciones auxiliares para LEER el estado simulado actual
    const getUsuarios = () => [...simulatedUsuarios]; // Devuelve copia
    const getSesion = () => simulatedSesion ? {...simulatedSesion} : null; // Devuelve copia o null

    // Funciones auxiliares para ESCRIBIR en el estado simulado
    const setUsuarios = (newUsuarios) => { simulatedUsuarios = newUsuarios; };
    const setSesion = (newSesion) => { simulatedSesion = newSesion; };


    // Lógica de login 
    const login = (email, password) => {
      const allUsers = [...getUsuarios()];  
      if (!allUsers.some(u => u.email === adminCredentials.email)) {
          allUsers.push(adminCredentials); // Asegura que el admin exista para la prueba
      }
      const user = allUsers.find(u => u.email === email && u.password === password);
      if (user) {
        setSesion(user); // Escribe estado actualizado
        return user;
      }
      setSesion(null); // Asegura limpiar sesión si falla
      return null;
    };

    // Lógica de register (opera sobre simulatedUsuarios/simulatedSesion)
    const register = (userData) => {
      const currentUsers = getUsuarios(); // Lee estado actual
      if (userData.email === adminCredentials.email || currentUsers.some(u => u.email === userData.email)) {
        return false;
      }
      const newUser = { ...userData, id: Date.now() + Math.random(), rol: 'cliente' }; 
      setUsuarios([...currentUsers, newUser]); // Escribe estado actualizado
      setSesion(newUser); // Escribe estado actualizado
      return true;
    };

    // Lógica de logout (simulatedSesion)
    const logout = () => setSesion(null); // Escribe estado actualizado

    // Lógica de editarUsuario (simulatedUsuarios/simulatedSesion)
    const editarUsuario = (updatedUser) => {
        if (updatedUser.id === 0) return;
        const currentUsers = getUsuarios(); // Lee estado actual
        const updatedUsers = currentUsers.map(u =>
            u.id === updatedUser.id
            ? { ...u, // Mantiene ID, rol, password
                nombre: updatedUser.nombre,
                apellido: updatedUser.apellido,
                email: updatedUser.email
              }
            : u
        );
        setUsuarios(updatedUsers);  

        const currentSesion = getSesion();  
        if (currentSesion && currentSesion.id === updatedUser.id) {
             setSesion({ ...currentSesion, ...updatedUser });  
        }
    };

    // Lógica de eliminarUsuario (simulatedUsuarios)
    const eliminarUsuario = (id) => {
       const currentSesion = getSesion(); 
       if (id === 0 || (currentSesion && currentSesion.id === id)) return;
       const currentUsers = getUsuarios();  
       setUsuarios(currentUsers.filter(u => u.id !== id));  
    };

    // Objeto con la lógica a probar
    authLogic = {
      login, register, logout, editarUsuario, eliminarUsuario,
      // Getters que leen el estado simulado ACTUAL
      getUsuarios: getUsuarios,
      getSesion: getSesion,
      isAuthenticated: () => !!getSesion(),  
      isAdmin: () => getSesion()?.rol === 'admin' // Usa el getter actualizado
    };
  });

  // --- Tests ----

  it('1. Debería inicializar sin sesión activa', () => {
    expect(authLogic.isAuthenticated()).toBe(false);
    expect(authLogic.getSesion()).toBeNull();
  });

});