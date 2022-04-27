import React from 'react'
import useTodoListStore, { useRemainingCount } from './useTodoListStore';

const TodoCount = () => {
  // 완료되지 않은 todo의 개수
  // 0개이거나 여러 개면 -> items
  // 1개인 경우에만 -> item 단수

  const todoCount = useRemainingCount();
  
  return (
    <span className="todo-count">
      <strong>{todoCount}</strong>
      <span> </span>
      <span>item{todoCount===1 ? '' : 's' } </span>
      <span>left</span>
    </span>
  )
}

export default TodoCount