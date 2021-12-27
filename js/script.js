// Get variables
const time = document.querySelector('.time');
const date = document.querySelector('.date');

const greeting = document.querySelector('.greeting');
const greetingContainer = document.querySelector('.greeting-container');
const name = document.querySelector('.name');

const body = document.body;
const slidePrev = document.querySelector('.slide-prev');
const slideNext = document.querySelector('.slide-next');

const weatherContainer = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');
const quoteContainer = document.querySelector('.quote-container');

const audioContainer = document.querySelector('.player');
const playBtn = document.querySelector('.play');
const playPrevBtn = document.querySelector('.play-prev');
const playNextBtn = document.querySelector('.play-next');

const progressAudio = document.querySelector('#progress-audio');
const progressVolume = document.querySelector('#progress-volume');
const volumeBtn = document.querySelector('.volume-btn');
const currentTimeValue = document.querySelector('.current-time');
const durationValue = document.querySelector('.duration');
const songTitle = document.querySelector('.song-title');

const settingsBtn = document.querySelector('.setting-btn');
const popupSection = document.querySelector('.popup-section');
const popupClose = document.querySelector('.popup_close');
const popupArea = document.querySelector('.popup-area');
const tag = document.querySelector('.tag');
const toolsAll = document.querySelector('.setting-checkbox');

const selectLang = document.querySelectorAll('.select-lang');
const selectPhoto = document.querySelectorAll('.select-photo');

const listContainer = document.querySelector('.todolist');
const addBtn = document.querySelector('.lng-btn-add');
const list = document.querySelector('.list');
const outList = document.querySelector('.out');

const timeBtn = document.getElementById('time');
const dateBtn = document.getElementById('date');
const greetingBtn = document.getElementById('greetings');
const quoteBtn = document.getElementById('quotes');
const weatherBtn = document.getElementById('weather');
const audioBtn = document.getElementById('audioplayer');
const listBtn = document.getElementById('list');

// Translate 

import translation from './translation.js';

let lang;

let placeholder = {
  en: ['[Enter your city]', '[Enter name]', '[Enter your plan]', '[nature]'],
  ru: ['[Введите ваш город]', '[Введите имя]', '[Введите ваш план]', '[природа]']
}

let settingTools = {
  en: ['Time', 'Date', 'Greetings', 'Quotes', 'Weather', 'Audioplayer', 'To-do list'],
  ru: ['Время', 'Дата', 'Приветствие', 'Цитаты', 'Погода', 'Аудиоплеер', 'Список дел']
}

function setPlaceholder(lang) {
  city.setAttribute('placeholder', placeholder[lang][0]);
  name.setAttribute('placeholder', placeholder[lang][1]);
  list.setAttribute('placeholder', placeholder[lang][2]);
  tag.setAttribute('placeholder', placeholder[lang][3]);
}

function toolsText(lang) {
  document.getElementById('time-tools').lastChild.textContent = settingTools[lang][0];
  document.getElementById('date-tools').lastChild.textContent = settingTools[lang][1];
  document.getElementById('greetings-tools').lastChild.textContent = settingTools[lang][2];
  document.getElementById('quotes-tools').lastChild.textContent = settingTools[lang][3];
  document.getElementById('weather-tools').lastChild.textContent = settingTools[lang][4];
  document.getElementById('audio-tools').lastChild.textContent = settingTools[lang][5];
  document.getElementById('list-tools').lastChild.textContent = settingTools[lang][6];
}

function defaultCity(lang) {
  if (lang == 'en') {
    city.setAttribute('value', 'Minsk');
  } else {
    city.setAttribute('value', 'Минск')
  }
}

saveLang()


