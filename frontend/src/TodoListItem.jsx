import React from "react";

function TodoListItem({ id, completed, content, deleteTodo, completeTodo }){
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