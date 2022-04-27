import create from 'zustand';

const initValue = [
  {
    id: crypto.randomUUID(), // string
    content: "벚꽃구경하기",
    completed: false, // boolean
  },
];

const useTodoListStore = create(set => ({
  todoList: initValue,
  addTodo: (newContent) => set(old => {
    const newTodo =  {
      id: crypto.randomUUID(),
      content: newContent,
      completed: false,
    };

    return {
      todoList: [...old.todoList, newTodo]
    };
  }),
  deleteTodo:(id) => set((old) => {
  
    return {
      todoList: old.todoList.filter((todo)=>todo.id!==id)
    }
  }),
  completeTodo: (id, checked) => set((old) => {
    return {
      todoList: old.todoList.map(todo => todo.id !== id ? todo : {
        ...todo,
        completed: checked,
      })
    }
  }),
  clearCompletedTodos: () => set(old => {
    return {
      todoList: old.todoList.filter(todo => todo.completed === false)
    }
  })
  
}));

  // // 완료되지 않은 할일의 개수????
  // const remainingCount = todoList.filter((todo)=> todo.completed === false ).length;

  // // 버튼을 클릭하면... 완료된 todo가 모두 삭제되어야 함
  // // 완료되지 않은 todo만 남겨야 한다....
  // function clearCompletedTodos(){
  //   setTodoList(old => old.filter(todo => todo.completed === false));
  // }
  // // 완료된 todo가 없으면... clear 버튼이 안 보여야 함
  // const completedCount = todoList.length - remainingCount;

export const useRemainingCount = ()=>{
  return useTodoListStore(state=>state.todoList.filter((todo)=> todo.completed === false).length)
}

export const useCompletedCount = ()=>{
  return useTodoListStore(state=>state.todoList.filter((todo)=> todo.completed === true).length)
}

export default useTodoListStore;