for (let selectedLang of selectLang) {
  selectedLang.addEventListener('click', function language(lang = 'en') {
    lang = selectedLang.getAttribute('value');
    for (let key in translation) {
      document.querySelector('.lng-' + key).innerHTML = translation[key][lang];
    }
    setPlaceholder(lang);
    toolsText(lang);
    defaultCity(lang);
    getTimeOfDay(lang);
    getWeather(lang);
    showTime(lang) 
    showDate(lang);
    getQuotes(lang);

    changeQuote.addEventListener('click', function() {
      lang;
      getQuotes(lang)
    });

    slideNext.addEventListener('click', function() {
      lang;
      getSlideNext(lang)
    });
    slidePrev.addEventListener('click', function() {
      lang;
      getSlidePrev(lang)
    });
  })
}  

let photoSource;

for (let selectedPhoto of selectPhoto) {
  selectedPhoto.addEventListener('click', function() {
    photoSource = selectedPhoto.getAttribute('value');
    console.log(photoSource);
    setBg(photoSource);
    getSlidePrev(photoSource);
    getSlideNext(photoSource);
  })
}

// Time and date

// Show time

function showTime(lang) {
  lang;
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, lang, 1000);
  
  showDate(lang);
}

// Show date

function showDate(lang = 'en') {
  lang;
  const dateToday = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  if (lang == 'en') {
    const currentDate = dateToday.toLocaleDateString('en-US', options);
    date.textContent = currentDate;  
  } else if (lang == 'ru') {
    const currentDate = dateToday.toLocaleDateString('ru-RU', options);
    date.textContent = currentDate;  
  }
}

showTime(lang)

// Greeting

const dateHours = new Date();
const hours = dateHours.getHours();

let greetingTranslation = {
  en: ['Good morning,', 'Good afternoon,', 'Good evening,', 'Good night,'],
  ru: ['Доброе утро,', 'Добрый день,', 'Добрый вечер,', 'Доброй ночи,']
}

function getTimeOfDay(lang = 'en') {
  lang;
  let h = hours;
  let times;
  if (h >= 6 && h < 12) {
    if (lang == 'en') {
      greeting.innerHTML = greetingTranslation['en'][0]
    } else {
      greeting.innerHTML = greetingTranslation['ru'][0]
    }
    times = 'morning';
  } 
  if (h >= 12 && h < 18) {
    if (lang == 'en') {
      greeting.innerHTML = greetingTranslation['en'][1]
    } else {
      greeting.innerHTML = greetingTranslation['ru'][1]
    }
    times = 'afternoon';
  }
  if (h >= 18) {
    if (lang == 'en') {
      greeting.innerHTML = greetingTranslation['en'][2]
    } else {
      greeting.innerHTML = greetingTranslation['ru'][2]
    }
    times = 'evening';
  } 
  if (h >= 0 && h < 6) {
    if (lang == 'en') {
      greeting.innerHTML = greetingTranslation['en'][3]
    } else {
      greeting.innerHTML = greetingTranslation['ru'][3]
    }
    times = 'night';
  }
  return times;
}

getTimeOfDay()

// Saving in local storage

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}

window.addEventListener('load', getLocalStorage);

// Background slider

function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const timeOfDay = getTimeOfDay();

function getBg() {
  let bgNum = getRandomNum(1, 20).toString();
  bgNum = bgNum.padStart(2, "0");
  
  img.src = `https://raw.githubusercontent.com/silantevaN/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
}
const img = new Image();

function setBg(photoSource = 'github') {
  if (photoSource == 'github') {
    getBg()
    img.onload = () => {
      body.style.backgroundImage = `url('${img.src}')`;
    }
  } if (photoSource == 'unsplash') {
    getLinkToImageUnsplash()
    img.onload = () => {
      body.style.backgroundImage = `url('${img.src}')`;
    }
  } else if (photoSource == 'flickr') {
    getLinkToImageFlickr()
    img.onload = () => {
      body.style.backgroundImage = `url('${img.src}')`;
    }
  }
}

setBg(photoSource);

// Unsplash API

async function getLinkToImageUnsplash() {
  const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=pjCxOzkMzIm6Wg7RjnA10XXDKqOi2gRtIeeK9dmO8YE`;
  const res = await fetch(url);
  const data = await res.json();
  img.src = data.urls.regular;
 }

