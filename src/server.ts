import Fastify, { RouteShorthandOptions } from 'fastify'
import { addTodo, completeTodo, deleteTodo } from "./todoList.js";

const server = Fastify({ logger: true })

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          pong: {  type: 'string' }
        }
      }
    }
  }
}

server.get('/ping', opts, async (request, reply) => {
  return { pong: 'it worked!' }
})

let todoList: Todo[] = [
  {
    content: "일본 라면 먹기",
    completed: false,
    createdAt: Date.now()
  },
];

// 현재 투두 목록 가져오기
server.get('/todos', async (request, reply) => {
  return todoList;
})

// 투두 추가하기
server.post<{ Body: Todo }>('/add-todo', {
  schema: {
    body: {
      type: "object",
      required: ["content", "completed", "createdAt"],
      properties: {
        content: { type: 'string' },
        completed: { type: 'boolean' },
        createdAt: { type: 'number' },
      }
    }
  }
}, async (request, reply) => {
  const newTodo = request.body
  todoList = addTodo(todoList, newTodo);
  return { ok: true };
})

// 투두 삭제하기
// delete
// url "/delete-todo/:todoContent" request.params.todoContent

// 투두 완료하기
// patch
// url "/complete-todo/:todoContent" request.params.todoContent

const start = async () => {
  try {
    await server.listen(3000)

    const address = server.server.address()
    const port = typeof address === 'string' ? address : address?.port
    console.log(`server is listening on http://localhost:${port}`)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}
start()