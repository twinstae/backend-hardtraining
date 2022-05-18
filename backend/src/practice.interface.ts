






type Todo = {
  Content : string;
  Completed : boolean;
  CreatedAT : number;
};


interface ITodoRepository {
  saveAll : (todoList:Todo[]) => Promise<void>;
  getAll : () => Promise<Todo[]>
}

interface ITodoListService {

  addTodo: (newTodo : Todo) => Promise<void>
  completeTodo: (targetContent : string) => Promise<void>
  deleteTodo: (targetContent : string) => Promise<void>
  getTodoList: () => Promise<Todo[]>

}