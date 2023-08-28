export function errorView() {
  const titulo = document.createElement('h2');
  titulo.textContent = 'Página no encontrada';
  titulo.classList.add('error');
  return titulo;
}
/**
 * Aca se exporta una funcion que se llama errorView
 * dentra de la funcion hay una constante llamada titulo en la que se almacena un h2 q fue creado
  este h2 contendra el texto q dice pagina no encontrada y se le agrega una class llamada error
  luego me dice q esto deberia de retornar titulo q es el nombre de la constante
 */
