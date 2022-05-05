import React from 'react';
import TodoListItem from './TodoListItem';
import { useFilteredTodoList } from './useTodoListStore';

function TodoListUl(){
  const todoList = useFilteredTodoList();
  return (
    <ul className="todo-list">
      {todoList.map(todo =>
        (<TodoListItem key={todo.id} {...todo} />))
      }
    </ul>
  )
}

export default TodoListUl;