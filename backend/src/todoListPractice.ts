// #pseudoCode 의사코드!

//todoList 어떤 기능 구현?

// 데이터를 읽기, 질의 query (read)
// get

// 데이터를 변경 mutation, (create update delete)
// todo를 추가할 수 있다

//함수를 만드는 3가지 방법?
//export 함수를 만드는 것과 관련 없음!
//내보내는 것!

//addTodo 할일4 = todoList라는 배열에 할일4를 추가한다
//completeTodo = 할일의 상태를? 변경

//deleteTodo = 할일3을 삭제

function addTodo(todoList: Todo[], newTodo: Todo) : Todo[] {
  // todoList에 newTodo를 추가한다!
  return [...todoList, newTodo];
}

// todo를 완료할 수 있다
//
function completeTodo(todoList: Todo[], targetContent: string) : Todo[] {
  return todoList.map((todo) =>
    todo.content === targetContent ? { ...todo, completed: true } : todo
  );
}

//제가 삭제하려는 그 객체!    todo.content !== targetContent인 경우

// todo를 삭제할 수 있다
function deleteTodo(todoList: Todo[], targetContent: string): Todo[] {
  return todoList.filter((todo) => todo.content !== targetContent);
  // 삭제하려는 targetContent가 아닌 걸 걸러서 리턴함)
}
