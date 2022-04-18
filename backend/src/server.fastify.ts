import Fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { addTodo, deleteTodo, completeTodo } from "./todoList";
// require commonjs
// import  esm

// 왜 변수로 담아주는가? - 확인해보아야!
// require <-> import
// CJS <-> ESM 의 차이!

const server: FastifyInstance = Fastify({ logger: true });

const opts: RouteShorthandOptions = {
  schema: {
    response: {
      200: {
        type: "object",
        properties: {
          todoList: {
            type: "array",
            items: {
              type: "object",
              properties: {
                content: { type: "string" },
                completed: { type: "boolean" },
                createdAt: { type: "number" },
              },
            },
          },
        },
      },
    },
  },
};

// 라우터 구현하기!

let todoList = [
  { content: "일본 라면 먹기", completed: false, createdAt: 123 },
];

// query, Read 읽기 요청!
// get /todo-list 라는 요청이 들어오면
// todoList 를 반환하는 route 를 만들어보세요!

// Declare a route
// 질문 생긴걸 언제 답변을 받을지? 얼마나 (시간을) 할애해서 어떤 방식으로 할 지?
// server를 뭐라고 부르는지? 예시 : get은 http 메서드에요~
// 왜 굳이 async 붙여주어야 하나요?
server.get("/todo-list", opts, async (request, reply) => {
  reply.status(200);
  return { todoList };
});

// 흐름을 통제하기 위해서 사용한다~
// ?name="taehee"&age=28 <- search params, query params
// body json
server.post<{ Body: Todo }>("/todo-list", async (request, reply) => {
  const newTodo = request.body;
  todoList = addTodo(todoList, newTodo);
  reply.status(201);
  return { ok: true };
});

const variable = "mimik";
const string = `name is ${variable}`
console.log(string) // mimik
// deleteTodo delete

server.delete<{ Params: { targetContent: string } }>(
  "/todo-list/:targetContent",
  async (request, reply) => {
    const { targetContent } = request.params;
    todoList = deleteTodo(todoList, targetContent);
    reply.status(204);
    return { ok: true };
  }
);

// completeTodo patch
server.patch<{Params : {targetContent : string}}>(
  "/todo-list/:targetContent",
 async (request, reply) => {
   const {targetContent} = request.params;
   todoList = completeTodo(todoList, targetContent);
   reply.status(200)
   return {ok:true}
 }
)

export default server;
