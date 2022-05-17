// 데이터를 읽기, 질의 query (read)

// 데이터를 변경 mutation, (create update delete)
// todo를 추가할 수 있다
export function addTodo(todoList: Todo[], newTodo: Todo): Todo[]{
  // todoList.push(newTodo);
  return [...todoList, newTodo];
}
// todoList.push({ content: "프리스타일 랩하기", completed: true, createdAt: Date.now() });

// todo를 완료할 수 있다
export function completeTodo(todoList: Todo[], targetContent: string): Todo[]{
  // const targetTodo = todoList.find(todo => todo.content === targetContent);
  // targetTodo.completed = true;

  return todoList.map(todo => todo.content === targetContent ? {...todo, completed: !todo.completed } : todo);
}

// todo를 삭제할 수 있다
export function deleteTodo(todoList: Todo[], targetContent: string): Todo[]{
  return todoList.filter(todo => todo.content !== targetContent);
}

const domain = {
  addTodo,
  completeTodo,
  deleteTodo
};

export default domain;