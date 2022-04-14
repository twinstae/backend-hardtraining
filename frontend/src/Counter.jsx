import React, { useContext, useState } from 'react';

export function useCounter(){
  const [count, setCount] = useState(0);

  // derived 파생 상태
  const double = count * 2;

  const increase = () => setCount(count + 1);
  const decrease = () => setCount(count - 1);

  return {
    count,
    double,
    increase,
    decrease,
  }
};

function IncreaseButton(){
  const { increase } = useContext(CounterContext);
  return <button onClick={increase}> +1 </button>
}

function Controls(){
  const { decrease } = useContext(CounterContext);
  return (
    <>
      <IncreaseButton />
      <button onClick={decrease}> -1 </button>
    </>
  )
}

const Counter = () => {
  const { count, double } = useContext(CounterContext);
  return (
    <>
      <h1>현재 카운트 : {count}, {double}</h1>
      <Controls />
    </>
  );
}
export const CounterContext = React.createContext(null);

export default Counter;