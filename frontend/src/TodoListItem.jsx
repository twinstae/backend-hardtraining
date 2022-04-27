import React from "react";
import useTodoListStore from './useTodoListStore';

function TodoListItem({ id, completed, content }){

  const deleteTodo= useTodoListStore(state => state.deleteTodo);
  const completeTodo= useTodoListStore(state => state.completeTodo);

  return (
    <li className={completed ? "completed" : ""}>
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={completed}
          onChange={(e) => {
            completeTodo(id, e.target.checked);
          }} />
        <label>{content}</label>
        <button className="destroy" onClick={(e) =>{
          deleteTodo(id);
        }}/>
      </div>
      <input className="edit" defaultValue={content} />
    </li>
  )
}

export default TodoListItem;