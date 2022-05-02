import create from 'zustand';

const initValue = [
  {
    id: crypto.randomUUID(), // string
    content: "벚꽃구경하기",
    completed: false, // boolean
  },
];
// filter 상태는 어떤 타입이 어울릴까요?
// type FilterT = "all"|"active"|"completed" // 어떤 필터가 선택되었는지?
// filteredList = Todo[] // 필터된 리스트의 타입
// filter 의 초기 값은 뭘까요?
// filteredList = 원본 todoList 전체
// filter 라는 이름은 괜찮은 이름을 붙일 수 없을까요?

const filterDict = {
  "all": todoList => todoList,
  "active": todoList => todoList.filter((todo)=> todo.completed === false),
  "completed": todoList => todoList.filter((todo)=> todo.completed === true),
}

const useTodoListStore = create(set => ({
  todoList: initValue,
  selectedFilter: "all", // as FilterT,
  selectFilter: (newFilter) => set(old => {
  
    return {
      ...old,
      selectedFilter: newFilter,
    }
  }),
  addTodo: (newContent) => set(old => {
    const newTodo =  {
      id: crypto.randomUUID(),
      content: newContent,
      completed: false,
    };

    return {
      ...old,
      todoList: [...old.todoList, newTodo]
    };
  }),
  deleteTodo:(id) => set((old) => {
  
    return {
      ...old,
      todoList: old.todoList.filter((todo)=>todo.id!==id)
    }
  }),
  completeTodo: (id, checked) => set((old) => {
    return {
      ...old,
      todoList: old.todoList.map(todo => todo.id !== id ? todo : {
        ...todo,
        completed: checked,
      })
    }
  }),
  clearCompletedTodos: () => set(old => {
    return {
      ...old,
      todoList: filterDict.active(old.todoList)
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

  // derived, computed, getter, selector, lazy ...
export const useRemainingCount = ()=>{
  return useTodoListStore(state=>filterDict.active(state.todoList).length)
}

export const useCompletedCount = ()=>{
  return useTodoListStore(state=>filterDict.completed(state.todoList).length)
}


export const useFilteredTodoList = () => {
  return useTodoListStore(state => {
    // todoList 꺼내기
    // 선택된 filter 꺼내기
    // 원본 투두리스트에서 선택된 필터에 따라서 다르게 필터한 todoList를 리턴하기
    // const filterFunc = filterDict[state.selectedFilter]; // filterDict에서 원하는 필터 함수 가져오기

    return filterDict[state.selectedFilter](state.todoList); // todoList에 그 필터함수를 적용해서 반환하기
  })
}

export default useTodoListStore;