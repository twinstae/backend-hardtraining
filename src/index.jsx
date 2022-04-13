import ReactDOM from 'react-dom';
import React, { useContext, useState } from 'react';
import Counter, { useCounter, CounterContext } from './Counter';
import TodoList from './TodoList.jsx';
import "./index.css";

// reactive state 반응형 상태
// subscribe
/*
  const counterStore = useCounter();
<CounterContext.Provider value={counterStore}>
 <Counter />
</CounterContext.Provider>
*/
function App(){

  return (
   <TodoList />
  );
}

ReactDOM.render(<App />, document.getElementById('app'));