//  getLinkToImageUnsplash()

 // Flickr API

 async function getLinkToImageFlickr() {

  const url = 'https://www.flickr.com/services/rest/?method=flickr.galleries.getPhotos&api_key=88666a9d1ce6ae5d7f2200edee4c1e31&gallery_id=72157719479577265&extras=url_h&format=json&nojsoncallback=1';
  const res = await fetch(url);
  const data = await res.json();

  let bgNum = getRandomNum(1, 80)

  img.src = data['photos']['photo'][`${bgNum}`]['url_h'];
 }

 const state = {
  language: 'en',
  photoSource: 'github',
  blocks: ['time', 'date','greeting', 'quote', 'weather', 'audio', 'todolist']
}

// Slider

let randomNum = getRandomNum(1, 20); 

function getSlideNext() {
  photoSource;
  if (randomNum != 20) {
    randomNum = randomNum + 1;
  }
  else {
    randomNum = 1;
  }
  setBg();
}

function getSlidePrev() {
  if (randomNum != 1) {
    randomNum = randomNum - 1;
  }
  else {
    randomNum = 20;
  }
  setBg();
}

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

// Weather 

async function getWeather(lang = 'en') {  

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=a2d7da5da475cc69fe9b8ca494c16d21&units=metric`;
 
  const res = await fetch(url);
  const data = await res.json(); 
  
  errorWeather(data, lang)

  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
  if (lang == 'en') {
    wind.textContent = `Wind speed: ${data.wind.speed.toFixed(0)} m/s`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  } else {
    wind.textContent = `Скорость ветра: ${data.wind.speed.toFixed(0)} м/с`; 
    humidity.textContent = `Влажность: ${data.main.humidity}%`;
  } 
}

getWeather(lang = 'en')

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

function errorWeather(data, lang) {
  if (city.value.length < 1 || city.value == undefined) {
    if (lang == 'en') {
      weatherError.textContent = `Error! City not found for '${city.value}'!`;
    } else {
      weatherError.textContent = `Ошибка! Город '${city.value}' не найден!`;
    }
    temperature.style.display = 'none';
    weatherDescription.style.display = 'none';
    wind.style.display = 'none';
    humidity.style.display = 'none';
  } 
  if (data.cod === '404' || data.cod === '400') {
    weatherError.textContent = `Error! City not found!`;
    temperature.style.display = 'none';
    weatherDescription.style.display = 'none';
    wind.style.display = 'none';
    humidity.style.display = 'none';
  }
  else {
    weatherError.textContent = '';
    temperature.style.display = 'block';
    weatherDescription.style.display = 'block';
    wind.style.display = 'block';
    humidity.style.display = 'block';
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

function setLocalStorageWeather() {
  localStorage.setItem('city', city.value);
  getWeather();
}
window.addEventListener('beforeunload', setLocalStorageWeather);

function getLocalStorageWeather() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  }
}
window.addEventListener('load', getLocalStorageWeather);

async function getQuotes(lang) {  
  if (lang == 'en') {
    const quotes = 'data.json';
    const res = await fetch(quotes);
    const data = await res.json(); 

    let random = getRandomNum(0, 19);

    quote.textContent = `${data[random].text}`;
    author.textContent = `${data[random].author}`;
  } 
  else if (lang == 'ru') {
    const quotes = 'quotes_ru.json';
    const res = await fetch(quotes);
    const data = await res.json(); 
      
    let random = getRandomNum(0, 19);

    quote.textContent = `${data[random].text}`;
    author.textContent = `${data[random].author}`;
  }
}

getQuotes(lang);

changeQuote.addEventListener('click', function() {
  lang;
  getQuotes(lang)
})

// Audio player

const playListContainer = document.querySelector('.play-list');

function createPlayList() {
    for(let i = 0; i < playList.length; i++) {
      const li = document.createElement('li');
      li.classList.add('play-item');
      li.setAttribute('li-index', i)
      li.textContent = playList[i].title;
      playListContainer.append(li);
    }
}

createPlayList()

function stylePlayList(num) {
  const li = document.querySelectorAll('.play-item');
  li.forEach((el, number) => {
    if (number === num) {
      el.classList.add('item-active');
    } else {
    el.classList.remove('item-active');
    }
    })
}

window.addEventListener('load', playingSong)

const audio = new Audio();

let isPlay = false;

function playAudio() {
  audio.src = playList[playNum].src;
  audio.play();
  playBtn.classList.add('pause');
  stylePlayList(playNum);
  getSongTitle();
}

function toggleAudio() {
  if (!isPlay) {
    playAudio();
    isPlay = true;
    }
  else if (isPlay) {
    audio.pause();
    playBtn.classList.remove('pause');
    isPlay = false;
  }
  getSongTitle()
}

playBtn.addEventListener('click', toggleAudio);

// Перелистывание

let playNum = 0;

function playNext() {
  if (playNum != 3) {
    playNum++;
  }
  else if (playNum == 3) {
    playNum = 0;
  }
  playAudio();
  isPlay = true;
}

function playPrev() {
  if (playNum != 0) {
    playNum--;
  }
  else {
    playNum = 3;
  }
  playAudio();
  isPlay = true;
}

function playingSong() {
  const allLi = playListContainer.querySelectorAll('li');
  for (let j = 0; j < allLi.length; j++) {
    
    if (allLi[j].getAttribute('li-index') == playNum) {
      allLi[j].classList.add('playing')
    } else {
      allLi[j].classList.remove('item-playing');
    }
    allLi[j].onclick = function() { 
      let getLiIndex = allLi[j].getAttribute('li-index');
      playNum = getLiIndex;
      allLi[getLiIndex].classList.add('item-playing');
      toggleAudio();
      if (audio.paused) {
        isPlay = false;
        allLi[getLiIndex].classList.remove('item-playing');
      }
      playingSong();
     } 
  }  
}


import playList from './playList.js';

playPrevBtn.addEventListener('click', playPrev);
playNextBtn.addEventListener('click', playNext);

// Audio player

function getDuration() {
  let duration = audio.duration;
  let durationMin = Math.floor(duration / 60);
  let durationSec = Math.floor(duration % 60);
  if (durationSec < 10) {
    durationSec = `0${durationSec}`
  }
  if (durationMin < 10) {
    durationMin = `0${durationMin}`
  }
  durationValue.textContent = `${durationMin}:${durationSec}`;
}

audio.addEventListener('timeupdate', (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressAudioVal = (currentTime / duration) * 100;
  progressAudio.style.background = `linear-gradient(to right, #8a8a8a 0%, #8a8a8a ${progressAudioVal}%, #FFFFFF ${progressAudioVal}%, #FFFFFF 100%)`;
  if (progressAudioVal > 99) {
    playBtn.classList.remove('pause');
  }
  audio.addEventListener('loadeddata', () => {
    getDuration()
  })
  getCurrentTime()
})


