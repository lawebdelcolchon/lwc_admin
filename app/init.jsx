// src/app/init.jsx
import axios from "axios";

const initializeApp = () => {
    // Configurar la base URL automáticamente según el entorno
    const baseURL = import.meta.env.VITE_NODE_ENV === 'production' 
        ? import.meta.env.VITE_BASE_URL_PROD 
        : import.meta.env.VITE_BASE_URL_DEV;

    axios.defaults.baseURL = baseURL;

    if (import.meta.env.VITE_NODE_ENV === 'development') {
        // Código para desarrollo
        console.log("Modo desarrollo");
    } else {
        // Código para producción
        console.log = () => {}; // Deshabilitar logs en producción
        // Inicializar analytics, etc.
    }
}

export default initializeApp;
