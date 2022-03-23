import { describe, it, expect } from "vitest";

function isEven(n){
  return n % 2 === 0;
}

describe("tagging", ()=> {
  [
    [0, true],
    [3, false],
    [4, true],
    [123456789, false],
    [-276, true],
    [-1, false],
  ].forEach(([input, expected]) => {
    it(`if input is ${input} then isEven return ${expected}`, ()=>{
      expect(isEven(input)).toBe(expected);
    })
  })
  // db에 뭐가 들어 있다, 파일에 뭐가 쓰여 있다, 돔에 뭐가 그려져 있다
  // 어떤 상태에서 시작하지? 선행조건 given, init, setup
  // 어떤 입력값이 들어오는 거지?, 부수효과를 일으키고, when, do,
  // assertion, then
  // 어떤 출력을 반환해야 하지?
  // 이게 끝나면 어떤 상태가 되야하지? 후행조건 

  // og 로 긁어온 결과... 입력으로 받아서

  // 노션에 넣을... 각 컬럼별 태깅을 어떻게 했는지? 그 결과를 반환
  // ???

  // 이렇게 태깅된 결과를 입력으로 받아서

  // 노션에 request로 보내는 양식으로 출력하기를 기대하는
})

