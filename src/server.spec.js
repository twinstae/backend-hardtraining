import { describe, it, expect } from "vitest";
import server from './server.fastify.ts';

describe("todolist api", ()=>{
  it('get all todo list', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/todo-list'
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toStrictEqual({
        "todoList": [
            {
                "content": "일본 라면 먹기",
                "completed": false,
                "createdAt": 123
            }
        ]
    });
  });
})