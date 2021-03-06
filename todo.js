const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

  const TODOS_LS = "toDos";

  let toDos = [];

  function deleteTodo(event){
    const btn = event.target; //이벤트가 발생된 요소
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){ // 지정된 조건에 맞는 요소를 새롭게 반환
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  }

  function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteTodo);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li); // ul 밑에 li를 생성 , li밑에 btn, span을 생성
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
  }

  function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value; // 입력값 저장
    paintToDo(currentValue);
    toDoInput.value = "";
  }

  function loadToDos(){
      const loadedToDos = localStorage.getItem(TODOS_LS);
      if (loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){
          paintToDo(toDo.text);
        });
      }
  }

  function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit); // 이벤트 발생 시 함수호출
  }
  init();
