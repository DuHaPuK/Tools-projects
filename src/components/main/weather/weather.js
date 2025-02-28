"use strict";

const TIME_BLOCK = document.querySelector(".weather-logo-block__time");
const DATE_BLOCK = document.querySelector(".slider-card__data-text");
const INPUT_SEARCH = document.querySelector(".input-search");
const DELETE_BTN = document.querySelector(".slider-card__delete-btn");

const API_KEY = "a53c098ae82543b4a48124519252402";

let cityList = [];
let tempIdxCityList;

let cityWeather = "";
let temp_cCity = "";

let tempButton = "";

let nowDate = new Date();

/* Вывод времени на странице*/

function renderTime(domElement) {
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes <= 9) {
    domElement.innerHTML = `${hours}:0${minutes}`;
  } else {
    domElement.innerHTML = `${hours}:${minutes}`;
  }
}

/* Вывод даты на карточку с погодой. */

function renderDate(domElement) {
  let month = getMonth(nowDate);
  let weekDay = getWeekDay(nowDate);
  let dayDate = nowDate.getDate();

  domElement.textContent = `${month} ${dayDate}, ${weekDay}`;
}

renderTime(TIME_BLOCK);

renderCardWeather();

/* Отрисовка карточки с погодой на странице */

function renderCardWeather() {
  const sliderContainer = document.querySelector(".slider-container");

  const sliderCard = document.createElement("div");
  sliderCard.classList.add("slider-card");

  const sliderLocationBLock = document.createElement("div");
  sliderLocationBLock.classList.add("slider-card__location-block");

  const sliderWastebasket = document.createElement("button");
  sliderWastebasket.classList.add("slider-card__delete-btn");

  // sliderWastebasket.textContent = "btn";

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
  renderDate(sliderDataText);

  sliderContainer.appendChild(sliderCard);
  sliderCard.appendChild(sliderLocationBLock);
  sliderLocationBLock.appendChild(sliderLocationText);
  sliderLocationBLock.appendChild(sliderLocationImg);
  sliderLocationBLock.appendChild(sliderWastebasket);
  sliderCard.appendChild(sliderTempBlock);
  sliderTempBlock.appendChild(sliderTempImg);
  sliderTempBlock.appendChild(sliderTempMeaning);
  sliderCard.appendChild(sliderDataBlock);
  sliderDataBlock.appendChild(sliderDataText);
}

/* Отображение информации после ввода */

function renderInfoWeather(array, tempButton) {
  const c = document.querySelector(".slider-card__location-text");
  const t = document.querySelector(".slider-card__temp-meaning");
  const d = document.querySelector(".slider-card__delete-btn");
  const btnLeft = document.querySelector(".left-arrow");
  const btnRight = document.querySelector(".right-arrow");

  if (array.length <= 1) {
    btnLeft.classList.add("hidden");
    btnRight.classList.add("hidden");
  } else {
    btnLeft.classList.remove("hidden");
    btnRight.classList.remove("hidden");
  }

  array.forEach((item, index) => {
    if (tempButton == "addBtn" && array.length === 1) {
      tempIdxCityList = index;
      c.textContent = item.city;
      t.textContent = item.temp + "°C";
      d.setAttribute("id", `${item.id}`);
      tempButton = "";
    } else if (
      tempButton == "addBtn" &&
      array.length >= 2 &&
      index === array.length - 1
    ) {
      tempIdxCityList = index;
      c.textContent = item.city;
      t.textContent = item.temp + "°C";
      d.setAttribute("id", `${item.id}`);
      tempButton = "";
    } else if (
      tempButton == "left-arrow" &&
      index === tempIdxCityList - 1 &&
      tempIdxCityList > 0
    ) {
      tempIdxCityList = index;
      const SLIDER_CARD = document.querySelector(".slider-card");
      SLIDER_CARD.classList.add("slide-out");
      setTimeout(() => {
        SLIDER_CARD.classList.add("hidden");
      }, 300);
      setTimeout(() => {
        c.textContent = item.city;
        t.textContent = item.temp + "°C";
        d.setAttribute("id", `${item.id}`);

        SLIDER_CARD.classList.remove("slide-out");
        SLIDER_CARD.classList.add("slide-in");
      }, 300);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-in");
        SLIDER_CARD.classList.remove("hidden");
        SLIDER_CARD.classList.add("slide-back");
      }, 500);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-back");
      }, 501);
      tempButton = "";
    } else if (
      tempButton == "left-arrow" &&
      tempIdxCityList === 0 &&
      index === array.length - 1
    ) {
      tempIdxCityList = index;
      const SLIDER_CARD = document.querySelector(".slider-card");
      SLIDER_CARD.classList.add("slide-out");
      setTimeout(() => {
        SLIDER_CARD.classList.add("hidden");
      }, 300);
      setTimeout(() => {
        c.textContent = item.city;
        t.textContent = item.temp + "°C";
        d.setAttribute("id", `${item.id}`);

        SLIDER_CARD.classList.remove("slide-out");
        SLIDER_CARD.classList.add("slide-in");
      }, 300);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-in");
        SLIDER_CARD.classList.add("slide-back");
        SLIDER_CARD.classList.remove("hidden");
      }, 500);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-back");
      }, 501);
      tempButton = "";
    } else if (tempButton == "right-arrow" && index === tempIdxCityList + 1) {
      tempIdxCityList = index;
      const SLIDER_CARD = document.querySelector(".slider-card");
      SLIDER_CARD.classList.add("slide-in");
      setTimeout(() => {
        SLIDER_CARD.classList.add("hidden");
      }, 300);
      setTimeout(() => {
        c.textContent = item.city;
        t.textContent = item.temp + "°C";
        d.setAttribute("id", `${item.id}`);

        SLIDER_CARD.classList.remove("slide-in");
        SLIDER_CARD.classList.add("slide-out");
      }, 300);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-out");
        SLIDER_CARD.classList.add("slide-back");
        SLIDER_CARD.classList.remove("hidden");
      }, 500);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-back");
      }, 501);
      tempButton = "";
    } else if (
      tempButton == "right-arrow" &&
      tempIdxCityList == array.length - 1 &&
      index === 0
    ) {
      tempIdxCityList = index;
      const SLIDER_CARD = document.querySelector(".slider-card");
      SLIDER_CARD.classList.add("slide-in");
      setTimeout(() => {
        SLIDER_CARD.classList.add("hidden");
      }, 300);
      setTimeout(() => {
        c.textContent = item.city;
        t.textContent = item.temp + "°C";
        d.setAttribute("id", `${item.id}`);

        SLIDER_CARD.classList.remove("slide-in");
        SLIDER_CARD.classList.add("slide-out");
      }, 300);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-out");
        SLIDER_CARD.classList.add("slide-back");
        SLIDER_CARD.classList.remove("hidden");
      }, 500);

      setTimeout(() => {
        SLIDER_CARD.classList.remove("slide-back");
      }, 501);
      tempButton = "";
    }
  });
}

