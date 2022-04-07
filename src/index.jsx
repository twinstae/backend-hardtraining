import ReactDOM from 'react-dom';
import React from 'react';
import Hello from './Hello';
import "./index.css";

function App(){
  return <Hello />;
}

ReactDOM.render(<App />, document.getElementById('app'));