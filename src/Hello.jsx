import React from "react";

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

export default function Hello() {
  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            defaultValue=""
          />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            <TodoListItem content="탐정 토끼는 프리스타일 랩을 한다" completed={false} />
            <TodoListItem content="금곰은 운동을 한다" completed={true} />
            <TodoListItem content="핑구는 파스타를 먹는다" completed={false} />
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
