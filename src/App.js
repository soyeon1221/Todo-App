// import : 필요한 파일을 가져온다 
import "./App.css";
import { useState, useEffect, useRef } from "react" // react에서 필요한 hook

// 필터조건
const FILTER_MAP = {
  // FILTER_MAP 객체 = 3개의 메서드를 가지고 있다
  전체: () => true, 
  완료: (task) => task.completed,
  진행중: (task) => !task.completed

  // All : true -> 전체 리턴
  // Done : task.completed -> completed가 true인 task만 리턴
  // Active : !task.completed -> 완료되지 않은 task만 리턴
}

// Object.keys(객체) : 객체의 속성 이름을 문자열 배열로 리턴한다
// const FILTER_NAMES = Object.keys(FILTER_MAP); // Object라는 클래스의 key라는 스태틱함수 (클래스는 대문자)
const FILTER_NAMES = [ "전체", "완료", "진행중" ]; // Object라는 클래스의 key라는 스태틱함수 (클래스는 대문자)

// console.log(FILTER_NAMES); // FILTER_MAP의 객체의 속성이 문자열로 배열되는지 확인

// saveDoc : 로컬 스토리지를 동기화하는 함수
function saveDoc(tasks) {
  localStorage.setItem("tasks", tasks);
}

// initialTasks(이니셜테스크스)
// tasks 변수의 초기값 (App컴포넌트 안에있는 State)
// 로컬스토리지에서 tasks를 가져오는데 tasks가 없으면 [] 빈배열을 리턴한다
const initialTasks = localStorage.getItem("tasks") || "[]"; // || : 논리연산자

