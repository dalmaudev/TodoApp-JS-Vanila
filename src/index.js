import './styles.css';

import { Todo, TodoList } from './classes';
import { crearTodoHTML } from './js/componentes';


export const todoList = new TodoList();

todoList.todos.forEach( crearTodoHTML );

console.log( 'todos', todoList.todos );



