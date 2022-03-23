// 데이터를 읽기, 질의 query (read)
let todoList = [
  { content: "일본 라면 먹기", completed: false, createdAt: Date.now() },
];

// todo란 무엇인가?
"일본 라면 먹기" // 완료 여부를 표현할 수 없다!

console.log(todoList);
// todo 목록 전체를 가져올 수 있다
  // pagination

// 데이터를 변경 mutation, (create update delete)
// todo를 추가할 수 있다
todoList.push({ content: "프리스타일 랩하기", completed: true, createdAt: Date.now() });
console.log("추가 후", todoList);

// todo를 완료할 수 있다
const targetTodo = todoList.find(todo => todo.content === "일본 라면 먹기");
targetTodo.completed = true;
console.log("완료 후", todoList);

// todo를 삭제할 수 있다
todoList = todoList.filter(todo => todo.content !== "프리스타일 랩하기");
console.log("삭제 후", todoList);