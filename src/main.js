// Este es el punto de entrada de tu aplicacion
// Mostramos las vistas que tendra nuestro proyecto mediante las rutas
import { loginView } from './component/login.js';
import { registroView } from './component/registro.js';
import { errorView } from './component/404.js';
import { feedView } from './component/feed.js';

const root = document.getElementById('root');

const routes = [{ path: '/', component: loginView }, { path: '/registro', component: registroView }, { path: '/404', component: errorView }, { path: '/feed', component: feedView },
];
const defaultRoute = '/';
function pages(hash) {
  const route = routes.find((routeFind) => routeFind.path === hash);
  if (route && route.component) {
    window.history.pushState({}, route.path, window.location.origin + route.path);
    root.innerHTML = ''; // Limpia el contenido actual
    const userDisplayName = localStorage.getItem('userDisplayName'); // Parsea la cadena JSON a un objeto
    root.appendChild(route.component(userDisplayName));// Pasa el objeto de usuario a la vista
  } else {
    pages('/404');
  }
}
pages(window.location.pathname || defaultRoute);
