import React from 'react'
import useTodoListStore, { useCompletedCount } from './useTodoListStore'

const ClearCompletedButton = () => {
  // 그 커스텀 훅을 이용해서 completedCount 변수를 꺼내고 싶다

  const completedCount = useCompletedCount() ;
  const clearCompletedTodos = useTodoListStore(state => state.clearCompletedTodos);

  return (
    <>
      {completedCount !== 0 && <button className="clear-completed" onClick={() => {
        clearCompletedTodos();
      }}>
        Clear completed
      </button>}
    </>
  )
}

export default ClearCompletedButton