// App : 메인 컴포넌트
// (1)~(6) 까지 함수
export default function App() {
  // 2개의 state를 선언 - tasks, filter
  
  // tasks는 현재 초기값이 initialTasks
  // JSON.parse : JSON 포맷을 js 객체로 변환하는 함수
  const [tasks, setTasks] = useState(JSON.parse(initialTasks));

  // filter는 초기값이 All
  const [filter, setFilter] = useState("전체");

  console.log(tasks); // tasks 결과 확인 (처음에는 할일목록이 없어서 빈배열임)

  // (1) 할일을 추가하는 함수
  function addTask(name) {
    const newTask = {
      id: `todo-${Date.now()}`, // Date.now : 현재 시간을 밀리세컨즈 타입으로 리턴하는 메서드
      name, // 유저가 입력한 name
      completed: false // 새로 추가된 할일은 완료되지 않은 상태이므로 false
    }

    // 새로운 할일을(newTask) 기존의 tasks에 추가
    const updatedTasks = [...tasks, newTask]; // JS에서 array push 메서드

    setTasks(updatedTasks);

    // saveDoc : 로컬스토리지 동기화하는 함수
    // 변수에만 저장했기 때문에 새로고침하면 없어지는데 이럴때 localstorage
    saveDoc(JSON.stringify(updatedTasks));
    // saveDoc 사용할때 주의할점 : 인자를 전달하기 전에 JSON 포맷으로 변환한 다음에 사용해야함
    // JSON.stringify() : JSON 포맷으로 변환하는 메서드
    // updatedTasks : 자바스크립트 객체이기 때문에 JSON 포맷으로 변환 후 사용
  }

  // (2) 할일을 삭제하는 함수
  function deleteTask(id) {
    console.log(id);

    // 전달받은 id와 일치하지 않는 id를 가진 task만 리턴한다 (일치하는 id는 삭제)
    const remainingTasks = tasks.filter(task => task.id !== id);
    // filter 메서드 : 반복문 (tasks에서 전달받은 id를 하나하나 비교한다)
    // filter 메서드의 콜백에는 조건이 들어간다
    // 리액트에서는 for 반복문 보다는 새로운 메서드를 사용해서 처리한다

    console.log(remainingTasks);

    setTasks(remainingTasks); // remainingTasks를 업데이트하면 삭제됨

    // 로컬스토리지 동기화
    saveDoc(JSON.stringify(remainingTasks));
  }

  // (3) 할일의 완료상태를 다루는 함수
  function toggleTaskCompleted(id) {
    console.log(id)

    const updatedTasks = tasks.map(task => { // 엘리먼트를 리턴하는게 아니니까 중괄호{}사용
      if (task.id === id) { // 일치하는 id를 가진 task
        return { ...task, completed: !task.completed }
        // ...task : task의 다른속성은 그대로 두고, 
        // completed만 현재 상태 반대로 (체크하면 false에서 true로 변경됨)
      }
      return task;
    })

    setTasks(updatedTasks); // updatedTasks를 업데이트하면 false에서 true로 변경됨

    // 로컬스토리지 동기화
    saveDoc(JSON.stringify(updatedTasks));
  }

  // (4) 할일을 수정하는 함수
  function editTask(id, newName) {
    // tasks에서 전달받은 id와 일치하는 tasks의 name을 newName으로 바꾼다
    const editedTasks = tasks.map(task => { // map메서드 : 반복문
      if(task.id === id) { // 전달받은 id와 일치하는 id를 가진
        return { ...task, name: newName} // task의 name을 newName로 변경한다
      }
      return task; // 다른 id는 그대로 리턴한다
    })

    setTasks(editedTasks); // tasks 업데이트

    // 로컬스토리지 동기화
    saveDoc(JSON.stringify(editedTasks));
  }

  // (5) 필터 버튼 (FilterButton)
  const filterButtons = FILTER_NAMES.map(name => ( 
    // FILTER_NAMES를 사용해서 FilterButton을 list로 출력 (엘리먼트는 소괄호())
    <FilterButton // 컴포넌트
      key={name}
      name={name}
      isPressed={filter === name}
      setFilter={setFilter}
    />
  ))

  // (6) 할일 목록 (Todo)
  // FILTER_MAP[filter] : 필터링 조건 (filter 변수에 따라서 다른 조건을 return / 현재는 filter)
  const taskList = tasks.filter(FILTER_MAP[filter]).map(task => (
    <Todo // 컴포넌트
      key={task.id} // 리스트타입에서 key는 항상 필요하다
      id={task.id}
      name={task.name}
      completed={task.completed}
      deleteTask={deleteTask}
      toggleTaskCompleted={toggleTaskCompleted}
      editTask={editTask}
    />
  ))

  // 할일 완료된 항목 갯수
  const completedTaskCount = tasks.filter((task) => task.completed).length;
  // 남은 할일 항목 갯수
  const remainingTaskCount = tasks.length - completedTaskCount;

  return (
    <div className="app-container">
      {/* 제목 */}
      <h1 className="app-title">&#128153; 할일 목록 &#128153;</h1>

      {/* 폼 */}
      <Form addTask={addTask}/>

      {/* 필터 버튼 */}
      <div className="filter-btn-group">
        {filterButtons}
      </div>

      {/* 할일 목록 */}
      <h2 className="remaining">
        {filter === "완료" ? `${completedTaskCount} 개 완료되었습니다` : `${remainingTaskCount} 개 남았습니다`}
      </h2>
      <ul>
        {taskList}
      </ul>
    </div>
  )
}

// 1) 폼 컴포넌트
function Form({ addTask }) { // addTask : App에서 전달하는 데이터
  // name 변수 선언 : 폼 컴포넌트 내에서만 접근할수있는 지역변수
  const [name, setName] = useState(""); // 지역 변수

  // form을 제출 했을때 이벤트핸들러
  function handleSubmit(e) {
    e.preventDefault();

    addTask(name); // addTask : App에 있음 , name : 입력하는 값
    setName(""); // 폼 제출시 input을 비운다 (빈문자열)
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input 
        type="text"
        className="add-input"
        value={name} // input의 value를 name으로 지정하고 폼을 제출했을때 빈문자열로 만든다 (setName(""))
        onChange={(e) => setName(e.target.value)} // input의 value가 바뀔때 실행된다
        autoComplete="off"
      />
      <button
        type="submit"
        className="add-btn"
        disabled={!name.trim()} // name 입력했을때만 button 활성화 (한글자라도)
        // trim 메서드 : 불필요한 공백을 제거한다
      > 
        추가
      </button>
    </form>
  )
}


