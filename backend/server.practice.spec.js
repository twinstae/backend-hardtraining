// specification
import { describe, expect, it } from "vitest";
import server from "./server.fastify.ts";
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
    url: "/todo-list"
  });

  expect(response.statusCode).toBe(200)
  return JSON.parse(response.body);

}





describe("todolist api", () => {
  it("get all todolist", async () => {
    const response = await server.inject({ 
      method: "GET",
       url: "/todo-list"
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
      method: 'POST',
      url: "/todo-list",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(TODO_2),

    })
    //const response = await server.inject({ method: "GET", url: "/todo-list" });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toStrictEqual({ ok:true});
    expect(await get()).toStrictEqual({"todoList" : [TODO_1, TODO_2] })
  
  });

});