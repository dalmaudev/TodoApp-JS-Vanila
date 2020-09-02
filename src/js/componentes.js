import { Todo } from "../classes";
import { todoList } from '../index';

// Referencia HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput    = document.querySelector('.new-todo');
const btnBorrar   = document.querySelector('.clear-completed'); 
const ulFilters   = document.querySelector('.filters');
const aFiltros    = document.querySelectorAll('.filtro');

export const crearTodoHTML = (todo) => {

    const htmlTodo =`  
        <li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
        <div class="view">
            <input class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
            <label>${todo.tarea}</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
        </li>
    `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

};

// Eventos

txtInput.addEventListener('keyup', (event) => {
    if (event.keyCode === 13 && txtInput.value.length > 0) {

        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);

        crearTodoHTML(nuevoTodo);

        txtInput.value = ''; // borramos al darle enter

    }
    
})

// Listener para el evento click en el <li> 
divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; // recoge el elemento: "input", "label" o "button"
    const todoElemento = event.target.parentElement.parentElement; // tiene el <li> entero
    const todoId = todoElemento.getAttribute('data-id'); // id

    if (nombreElemento.includes('input')) { // click en el check (input)
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); // cambia a completed
    } else if (nombreElemento.includes('button')){
        todoList.eliminarTodo(todoId); // borramos la id del arreglo
        divTodoList.removeChild(todoElemento);
    }

})

// Listener Borrar completados
btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();

    //barremos el divtodolist de abajo arriba, inverso
    for(let i = divTodoList.children.length-1; i >= 0; i--){

        // si esta completado borrarlo
        const elemento = divTodoList.children[i];

        if (elemento.classList.contains('completed')) { //contiene la clase completed
            divTodoList.removeChild(elemento); // eliminamos li class completed
        }
    }
})

// Listener filtros todos / pendientes / completados
ulFilters.addEventListener('click', (event) => {

    const filtro = event.target.text;

    if (!filtro) {return;}

    aFiltros.forEach(element => element.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        
        elemento.classList.remove('hidden');

        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden')
                }
                break;
            case 'Completados':
                if (!completado) { // si no esta completado agrega hidden
                    elemento.classList.add('hidden')
                }
                break;
        }
    }

})
