import { describe, it, expect } from "vitest";
import server from './server.fastify.ts';

const TODO_1 = { content: "일본 라면 먹기", completed: false, createdAt: 123 };
const TODO_2 = { content: "프리스타일 랩하기", completed: false, createdAt: 124 };
// function extract 함수 추출
// refactor concept 리며들자~
// 이거 왜빼신거임? 함수추출 왜하셨나요?????궁금 유틸화도 안되는 것 같은데 너무 궁금합니다 ~~
async function get(){
  const response = await server.inject({
    method: 'GET',
    url: '/todo-list'
  });

  expect(response.statusCode).toBe(200);
  return JSON.parse(response.body);
}

describe("todolist api", ()=>{
  it('get all todo list', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/todo-list'
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({ "todoList": [TODO_1] });
  });

  // post

  it('create new todo', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/todo-list',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TODO_2),
    });
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    
    expect(response.statusCode).toBe(201);
    expect(await get()).toStrictEqual({ "todoList": [TODO_1, TODO_2] });
  });

  // patch
  it('complete todo by target content', async () => {
    const response = await server.inject({
      method: 'PATCH',
      url: `/todo-list/${TODO_2.content}`,
    });

    expect(response.statusCode).toBe(200);
    expect(await get()).toStrictEqual({ "todoList": [
      TODO_1, { content: "프리스타일 랩하기", completed: true, createdAt: 124 }
    ] });
  });
  
  // delete
  it('delete todo by target content', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: `/todo-list/${TODO_2.content}`,
    });

    expect(response.statusCode).toBe(204);
    expect(await get()).toStrictEqual({ "todoList": [TODO_1] });
  });
});
