// Type 'boolean' is not assignable to type 'string'.

// todo란 무엇인가?
// content: "일본 라면 먹기"
// completed: 완료 여부를 표현할 수 없다!

// todo 목록 전체를 가져올 수 있다
  // pagination

type Todo = {
  content: string;
  completed: boolean;
  createdAt: number;
};

// cqrs -> 읽기 (의존성)와 쓰기(부수효과)를 분리

// 순수함수 => 어떤 값을 받아서 변환하는 게 목적... 항상 같은 값이 들어오면 같은 값이 나와야 한다
// 부수효과가 있는 function (=procedure) => 반환하는 값이 없어요! void
// 의존성이 있는 function () => 외부 상태에 따라서 반환하는 값이 늘 변해요!

interface ITodoRepository {
  saveAll: (todoList: Todo[]) => Promise<void>; // todoList를 넘기면 어떤 방식인지는 모르지만 저장을 한다 (create or update) // 부수효과
  //saveAll이 리턴값에 따라 getAll이 리턴하는 값이 달라짐 read = 의존성이 있는 함수
  getAll: () => Promise<Todo[]>// todoList 전체를 리턴;   // 아무 것도 안 넘기면... 어떤 방식인지는 모르지만 todoList를 준다 (read) // 의존성
}

// implements
interface ITodoListService {
  // mutation, command
  addTodo: (newTodo: Todo) => Promise<void>
  deleteTodo: (targetContent: string) => Promise<void>
  completeTodo: (targetContent: string) => Promise<void>
  // query
  getTodoList: () => Promise<Todo[]>
}

// CQRS : 명령과 질의의 분리!
