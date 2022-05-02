import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { addTodo, deleteTodo, completeTodo } from './todoList';
import fsRepository from './fsRepository';
// require commonjs
// import  esm

const repository = fsRepository;

const createSetTodoList = (repository: TodoRepository) => async (transform: (todoList: Todo[]) => Todo[] ): Promise<void> => {
  const oldTodoList = await repository.getAll(); // 1 똑같은
  const newTodoList = transform(oldTodoList)    // 2 < 변하는 부분
  await repository.saveAll(newTodoList);       // 3 똑같은
}

const setTodoList = createSetTodoList(repository);

// abstraction 추상화
async function noduplicate<T>(update: (oldTodoList: Todo[], payload: T) => Todo[], payload: T){
  const oldTodoList = await repository.getAll();
  const newTodoList = update(oldTodoList, payload);
  await repository.saveAll(newTodoList);

  // addTodo(oldTodoList, newTodo);
  // deleteTodo(oldTodoList, targetContent);
  // completeTodo(oldTodoList, targetContent);

  // update 
  // arg, param, payload
}

// 함수 추출
// 중복을 찾아서, 함수를 만들고 복붙...
// 비교하면서... 똑같은 부분은 남겨놓고
// 다른 부분은... 추상화시켜서... 매개변수를 받아서 갈아 끼움!

const server: FastifyInstance = Fastify({ logger: true })
const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          todoList: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                content: { type: 'string' },
                completed: { type: 'boolean' },
                createdAt: { type: 'number' },
              }
            }
          }
        }
      }
    }
  }
}

// query, Read 읽기 요청!
// get /todo-list 라는 요청이 들어오면
// todoList 를 반환하는 route 를 만들어보세요!
server.get('/todo-list', opts, async (request, reply) => {
  // fsRepository로 읽어온 todoList 배열(?)을 todoList변수에 담는다. 
  const todoList = await repository.getAll();

  reply.status(200);
  return { todoList };
});

// mutation, side effect, create/update/delete/ => CUD
// http method
// addTodo post

// ?name="taehee"&age=28 <- search params, query params
// body json
server.post<{ Body : Todo }>('/todo-list', async (request, reply) => {
  const newTodo = request.body;

  await noduplicate(addTodo, newTodo);

  reply.status(201);
  return { ok: true }
});


// deleteTodo delete
server.delete<{ Params: { targetContent: string } }>('/todo-list/:targetContent', async (request, reply) => {
  const { targetContent } = request.params;
  
  await noduplicate(deleteTodo, targetContent);

  reply.status(204);
  return { ok: true }
});

// completeTodo patch
server.patch<{ Params: { targetContent: string } }>('/todo-list/:targetContent', async (request, reply) => {
  const { targetContent } = request.params;

  await noduplicate(completeTodo, targetContent);

  reply.status(200);
  return { ok: true }
});

export default server;