function clickOnProgress(e) {
  audio.currentTime = (e.offsetX / progressAudio.clientWidth) * audio.duration;
}

progressAudio.addEventListener('click', clickOnProgress);


function getCurrentTime() {
  let currentTimeVal = audio.currentTime;
  let totalMin = Math.floor(currentTimeVal / 60);
  let totalSec = Math.floor(currentTimeVal % 60);
  if (totalSec < 10) {
    totalSec = `0${totalSec}`
  }
  if (totalMin < 10) {
    totalMin = `0${totalMin}`
  }
  currentTimeValue.textContent = `${totalMin}:${totalSec}`;
}

// Volume 

audio.volume = 0.1

function changeVolume() {
  audio.volume = progressVolume.value / 100;
  if (this.value == 0) {
    volumeBtn.classList.add('mute-btn')
  } else {
    volumeBtn.classList.remove('mute-btn')
  }
}

progressVolume.addEventListener('change', changeVolume);


function mute() { 
  if (audio.muted) {
    progressVolume.value = audio.volume * 100;
    progressVolume.style.background = `linear-gradient(to right, #8a8a8a 0%, #8a8a8a ${progressVolume.value}%, #FFFFFF ${progressVolume.value}%, #FFFFFF 100%)`;
    volumeBtn.classList.remove('mute-btn')
    audio.muted = false;
  } else {
    progressVolume.value = 0;
    volumeBtn.classList.add('mute-btn')
    progressVolume.style.background = `linear-gradient(to right, #8a8a8a 0%, #8a8a8a ${progressVolume.value}%, #FFFFFF ${progressVolume.value}%, #FFFFFF 100%)`;
    audio.muted = true;
  } 
}

