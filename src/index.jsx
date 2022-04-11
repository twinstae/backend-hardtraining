import ReactDOM from 'react-dom';
import React, { useContext, useState } from 'react';
import Counter, { useCounter, CounterContext } from './Counter';
//import Hello from './Hello';
// import "./index.css";

// reactive state 반응형 상태
// subscribe


function App(){
  const counterStore = useCounter();

  return (
    <CounterContext.Provider value={counterStore}>
      <Counter />
    </CounterContext.Provider>
  );

}

ReactDOM.render(<App />, document.getElementById('app'));