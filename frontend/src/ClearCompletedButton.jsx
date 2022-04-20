import React from 'react'

const ClearCompletedButton = ({completedCount, clearCompletedTodos}) => {
  return (
    <>
      {completedCount !== 0 && <button className="clear-completed" onClick={() => {
        clearCompletedTodos();
      }}>Clear completed</button>}
    </>
  )
}

export default ClearCompletedButton