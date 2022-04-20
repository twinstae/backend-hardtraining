// #pseudoCode 의사코드!

//todoList 어떤 기능 구현?

// 데이터를 읽기, 질의 query (read)
// get

// 데이터를 변경 mutation, (create update delete)
  // todo를 추가할 수 있다

  //함수를 만드는 3가지 방법?
  //export 함수를 만드는 것과 관련 없음!
    //내보내는 것!

    let todoListEx = [
        { content: "일본 라면 먹기", completed: false, createdAt: 123 },
        { content: "프리스타일 랩하기", completed: false, createdAt: 123 }
      ];


const todoList = ["할일1","할일2","할일3"]
//addTodo 할일4 = todoList라는 배열에 할일4를 추가한다
const newTodo = "할일4"
todoList.push(newTodo)

//completeTodo = 할일의 상태를? 변경

//deleteTodo = 할일3을 삭제

    function addTodo (todoList, newTodo) {
        // todoList에 newTodo를 추가한다!
       return [...todoList, newTodo];
    }
  
  // todo를 완료할 수 있다
    function completeTodo (todoList, targetContent) {
      
    }

  // todo를 삭제할 수 있다
    function deleteTodo () { 
        
    }

  
