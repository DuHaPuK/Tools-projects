/* 
Задача какая, какие функции должны быть в погоде?
1. Запрос данных с другого сервера и показ на странице по указанному городу. 
  Асинхронный запрос

2. Функциональный слайдер, возможнолсть переключаться между города. {
  2.1 Слайдер, основная по середине, остальные на половину скрыты и размыты. 
  2.2 При нажатие на кнопку, переключать на другой слайд, то есть на другой контейнер с погодой. {
    Идея такая может быть, при переключении можно менять картинку, или же воспользоваться перемещением слайда.   
    Можно воспользоваться со смещением картинки тиоп плюс сколько то пикселей и так будет смещаться. Решим. Сегодня ДР, так что потом все ! 
  }
  2.3 При достижение конца слайда, переходить на начало и так до бесконечности.
  2.4     
}

++ 3. Время 

*/

const TIME_BLOCK = document.querySelector(".weather-logo-block__time");
const DATE_BLOCK = document.querySelector(".slider-card__data-text");
const INPUT_SEARCH = document.querySelector(".input-search");
const API_KEY = "a53c098ae82543b4a48124519252402";

let cityWeather = "";
let temp_cCity = "";

let nowDate = new Date();

/* Вывод времени на странице*/

function renderTime() {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes <= 9) {
    TIME_BLOCK.innerHTML = `${hours}:0${minutes}`;
  } else {
    TIME_BLOCK.innerHTML = `${hours}:${minutes}`;
  }
}

renderTime();
renderCardWeather();

/* Отрисовка карточки с погодой на странице */

function renderCardWeather() {
  const sliderContainer = document.querySelector(".slider-container");

  const sliderCard = document.createElement("div");
  sliderCard.classList.add("slider-card");

  const sliderLocationBLock = document.createElement("div");
  sliderLocationBLock.classList.add("slider-card__location-block");

  const sliderLocationText = document.createElement("p");
  sliderLocationText.classList.add("slider-card__location-text");
  sliderLocationText.textContent = "";

  const sliderLocationImg = document.createElement("img");
  sliderLocationImg.classList.add("slider-card__location-img");
  sliderLocationImg.src = "public/svg/weather/location_.svg";
  sliderLocationImg.alt = "location";

  const sliderTempBlock = document.createElement("div");
  sliderTempBlock.classList.add("slider-card__temp-block");

  const sliderTempImg = document.createElement("img");
  sliderTempImg.classList.add("slider-card__temp-img");
  sliderTempImg.src = "public/svg/weather/temperature_.svg";
  sliderTempImg.alt = "temperature";

  const sliderTempMeaning = document.createElement("p");
  sliderTempMeaning.classList.add("slider-card__temp-meaning");
  sliderTempMeaning.textContent = "<Enter city name>";

  const sliderDataBlock = document.createElement("div");
  sliderDataBlock.classList.add("slider-card__data-block");

  const sliderDataText = document.createElement("p");
  sliderDataText.classList.add("slider-card__data-text");
  let month = getMonth(nowDate);
  let weekDay = getWeekDay(nowDate);
  let dayDate = nowDate.getDate();
  sliderDataText.textContent = `${month} ${dayDate}, ${weekDay}`;

  // const sliderAdditionalBLock = document.createElement("div");
  // sliderAdditionalBLock.classList.add("slider-card__additional-block");

  // const sliderAdditionalList = document.createElement("ul");
  // sliderAdditionalList.classList.add("slider-card__additional__list");

  // const sliderAdditionalItem = document.createElement("li");
  // sliderAdditionalItem.classList.add("slider-card__additional__item");
  // sliderAdditionalItem.textContent = "Humidity";
  // const sliderAdditionalItemSpan = document.createElement("span");
  // sliderAdditionalItemSpan.textContent = "99%";

  sliderContainer.appendChild(sliderCard);
  sliderCard.appendChild(sliderLocationBLock);
  sliderLocationBLock.appendChild(sliderLocationText);
  sliderLocationBLock.appendChild(sliderLocationImg);
  sliderCard.appendChild(sliderTempBlock);
  sliderTempBlock.appendChild(sliderTempImg);
  sliderTempBlock.appendChild(sliderTempMeaning);
  sliderCard.appendChild(sliderDataBlock);
  sliderDataBlock.appendChild(sliderDataText);
  // sliderCard.appendChild(sliderAdditionalBLock);
  // sliderAdditionalBLock.appendChild(sliderAdditionalList);

  // sliderAdditionalList.appendChild(sliderAdditionalItem);
  // sliderAdditionalItem.appendChild(sliderAdditionalItemSpan);
}

/* Отображение информации после ввода */

function renderInfoWeather(city, temp_c) {
  const c = document.querySelector(".slider-card__location-text");
  const t = document.querySelector(".slider-card__temp-meaning");
  c.textContent = `${city}`;
  t.textContent = `${temp_c}°C`;
}

function getMonth(nowDate) {
  let month = nowDate.getMonth();

  switch (month) {
    case 0:
      return "Jun";
    case 1:
      return "Feb";
    case 2:
      return "Mar";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
  }
}

function getWeekDay(nowDate) {
  let weekDay = nowDate.getDay();

  switch (weekDay) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tues";
    case 3:
      return "Wed";
    case 4:
      return "Thurs";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
  }
}

/* Отработка элемента поиска при нажатии на ENTER */

document.addEventListener("keydown", (e) => {
  if (e.code == "Enter") {
    e.preventDefault();
    console.log("VALUE INPUT =>" + INPUT_SEARCH.value);
    getWeatherCity(INPUT_SEARCH.value, API_KEY);
    setTimeout(() => {
      if (
        cityWeather === "null" ||
        cityWeather === "" ||
        cityWeather === "undefined"
      ) {
        cityWeather = "";
        temp_cCity = "";
      } else {
        renderInfoWeather(cityWeather, temp_cCity);
        cityWeather = "";
        temp_cCity = "";
      }
    }, 500);
    INPUT_SEARCH.value = "";
  }
});

/* Запрос информации о погоде */

async function getWeatherCity(city, apiKey) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    let weatherInfo = await response.json();
    cityWeather = weatherInfo.location.name;
    temp_cCity = parseInt(weatherInfo.current.temp_c);
  } catch (err) {
    alert(err + ">>>>" + "Такого города похоже нет!");
  }
}

/* 
Нужно написать логику, которая при изначальной загрузке, показывалась карточка пустая с надписью,  и далее при запросе города, заменялась
на карточку с городом.
*/
