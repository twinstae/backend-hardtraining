// specification
import { describe, expect, it } from "vitest";
import server from "./server.fastify.ts";

// 무상태로 저 문서를 보면서 추론하기
// 정답지(테스트)보면서 expect, describe가 뭔지 찾아보기

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

describe("todolist server test", () => {
  it("get all todolist", async () => {
    const response = await server.inject({method : "GET", url : "/todo-list"
    });
  
  expect(response.statusCode).toBe(200);
  expect(JSON.parse(response.body)).toStrictEqual({"todoList" : [TODO_1]})
    });

}); 