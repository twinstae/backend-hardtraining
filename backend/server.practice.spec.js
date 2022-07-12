// specification
import { describe, expect, it } from "vitest";
import server from "./src/server.fastify.ts";
//import { deleteTodo } from "./src/todoList";
// 무상태로 저 문서를 보면서 추론하기
// 정답지(테스트)보면서 expect, describe가 뭔지 찾아보기
// 오늘 검색할 거 : 홍유만두? 고추기름 love...
//get method
//테스트를 뭘 하고 싶은지??
//get 메서드를 실행시키면, statusCode가 200이 되길 기대한다.
//api 서버를 테스트하려는 것

const TODO_1 = { content: "일본 라면 먹기", completed: false, createdAt: 123 };
const TODO_2 = {
  content: "프리스타일 랩하기",
  completed: false,
  createdAt: 124,
};

async function get() {
  const response = await server.inject({
    method: "GET",
    url: "/todo-list",
  });

  expect(response.statusCode).toBe(200);
  return JSON.parse(response.body);
}

describe.skip("todolist api", () => {
  it("get all todolist", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/todo-list",
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({ todoList: [TODO_1] });
  });

  // post
  // 테스트로 뭘 하고 싶은가??
  // post는 get에 의존한다!
  // 제대로 newTodo를 만들면 inject로 가상의 요청을 날려서 ~ newTodo가 todoList에 제대로 추가가 되었는지 확인해보고싶다~

  it("create newTodo", async () => {
    const response = await server.inject({
      method: "POST",
      url: "/todo-list",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TODO_2),
    });
    //const response = await server.inject({ method: "GET", url: "/todo-list" });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toStrictEqual({ ok: true });
    expect(await get()).toStrictEqual({ todoList: [TODO_1, TODO_2] });
  });

  //patch
  // 테스트하고싶은 것
  // #psudo
  // 일단 http 메서드는 patch

  //기대한다 statuscode가 200이되고, completed가 false=> true인걸기대한다
  it("complete Todo", async () => {
    const response = await server.inject({
      method: "PATCH",
      url: `/todo-list/${TODO_2.content}`,
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({ ok: true });

    expect(await get()).toStrictEqual({
      todoList: [
        TODO_1,
        { content: "프리스타일 랩하기", completed: true, createdAt: 124 },
      ],
    });
  });

  //delete
  //target content를 inject로 보냈을 때 해당 콘텐츠가 삭제되는지 확인
  //기대하는 거 1. 상태코드 204(없음) 반환
  //2.클라 응답의 body를 다시 객체로 바꿨을때 ok true 객체가 확인되는지?
  //3.get을 await으로 호출해서 그 안의 객체가 todo1만 남아있는지

  it("delete todo by target content", async () => {
    const response = await server.inject({
      method: "DELETE",
      url: `/todo-list/${TODO_2.content}`,
    });

    expect(response.statusCode).toBe(204);
    expect(JSON.parse(response.body)).toStrictEqual({ ok: true });
    expect(await get()).toStrictEqual({ todoList: [TODO_1] });
  });
});