/* Вовзращает название месяца место числа */

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

/* Возвращает назание дня недели место числа */

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
    tempButton = "addBtn";
    e.preventDefault();
    if (INPUT_SEARCH.value.length > 0) {
      getWeatherCity(INPUT_SEARCH.value, API_KEY);
      setTimeout(() => {
        renderInfoWeather(cityList, tempButton);
        addListLocalStorage(cityList, "cityWeather");
        cityWeather = "";
        temp_cCity = "";
      }, 500);
    }
    INPUT_SEARCH.value = "";
  }
});

/* Отбработка кликов */

document.addEventListener("click", (e) => {
  let target = e.target;
  console.log(cityList);
  if (target.classList.contains("btn-search-weather")) {
    e.preventDefault();
    tempButton = "addBtn";
    if (INPUT_SEARCH.value.length > 0) {
      getWeatherCity(INPUT_SEARCH.value, API_KEY);
      setTimeout(() => {
        renderInfoWeather(cityList, tempButton);
        addListLocalStorage(cityList, "cityWeather");
        cityWeather = "";
        temp_cCity = "";
        INPUT_SEARCH.value = "";
      }, 500);
    }
  } else if (target.classList.contains("left-arrow-svg")) {
    e.preventDefault();
    tempButton = "left-arrow";
    renderInfoWeather(cityList, tempButton);
  } else if (target.classList.contains("right-arrow-svg")) {
    e.preventDefault();
    tempButton = "right-arrow";
    renderInfoWeather(cityList, tempButton);
  } else if (target.classList.contains("slider-card__delete-btn")) {
    const idCard = target.getAttribute("id");
    deleteCard(cityList, idCard);
    deleteCardStorage(idCard, "cityWeather");
    renderInfoWeather(cityList, tempButton);
    if (cityList.length === 0) {
      const sliderContainer = document.querySelector(".slider-container");
      sliderContainer.innerHTML = "";
      renderCardWeather();
    }
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
    addCityTemp(cityWeather, temp_cCity, cityList);
    cityWeather = "";
    temp_cCity = "";
  } catch (err) {
    alert(err + ">>>>" + "Такого города похоже нет!");
  }
}

/* Добавление в массив */

function addCityTemp(city, temp, array) {
  const newCity = {
    id: Date.now(),
    city,
    temp,
  };

  array.push(newCity);
}

/* Загрузка массив со списком в localStorage */

function addListLocalStorage(array, name) {
  localStorage.setItem(`${name}`, JSON.stringify(array));
}

/* Загрузка  массив со списком из localStorage*/

function loadArrayList(name) {
  const boxCity = JSON.parse(localStorage.getItem(`${name}`));
  if (boxCity) {
    boxCity.forEach((item) => {
      cityList.push(item);
    });
  }
}

/* Загрузка масссив со списком из localStorage во время загрузки DOM */

document.addEventListener("DOMContentLoaded", () => {
  loadArrayList("cityWeather");
  tempButton = "addBtn";
  renderInfoWeather(cityList, tempButton);
});

/* Удаление карточки из localStorage */

function deleteCardStorage(id, name) {
  const box = JSON.parse(localStorage.getItem(`${name}`));
  box.forEach((item, index) => {
    if (id == item.id) {
      box.splice(index, 1);
    }
  });
  localStorage.setItem(`${name}`, JSON.stringify(box));

  if (localStorage.getItem(`${name}`).length === 2) {
    localStorage.removeItem(`${name}`);
  }
}

/* Удаление карточки с погодой */

function deleteCard(array, id) {
  array.forEach((item, index) => {
    if (item.id == id) {
      array.splice(index, 1);
    }
  });
}

/* Удаление стрелок, если нет необходимости прокрутки */

/* 

Задача:
++ 1.Удаление карточки с погодой
++ 2. Красивая прокрутка, переключение между карточками погоды.

Далее повторение promise (все темы!) для того чтобы досконально все понять и далее применять в проектах .

----------------------
Еще бы такую логику продумать, типо после перезагрузки страницы или загрузки погода обновляется.. А то сейчас так, что сохранилось то и показывает. Это как доп
надо будет внедрить.
*/
