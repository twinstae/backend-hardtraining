import React, { useState } from "react";

function AddTodoForm({addTodo}){
  const [todoInput, setTodoInput] = useState(""); // UI 상태, local, react-hook-form

  const handleChange = (e)=>{
    setTodoInput(e.target.value);
  }

  return (
    <form onSubmit={(event)=>{
      event.preventDefault();
      addTodo(todoInput);
      setTodoInput("");
    }}>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        value={todoInput}
        onChange={handleChange}
      />
    </form>
  )
}

export default AddTodoForm;