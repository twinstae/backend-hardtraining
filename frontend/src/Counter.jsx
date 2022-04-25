import React from 'react';
import create from 'zustand'

// zustand
const useStore = create(set => ({
  count: 0,
  increase: () => set(state => ({ count: state.count + 1 })),
  decrease: () => set(state => ({ count: state.count - 1 })),
}));

function IncreaseButton(){
  const increase = useStore(state => state.increase);
  return <button onClick={increase}> +1 </button>
}

function Controls(){
  const decrease = useStore(state => state.decrease);
  return (
    <>
      <IncreaseButton />
      <button onClick={decrease}> -1 </button>
    </>
  )
}

const Counter = () => {
  const count = useStore(state => state.count);
  return (
    <>
      <h1>현재 카운트 : {count} </h1>
      <Controls />
    </>
  );
}

export default Counter;