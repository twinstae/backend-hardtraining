import { describe, it, expect } from "vitest";
// 모듈... import, export
import { addTodo, completeTodo, deleteTodo } from "./todolist.js";

  // 데이터를 읽기, 질의 query (read)
let todoList = [
  { content: "일본 라면 먹기", completed: false, createdAt: 123 },
];

describe("todolist", ()=>{
  // 입력, 선행조건
  // 출력, 후행조건

  // todo 목록 전체를 가져올 수 있다
    // pagination

  // 데이터를 변경 mutation, (create update delete)
  // todo를 추가할 수 있다
  it("addTodo에 todo를 넘기면 todoList에 todo가 추가된다", ()=>{
    const result = addTodo(todoList, { content: "프리스타일 랩하기", completed: false, createdAt: 124 });

    expect(result).toStrictEqual([
      { content: "일본 라면 먹기", completed: false, createdAt: 123 },
      { content: "프리스타일 랩하기", completed: false, createdAt: 124 },
    ]);
  });

  // todo를 완료할 수 있다
  it("completeTodo에 content를 넘기면, 해당 content를 가진 todo의 completed가 true로 바뀐다", ()=>{
    const result = completeTodo(todoList, "프리스타일 랩하기");

    expect(result).toStrictEqual([
      { content: "일본 라면 먹기", completed: false, createdAt: 123 },
      { content: "프리스타일 랩하기", completed: true, createdAt: 124 },
    ]);
  });
  
  // todo를 삭제할 수 있다
  it("completeTodo에 content를 넘기면, 해당 content를 가진 todo 객체가 사라진다.", ()=>{
    const result = deleteTodo(todoList, "프리스타일 랩하기");

    expect(result).toStrictEqual([
      { content: "일본 라면 먹기", completed: false, createdAt: 123 }
    ]);
  });
  
});