import Fastify, { FastifyInstance, RouteShorthandOptions } from 'fastify'
import { addTodo, deleteTodo, completeTodo } from './todoList';
// require commonjs
// import  esm

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

let todoList = [{ content: "일본 라면 먹기", completed: false, createdAt: 123 }];

// query, Read 읽기 요청!
// get /todo-list 라는 요청이 들어오면
// todoList 를 반환하는 route 를 만들어보세요!
server.get('/todo-list', opts, async (request, reply) => {
  return { todoList }
});

// mutation, side effect, create/update/delete/ => CUD
// http method
// addTodo post

// ?name="taehee"&age=28 <- search params, query params
// body json
server.post<{ Body : Todo }>('/todo-list', async (request, reply) => {
  const newTodo = request.body;
  todoList = addTodo(todoList, newTodo);
  return { ok: true }
});

// deleteTodo delete
server.delete<{ Params: { targetContent: string } }>('/todo-list/:targetContent', async (request, reply) => {
  const { targetContent } = request.params;
  todoList = deleteTodo(todoList, targetContent);
  return { ok: true }
});

// completeTodo patch
server.patch<{ Params: { targetContent: string } }>('/todo-list/:targetContent', async (request, reply) => {
  const { targetContent } = request.params;
  todoList = completeTodo(todoList, targetContent);
  return { ok: true }
});

const start = async () => {
  try {
    await server.listen(3000)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port

  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start();
