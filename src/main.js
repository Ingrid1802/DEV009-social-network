// Este es el punto de entrada de tu aplicación
// Mostramos las vistas que tendrá nuestro proyecto mediante las rutas

// Importamos las vistas desde archivos separados
import { loginView } from './component/login.js';
import { registroView } from './component/registro.js';
import { errorView } from './component/404.js';
import { feedView } from './component/feed.js';

// Obtenemos el elemento con el ID 'root' del documento HTML
const root = document.getElementById('root');

// Definimos las rutas y las correspondientes vistas

/* Se definen las rutas de la aplicación como un array de objetos. Cada objeto tiene una propiedad
path(ruta) y una propiedad component ( q son las funciones q estamos importando). */
const routes = [
  { path: '/', component: loginView },
  { path: '/registro', component: registroView },
  { path: '/404', component: errorView },
  { path: '/feed', component: feedView },
];

// Ruta predeterminada en caso de que no haya coincidencia con ninguna ruta
const defaultRoute = '/';

// Función para cambiar las páginas según la ruta actual

// hash es lo que sigue despues del # en la ruta,
function pages(hash) {
  // Buscamos una ruta que coincida con el hash en las rutas definidas
  /*
  *utiliza el método .find() en el array routes para buscar un objeto de ruta que coincida con la
  ruta actual (representada por el valor del parámetro hash).

  *´routeFind: Es un nombre que se le da al parámetro de la función que se pasa a .find().
  Representa cada elemento del array routes a medida que se recorre.

  * routeFind.path: Entra a la propiedad path del objeto routeFind,q es la ruta definida en ese obj.

  * === hash:Compara la ruta actual representada por el valor del parámetro hash con la ruta path de
  cada objeto en el array routes.

  * El método .find() es una función de los arrays en JavaScript que se utiliza para buscar un
  elemento en el array que cumpla con una cierta condición.

   */
  const route = routes.find((routeFind) => routeFind.path === hash);

  // Si encontramos una ruta válida y tiene un componente asociado
  if (route && route.component) {
    // Modificamos la URL en la barra de direcciones del navegador
    /**
     * window.history: Es un objeto en el navegador que representa el historial de navegación.
     Permite controlar el historial de navegación del usuario y realizar acciones como retroceder,
     avanzar y modificar la URL.

     *.pushState(state, title, url): Es un método que agrega una nueva entrada al historial de
     navegación.No realiza una solicitud al servidor, solo cambia la URL visible en la barra de
     direcciones del navegador.

     */
    window.history.pushState({}, route.path, window.location.origin + route.path);

    // Limpiamos el contenido actual del elemento root(root es el div del html)
    root.innerHTML = '';

    // Obtenemos el nombre de usuario desde el almacenamiento local
    const userDisplayName = localStorage.getItem('userDisplayName');

    // Agregamos el componente de la ruta actual al elemento root
    root.appendChild(route.component(userDisplayName));
  } else {
    // Si no hay coincidencia de ruta, redirigimos a la página de error
    pages('/404');
  }
}

// Llamamos a la función 'pages' con la ruta actual o la ruta predeterminada
pages(window.location.pathname || defaultRoute);
// Esto permite que la función pages maneje la navegación y renderice el componente correspondiente
// a esa ruta.
