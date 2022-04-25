import React from 'react';
import TodoListItem from './TodoListItem';
import useTodoListStore from './useTodoListStore';

function TodoListUl({ deleteTodo, completeTodo}){
  const todoList = useTodoListStore(state=>state.todoList);
  return (
    <ul className="todo-list">
      {todoList.map(todo =>
        (<TodoListItem key={todo.id} {...todo} />))
      }
    </ul>
  )
}

export default TodoListUl;