// todo Repository 기능 ?
// 믹 : 저장, 불러오기

// type Todo = {
//   content: string;
//   completed: boolean;
//   createdAt: number;
// };

interface TodoRepository {
  // 저장
  saveAll: (todoList: Todo[]) => Promise<void>;
  //
  // 믹 => 핑에게 설명한 의존성이 있는 함수와 부수효과가 있는 함수의 차이!
  // 핑 : 순수함수가 아니라는 건 알겠다! 의존성 <=> 부수효과를 모르겠음 ㅠ
  // 믹 :
  // 부수효과 => 값을 반환하지 않는다.
  // 상태를 일으킨다(?)
  //불러오기
  // 의존성이 있다 = 값을 반환한다
  getAll: () => Promise<Todo[]>;
}

// fsRepository(???)
// 믹 :  "저장을 해주어야 한다~" = 영속성 persistence 데이터는 영원히 존재하게 하기 위해서
// db를 쓰는 건가, 파일을 쓰는 건가..?, 프론트 : local storage
// db를 바꾸려면 ?
// 어떤 방식인 지 모르겠지만 명세를 정의한다!
// 의존성을 분리
