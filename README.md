# &#128153; Todo App &#128153;

React를 활용하여 할일 목록 앱을 만들었습니다.


#### [목차]
###### 1. [할일 목록 바로가기](#-할일-목록-바로가기)
###### 2. [프로젝트 소개](#-프로젝트-소개)
###### 3. [기술 스택 및 라이브러리](#-기술-스택-및-라이브러리)
###### 4. [개발 기간](#-개발-기간)
###### 5. [주요 기능](#-주요-기능)
###### 6. [느낀점](#-느낀점)

<br>


## &#128311; 할일 목록 바로가기

[<img src="./public/todo_app_logo.png" width="40" height="40">](https://soyeon1221.github.io/Todo-App) 아이콘 클릭!

<br>


## &#128311; 프로젝트 소개

Todo App을 통해 일정을 쉽게 관리하고 할일을 놓치지 않을 수 있습니다. 

간편한 수정 및 삭제 기능을 통해 할일 목록을 쉽게 관리할 수 있습니다.

<br>


## &#128311; 기술 스택 및 라이브러리

- <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
- <img src="https://img.shields.io/badge/JavaScript-ECD53F?style=flat-square&logo=JavaScript&logoColor=white"/>
- <img src="https://img.shields.io/badge/HTML5-F46D01?style=flat-square&logo=HTML5&logoColor=white"/>
- <img src="https://img.shields.io/badge/CSS3-2490D7?style=flat-square&logo=CSS3&logoColor=white"/>

<br>


## &#128311; 개발 기간

- 23.10.03 - 23.10.10 (총 8일)

<br>


## &#128311; 주요 기능

### 1. 메인
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/4ce0d7ee-801f-4a2f-b8c4-66fd1f528e9c" width="720px" height="480px">

- trim 메서드를 사용해서 input이 비어있을경우 추가버튼이 비활성화되도록 구현하였습니다.
- input을 저장하면 체크박스, 저장한이름, 수정버튼, 삭제버튼이 나타나도록 구현하였습니다.
- saveDoc 함수를 사용해서 로컬스토리지에 동기화하여 새로고침을 방지할 수 있도록 구현하였습니다.


### 2. 수정 / 삭제
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/ea8da505-368c-4ced-a448-b7594d338274" width="720px" height="480px">

- 할 일 항목을 수정하거나 삭제할 수 있습니다.
- useRef Hook과 useEffect를 사용해서 수정 버튼을 눌렀을 때 input에 커서가 맞춰지도록 설정했습니다. 
- trim 메서드를 사용해서 input에 내용을 입력했을때만 저장버튼이 활성화되도록 구현하였습니다.

### 3. 전체 / 완료 / 진행중
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/e593cc74-a821-4056-9677-af6a70d7e64e" width="840px" height="500px">

- 완료된 할 일은 체크 버튼을 통해 쉽게 확인할 수 있습니다.
- filter 메서드를 사용해서 ‘전체’, ‘진행중’, ‘완료’ 3가지 객체를 생성해서 버튼을 눌렀을 때 해당 데이터만 나타나도록 구현하였습니다.
- 논리연산자를 사용해서 클릭한 해당버튼색만 어둡게 적용하였습니다.

<br>


## &#128311; 느낀점
### [배운점]
#### CSS
1. :root
- :root : 웹 문서 구조에서 가장 상위 요소를 선택할 때 사용한다.
- :root 가상 클래스를 활용하여 변수를 생성해서 코드의 유지·보수나 추가적인 확장을 쉽게 할 수 있다.
- 변수의 이름 앞에는 --(하이픈 2개)를 붙여준다.
```
:root {
  --width: 200px;
  --secondary: #364864;
}
```
- var() 함수를 통해 괄호 안에 적용할 변수를 입력한다.
```
input {
  width: var(--width);
  background-color: var(--secondary);
}
```
2. :disabled
- disabled 속성은 해당 엘리먼트가 비활성화됨을 명시한다.
- disabled 속성이 명시된 엘리먼트는 선택, 클릭, 입력 등 포커스를 받을 수 없다.
- disabled 속성은 boolean 속성이다.<br>
  불리언 속성은 해당 속성을 명시하지 않으면 속성값이 자동으로 false 값을 가지게 되며, 명시하면 자동으로 true 값을 가지게 된다.
```
button:disabled {
  opacity: 0.25;
  cursor: auto;
}
```
3. flex
- flex 속성은 하나의 플렉스 아이템이 자신의 컨테이너가 차지하는 공간에 맞추기 위해 크기를 키우거나 줄이는 방법을 설정하는 속성이다.
- flex는 flex-grow, flex-shrink, flex-basis의 단축속성이다.
- grow는 기본값이 0, shrink는 기본값이 1, basis는 기본값이 auto이다.
- basis를 auto로 하고 grow를 1로 적용하면 item의 너비가 똑같아진다
```
.filter-btn {
  flex: 1 1 0;
  border: 2px solid var(--secondary);
  color: var(--secondary);
}
```