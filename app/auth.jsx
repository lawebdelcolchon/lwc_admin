import axios from "axios"

const checkAuth = () => {
/*  Getting token value stored in localstorage, if token is not present we will open login page 
    for all internal dashboard routes  */
    const token = localStorage.getItem("token")
    const PUBLIC_ROUTES = ["login", "forgot-password", "register", "documentation"]

    const isPublicPage = PUBLIC_ROUTES.some( r => window.location.href.includes(r))

    if(!token && !isPublicPage){
        return null;
    }else{
        axios.defaults.headers.common['authorization'] = `${token}`

        axios.interceptors.request.use(function (config) {
            // UPDATE: Add this code to show global loading indicator
            document.body.classList.add('loading-indicator');
            return config
          }, function (error) {
            return Promise.reject(error);
          });
          
          axios.interceptors.response.use(
            function (response) {
              // Quitar el indicador de carga en respuesta exitosa
              document.body.classList.remove('loading-indicator');
              return response;
            }, 
            function (error) {
              // Quitar el indicador de carga cuando haya un error
              document.body.classList.remove('loading-indicator');
          
              // Crear el mensaje de alerta en caso de error
              const alertDiv = document.createElement('div');
              alertDiv.setAttribute('role', 'alert');
              alertDiv.classList.add('alert', 'alert-error');
          
              alertDiv.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>${error.response?.data?.error || 'An error occurred'}</span>
              `;
          
              // Aplicar estilos CSS para que el alert sea flotante y navegable encima de todo
              alertDiv.style.position = 'fixed';
              alertDiv.style.top = '20px';  // Puedes ajustar la distancia desde el top
              alertDiv.style.left = '50%';
              alertDiv.style.transform = 'translateX(-50%)'; // Centrar horizontalmente
              alertDiv.style.zIndex = '9999'; // Alto índice z para superponer
              alertDiv.style.padding = '10px';  // Padding interno del alert
              alertDiv.style.maxWidth = '400px';  // Ancho máximo del alert
              alertDiv.style.backgroundColor = '#f87171';  // Fondo rojo (ejemplo de error)
              alertDiv.style.color = '#fff';  // Texto en blanco
          
              // Añadir el mensaje de error al cuerpo del documento (encima del contenido)
              document.body.prepend(alertDiv);
          
              // Remover la alerta después de unos segundos
              setTimeout(() => alertDiv.remove(), 5000);
          
              return Promise.reject(error);
            }
          );
          
          
        return token
    }
}


export default checkAuth