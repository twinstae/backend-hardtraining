import React, { useState } from "react";
import useTodoListStore from './useTodoListStore';

function AddTodoForm(){
  const [todoInput, setTodoInput] = useState(""); // UI 상태, local, react-hook-form

  const handleChange = (e)=>{
    setTodoInput(e.target.value);
  }

  const addTodo = useTodoListStore(state => state.addTodo);

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