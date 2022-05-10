import * as fs from 'fs/promises';

const FILE_NAME = "todoList.json";

// 콜백 지옥이란?
// 믹 : 비동기 promise는 객체에서 값을 주었을 때 resolve 되었을때만 await 으로 실행된다!
// 믹 : 콜백은 함수로 존재! 써놓고 싶은데 통제할 수 있는 방법이 없음
// 핑 : 실행 흐름을 통제하기 위해서 promise 사용!
// 비동기란 ?
// 믹 : 레스토랑이 있다. 짜장면, 마파두부 주문 동시에 함.
// 동기 : 하나의 일이 끝나기 전까지 다른 일을 실행하지 않는다.

// 짜장면 다 만들고 마파두부를 만들면 답이 없다.
// 1번은 면삶기, 2번은 두부썰기, 3번 요리사는
// 일을 효율적으로 처리하게 하기 위해서!
// 다 기다렸다가 일을 하는 게 비효율적!
// 순차적으로 되야 할때도 있겠지만 다른 상황에서는 다르게 하는게(병렬처리를 하는게)효율적이지 않을까?
// 순차적(절차적)
// 요리사가 한명이다. => 메모리 부족!
// 쪼갤 수 없는 단위 안에서
// 기능이 단순하다!
// 마파두부 만든다.
// 운영체제 병렬처리

// 함수형..?이 나온 맥락!!
// 자바는 stream이라는 친구가 있어욘
// promise는 함수형에서 차용한 개념이다!
// haskell ??? 에서 가져온 듯??

const fsRepository: TodoRepository = {
  async saveAll(todoList){ // todoList 배열, 객체
    // todoList 를 json 파일로 저장한다
    // json 문자열로 변환한다.
    const data = JSON.stringify(todoList);

    // json 문자열을 파일에 쓴다
    await fs.writeFile('./' + FILE_NAME, data, { encoding: 'utf-8'});  
  },
  async getAll(){
    // json 파일을 읽어서 todoList 전체를 반환한다.
    const json = await fs.readFile('./' + FILE_NAME, { encoding: 'utf-8'});  // json 문자열
    // todoList 배열, 객체로 변환
    return JSON.parse(json) as Todo[];
    // const todoListPromise = fs.readFile('./' + FILE_NAME, { encoding: 'utf-8'});  // json 문자열
    // return todoListPromise.then(json => JSON.parse(json) as Todo[]);
  }
};

// fsRepository.saveAll([{ "content": "미믹의 레포지토리!", "completed": false, "createdAt": 123 }])
//   .then(() => {
//     return fsRepository.getAll();
//   })
//   .then((data) => console.log(data));

// 정리!
// 세가지 종류 서버 todolist 를 만들기(express, fastify, )
// todolist의 기능을 구현,  
// 테스트를 만들기
// fs 파일시스템 연결하고 >> db로 갈아끼우는 걸 
// nest(todo)



export default fsRepository;
