import ReactDOM from 'react-dom';
import React from 'react';
import Counter from './Counter';
import TodoList from './TodoList.jsx';
import "./index.css";

// reactive state 반응형 상태
// subscribe
/*
  
*/
function App(){
  return (
     <TodoList />
  )
}

ReactDOM.render(<App />, document.getElementById('app'));