volumeBtn.addEventListener('click', mute)

progressVolume.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #8a8a8a 0%, #8a8a8a ${value}%, #FFFFFF ${value}%, #FFFFFF 100%)`;
})

// Song title

function getSongTitle() {
  songTitle.innerText = playList[playNum].title;
}

// Next song 

audio.addEventListener('ended', playNext);

// settings

function showSettings() {
  popupSection.style.visibility = "visible";
  popupSection.style.opacity = "1";
}

function hideSettings() {
  popupSection.style.visibility = "hidden";
  popupSection.style.opacity = "0";
}

settingsBtn.addEventListener('click', showSettings);
popupClose.addEventListener('click', hideSettings);
popupArea.addEventListener('click', hideSettings);

timeBtn.addEventListener('change', checkedTime)

function checkedTime() {
  time.classList.toggle('off');
}

dateBtn.addEventListener('change', checkedDate)

function checkedDate() {
  date.classList.toggle('off');
}

greetingBtn.addEventListener('change', checkedGreeting)

function checkedGreeting() {
  greetingContainer.classList.toggle('off');
}

quoteBtn.addEventListener('change', checkedQuote)

function checkedQuote() {
  quoteContainer.classList.toggle('off');
}

weatherBtn.addEventListener('change', checkedWeather)

function checkedWeather() {
  weatherContainer.classList.toggle('off');
}

audioBtn.addEventListener('change', checkedAudio)

function checkedAudio() {
  audioContainer.classList.toggle('off');
}

listBtn.addEventListener('change', checkedList)

function checkedList() {
  listContainer.classList.toggle('off');
}


function saveLang(lang) {
  var radio = document.getElementsByName('lang');

for (var i = 0; i < radio.length; i++) {
  radio[i].onclick = function() {
    localStorage.setItem('chosenSetting', this.value);
  }
}
if(localStorage.getItem('chosenSetting')) {
  var chosenSetting = localStorage.getItem('chosenSetting');
  document.querySelector('input[name="lang"][value="' + chosenSetting + '"]').setAttribute('checked','checked');
}
lang = chosenSetting;
}

// To-do list 

window.onload = function() {
  let toDoList = [];
  if (localStorage.getItem('todo')!=undefined) {
    toDoList = JSON.parse(localStorage.getItem('todo'));
    out();
  }

addBtn.onclick = function() {
  let listValue = list.value;
  let temp = {}
  temp.todo = listValue;
  temp.check = false;

  let i = toDoList.length;
  toDoList[i] = temp;
  out(); 
  list.value = '';
  localStorage.setItem('todo', JSON.stringify(toDoList));
}
function out() {
  let out = '';
  for (let key in toDoList) {
      out += `<p class="list-p">${toDoList[key].todo}</p>`;
  }
  outList.innerHTML = out;
  document.querySelectorAll('.list-p').forEach((el, i) => el.addEventListener('click', function() {
    el.style.textDecoration = 'line-through';
      el.style.visibility = 'hidden';
      el.style.opacity = '0';
      toDoList.splice(i, 1);
      localStorage.setItem('todo', JSON.stringify(toDoList));
  }))
} 
}