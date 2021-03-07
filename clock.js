//querySelector = html의 클래스 이름 및 태그를 갖고 옴 --> js-clock class의 자손 element h1을 가져옴
const clockContainer = document.querySelector(".js-clock"),
    clockTitle = clockContainer.querySelector("h1");

function getTime(){
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText= `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0seconds` : seconds}`;
}

function init() {
  getTime();
  setInterval(getTime,1000);
}

init();
