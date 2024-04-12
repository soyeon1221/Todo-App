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

- 할 일 목록을 전체, 완료, 진행 중으로 분류하여 효과적으로 관리할 수 있습니다.
- 완료된 할 일은 체크 버튼을 통해 쉽게 확인할 수 있습니다.
- 할 일 항목을 수정하거나 삭제할 수 있습니다.

### 1. 메인
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/4ce0d7ee-801f-4a2f-b8c4-66fd1f528e9c" width="560px" height="500px">

- 


### 2. 수정 / 삭제
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/ea8da505-368c-4ced-a448-b7594d338274" width="560px" height="500px">

- useRef Hook과 useEffect를 사용해서 수정 버튼을 눌렀을 때 input에 커서가 맞춰지도록 설정했습니다. 
- trim 메서드 : 불필요한 공백을 제거한다 / name 입력했을때만 button 활성화 (한글자라도)

### 3. 전체 / 완료 / 진행중
<img src="https://github.com/soyeon1221/Todo-App/assets/121142418/e593cc74-a821-4056-9677-af6a70d7e64e" width="840px" height="500px">

- saveDoc 함수를 사용하여 로컬스토리지에 동기화하여 새로고침을 방지할 수 있었고,
- ‘전체’, ‘진행중’, ‘완료’ 3가지 객체를 생성해서 버튼을 눌렀을 때 해당 데이터만 나타나게 하기 위해서 filter 메서드를 사용했습니다.

<br>


### [배운점]
#### 1. CSS
- root엘리먼트 변수선언 / 위에서 설정한 변수를 선언할때 var() 사용한다
- add버튼이 disabled 상태 : 클릭할수 없는상태
- flex: flex-shrink flex-grow flex-basis
  shrink는 기본값이 1, grow는 기본값이 0, basis는 기본값이 auto
  container안에서 item의 너비를 똑같이 하고싶을때 사용함
  basis를 auto로 하고 grow를 1로 적용하면 item의 너비가 똑같아진다
