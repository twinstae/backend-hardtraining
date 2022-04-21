import { describe, it, expect } from "vitest";
// 모듈... import, export
import { addTodo, completeTodo, deleteTodo } from "./todoList.ts";

const TODO_1 = { content: "일본 라면 먹기", completed: false, createdAt: 123 };
const TODO_2 = { content: "프리스타일 랩하기", completed: false, createdAt: 124 };
// 데이터를 읽기, 질의 query (read)

describe("todolist", ()=>{
  // 입력, 선행조건
  // 출력, 후행조건

  // todo 목록 전체를 가져올 수 있다
    // pagination

  // 데이터를 변경 mutation, (create update delete)
  
  // todo를 추가할 수 있다
  it("addTodo에 todo를 넘기면 todoList에 todo가 추가된다", ()=>{
    const result = addTodo([TODO_1], TODO_2);

    expect(result).toStrictEqual([TODO_1, TODO_2]);
  });

  // todo를 완료할 수 있다
  it("completeTodo에 content를 넘기면, 해당 content를 가진 todo의 completed가 true로 바뀐다", ()=>{
    const result = completeTodo([TODO_1, TODO_2], TODO_2.content);

    expect(result).toStrictEqual([
      TODO_1,
      { content: "프리스타일 랩하기", completed: true, createdAt: 124 },
    ]);
  });
  
  // todo를 삭제할 수 있다
  it("completeTodo에 content를 넘기면, 해당 content를 가진 todo 객체가 사라진다.", ()=>{
    // 입력, before, given
    const result = deleteTodo([TODO_1, TODO_2], TODO_2.content);

    // 결과, 출력, after, then
    expect(result).toStrictEqual([TODO_1]);
  });
});