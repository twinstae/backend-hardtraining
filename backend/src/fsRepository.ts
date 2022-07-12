import * as fs from 'fs/promises';

const FILE_NAME = "todoList.json";

const fsRepository: ITodoRepository = {
  async saveAll(todoList){ // todoList 배열, 객체
    // todoList 를 json 파일로 저장한다
    // json 문자열로 변환한다.
    const data = JSON.stringify(todoList);

    // json 문자열을 파일에 쓴다
    await fs.writeFile('./' + FILE_NAME, data, { encoding: 'utf-8' });  
  },
  async getAll(){
    // json 파일을 읽어서 todoList 전체를 반환한다.
    const json = await fs.readFile('./' + FILE_NAME, { encoding: 'utf-8' });  // json 문자열
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
