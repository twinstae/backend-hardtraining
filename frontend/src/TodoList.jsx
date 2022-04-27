import React from "react";
import AddTodoForm from './AddTodoForm';
import TodoListItem from './TodoListItem';
import TodoCount from "./TodoCount";
import ClearCompletedButton from './ClearCompletedButton';
import useTodoList from './useTodoList';
import TodoListUl from './TodoListUl';
/*
0. style loader와 css!
1. jsx => html 이랑 다른 점!
2. 리액트의 렌더링 과정! => 컴포넌트 함수가 매번 다시 호출된다는 거!
3. 타입스크립트 전환
4. 컴포넌트 분리 => props 넘기고 받기
*/

// todoMVC => react-redux, redux-toolkit, jotai, recoil, 'zustand', react-query, react-hook-form

export default function TodoList() {

  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <AddTodoForm />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />
          <TodoListUl />
        </section>
        <footer className="footer">
          <TodoCount />
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
          
          <ClearCompletedButton />
        </footer>
      </div>
    </section>
  );
}