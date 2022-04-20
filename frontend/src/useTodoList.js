import { useState } from "react";

function useTodoList(){
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

  // 완료되지 않은 할일의 개수????
  const remainingCount = todoList.filter((todo)=> todo.completed === false ).length;

  // 버튼을 클릭하면... 완료된 todo가 모두 삭제되어야 함
  // 완료되지 않은 todo만 남겨야 한다....
  function clearCompletedTodos(){
    setTodoList(old => old.filter(todo => todo.completed === false));
  }
  // 완료된 todo가 없으면... clear 버튼이 안 보여야 함
  const completedCount = todoList.length - remainingCount;

  // public 밖에 공개하는 거
  return {
    todoList,
    remainingCount,
    completedCount,
    addTodo,
    deleteTodo,
    completeTodo,
    clearCompletedTodos,
  }
}

export default useTodoList;