// 2) 필터 버튼
function FilterButton({ name, isPressed, setFilter }) {
  // App 함수 안에 필터버튼 컴포넌트의 프롭스 : name, isPressed, setFilter
  // isPressed : 버튼이 눌렸는지 여부를 나타내는 변수
  return (
    <>
      <button // 리액트에서 ` 빽킹 사용하려면 {} 중괄호 필수
        className={`filter-btn ${isPressed && "active"}`} // 선택한 button 색상이 black이 됨
        onClick={() => setFilter(name)}
      > 
        {name}
      </button>
    </>
  )
  // 3개의 버튼의 text가 {name} : 각각의 버튼이 FilterButton 컴포넌트
  // 3개의 버튼을 담은게 FILTER_NAMERS
}

/*
  1. All, Done, Active 버튼을 눌렀을때 해당 내용 표시하는 방법

  button안에 onClick={() => setFilter(name)} 추가

  맨 위에 FILTER_MAP 함수들이 의미하는것은 필터 조건
  All : true -> 전체 리턴
  Done : task.completed -> completed가 true인 task만 리턴
  Active : !task.completed -> 완료되지 않은 task만 리턴

  <메인컴포넌트>에서 할일목록으로 이동
  tasks에서 map 사용하기전에 filter메서드가 추가됨
  -> tasks.filter().map

  flter메서드의 콜백은 조건
  -> 조건은 FILTER_MAP 객체가 가지고 있음
  -> tasks.filter(FILTER_MAP[filter]).map

  FILTER_MAP[filter] : 필터링 조건
  -> 필터 변수에 따라서 다른 조건을 return (현재는 filter)


  2. 현재 선택된 버튼의 컬러 변경하는 방법

  -2) 필터버튼 으로 이동
  -isPressed는 filter와 name을 비교한 결과 (메인컴포넌트 (5)에서 확인가능)
  Active 버튼을 누르면 Active의 isPressed는 true이고 나머지의 isPressed는 false이다
  -button안에 className={`filter-btn ${isPressed && "active"}`} 추가
  (` 빽킹 사용하려면 {} 중괄호 필수)
  기존의 filter-btn class는 그대로 두고 ${isPressed && "active"} 추가
*/


