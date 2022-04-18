import React, { useState } from "react";
import AddTodoForm from './AddTodoForm';
/*
0. style loader와 css!
1. jsx => html 이랑 다른 점!
2. 리액트의 렌더링 과정! => 컴포넌트 함수가 매번 다시 호출된다는 거!
3. 타입스크립트 전환
4. 컴포넌트 분리 => props 넘기고 받기
*/

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


export default function TodoList() {
  // Todo 객체는?
  // id
  // content
  // completed

  // todoList의 상태
  const initValue = [
    {
      id: crypto.randomUUID(), // string
      content: "벚꽃구경하기",
      completed: false, // boolean
    },
    {
      id: crypto.randomUUID(), // string
      content: "토끼는 프리스타일을 한다",
      completed: true, // boolean
    }
  ];
  const [todoList, setTodoList] = useState(initValue); // 서버 동기화되는 상태, 전역 상태, zustand
  // 추가

  function addTodo(newContent){
    const newTodo =  {
      id: crypto.randomUUID(),
      content: newContent,
      completed: false,
    };
    setTodoList(old => [...old, newTodo]);
  }
  // 삭제하기
  // 삭제할 친구만 filter 해서 setTodoList를 한다..
  function deleteTodo(id){
    setTodoList(old => old.filter((todo) => todo.id !== id));
  }
  // 완료하기
  function completeTodo(id, checked){
    setTodoList(old => old.map(todo => todo.id !== id ? todo : {
      ...todo,
      completed: checked,
    }))
  }

  return (
    <section className="todoapp">
      <div>
        <header className="header">
          <h1>todos</h1>
          <AddTodoForm addTodo={addTodo} />
        </header>
        <section className="main">
          <input id="toggle-all" className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all" />
          <ul className="todo-list">
            {todoList.map(todo =>
              (<TodoListItem {...todo} deleteTodo={deleteTodo} completeTodo={completeTodo} />))
            }
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