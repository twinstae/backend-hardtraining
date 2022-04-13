import React, { useState } from "react";

/*
0. style loader와 css!
1. jsx => html 이랑 다른 점!
2. 리액트의 렌더링 과정! => 컴포넌트 함수가 매번 다시 호출된다는 거!
3. 타입스크립트 전환
4. 컴포넌트 분리 => props 넘기고 받기
*/

function TodoListItem({ completed, content }){
  return (
    <li className={completed ? "completed" : ""}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{content}</label>
        <button className="destroy" />
      </div>
      <input className="edit" defaultValue={content} />
    </li>
  )
}


export default function TodoList() {
  // todoList의 상태
  const initValue = ["벚꽃구경하기"];
  const [todoList, setTodoList] = useState(initValue); // 서버 동기화되는 상태, 전역 상태, zustand
  // 추가
  const [todoInput, setTodoInput] = useState(""); // UI 상태, local, react-hook-form

  const handleChange = (e)=>{
    setTodoInput(e.target.value);
  }
  // 완료하기
  // 삭제하기

  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={(event)=>{
            event.preventDefault();

            setTodoList([...todoList, todoInput]);
            setTodoInput("");
          }}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={todoInput}
              onChange={handleChange}
            />
          </form>
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {todoList.map(todo => <TodoListItem content={todo} completed={false} />)}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>1</strong>
            <span> </span>
            <span>item</span>
            <span> left</span>
          </span>
          <ul className="filters">
            <li>
              <a href="#/" className="selected">
                All
              </a>
            </li>
            <span> </span>
            <li>
              <a href="#/active" className="">
                Active
              </a>
            </li>
            <span> </span>
            <li>
              <a href="#/completed" className="">
                Completed
              </a>
            </li>
          </ul>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </div>
    </section>
  );
}