// 3) Todo 컴포넌트
function Todo( { id, name, completed, deleteTask, toggleTaskCompleted, editTask }) {
  // 2개의 변수 선언 - isEditing, newName

  // 템플릿 상태를 결정하는 변수
  const [isEditing, setIsEditing] = useState(false); // true가 되면 편집이 가능한 form이 생성됨
  // 새로운 할일 이름
  const [newName, setNewName] = useState("");

  // useRef Hook : 엘리먼트에 접근할 수 있다 (초기값은 null)
  const inputEl = useRef(null); // 수정버튼을 눌렀을때 마우스커서가 자동으로 input에 맞춰진다

  // useEffect Hook : 리액트안에서 어떤 효과가 필요할때 사용한다
  // 비동기적으로 작동한다
  useEffect(() => {
    // useEffect가 isEditing(수정중)일때만 사용하겠다는 뜻
    if (isEditing) {
      // useRef는 current 속성에 엘리먼트를 담는다
      // 가상의 엘리먼트가 실제 HTML에 주입되고 난 뒤에 input에 접근할 수 있다
      inputEl.current.focus(); // focus는 input 엘리먼트의 원래 메서드
    }
  })

  // 업데이트 폼 제출
  function handleSubmit(e) {
    e.preventDefault();

    editTask(id, newName); // editTask는 메인컴포넌트 할일을 수정하는 함수

    // 수정 후 다시 뷰템플릿으로 이동한다
    setIsEditing(false); // IsEditing을 false로 안바꾸면 저장하고 취소눌러야 뷰템플릿으로 이동한다

    // NewName도 폼 제출했을때 빈문자열
    setNewName("");
  }

  const viewTemplate = (
    // 랜더링할 tree를 viewTemplate에 담고있다
    <div className="view-template">
      {/* 할일 이름 */}
      <div className="todo-details">
        <input
          type="checkbox"
          id={id}
          className="todo-checkbox"
          checked={completed}
          onChange={() => toggleTaskCompleted(id)} // input은 안보이는 상태이지만 label과 연결되어있음
        />
        <label htmlFor={id} className="todo-name"> {/* 리액트에서는 htmlFor을 사용해야한다 */}
          {name} {/* label을 클릭하면 toggleTaskCompleted함수 실행 */}
        </label>
      </div>
      {/* 버튼 그룹 */}
      <div className="view-btn-group">
        <button 
          className="edit-btn"
          onClick={() => setIsEditing(true)} // 수정 버튼을 눌렀을때 true가 되면 form이 나옴
        >
          수정
        </button>
        <button 
          className="delete-btn"
          onClick={() => deleteTask(id)} // deleteTask : App에 있음
        >
          삭제
        </button>
      </div>
    </div>
  );

  const editingTemplate = (
    <form onSubmit={handleSubmit} className="edit-template">
      <input
        type="text"
        className="edit-input"
        onChange={(e) => setNewName(e.target.value)} // input의 value가 바뀜 , js에서는 keyup사용(유효성검사)
        ref={inputEl}
      />
      {/* 버튼 그룹 */}
      <div className="edit-btn-group">
        <button
          type="button"
          className="edit-button"
          onClick={() => setIsEditing(false)}
        >
          취소
        </button>
        <button
          type="submit"
          className="save-btn"
          disabled={!newName.trim()} // newName이 빈문자열이면 저장버튼이 안눌림
        >
          저장
        </button>
      </div>
    </form>
  )

  return (
    // 수정버튼을 누르면 editingTemplate로 바뀐다 (isEditing이 true가 되니까)
    <li className="todo-item">
      {isEditing ? editingTemplate : viewTemplate}
    </li>
  )
}

/*
  1. 수정버튼을 눌렀을때 input에 커서가 맞춰지게 하는 경우

  -useRef Hook을 사용한다
    변수선언 : const inputEl = useRef(null);
  -editingTemplate 함수 input 안에 ref={inputEl} 추가한다
  -useEffect를 사용한다
  	변수선언 밑에 작성
	  useEffect(() => {
	    if (isEditing) {
	      inputEl.current.focus(); 
	    }
	  })
  -

  2. Todo 컴포넌트에서 useEffect를 사용하는이유

  useEffect는 return이 끝나고 나서 호출된다 (비동기적으로 작동한다)
  return을 해서 실제 엘리먼트에 주입한 다음에 input에 접근할수있다
  그래서 비동기적으로 작동해야 한다
  editingTemplated는 가상의 엘리먼트이기 때문에
  실제로 엘리먼트가 주입되고 나서 작동해야 하므로 useEffect를 사용한다


  3. useRef(null)을 사용한 이유

  useRef가 실제 input 엘리먼트를 리턴하기 전까지 초기값으로 null을 사용한다 (2번하고 같은이유)


  4. 수정할때 input에 내용을 적지 않았을때 저장버튼이 활성화되지 않게 하는 방법

  -editingTemplate에서 저장버튼안에 disabled={!newName.trim()} 추가
  (button에서 disabled는 button을 사용할 수 없는것)
  -handleSubmit에 setNewName("") 추가
  (처음에는 disabled가 작동되지만 수정한이후부터 disabled가 flase상태가된다 
  그래서 NewName도 제출했을때 빈문자열인 처음상태로 한다)
*/