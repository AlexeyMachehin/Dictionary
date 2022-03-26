import "./css/nullstyle.css";
import "./css/style.css";
import "./js/material";
import "./firebase/firebase";
import './components/mainWindow/header/menu';
import {isActiveTheme, getActiveTheme} from './components/mainWindow/header/menu';
import './components/preloader/preloader';
import {getRefDoc} from "./firebase/firebase";
import {renderTable} from "./components/mainWindow/wordsList/wordsList";
import {checkButton} from "./components/learnAllWordsByThemeModal/checkButton/checkButton";
import {skipButton} from "./components/learnAllWordsByThemeModal/skipButton/skipButton";
import {changeLanguageButton} from "./components/learnAllWordsByThemeModal/changeLanguageButton/changeLanguageButton";
import {translate} from "./components/learnAllWordsByThemeModal/enterTranslateInput/enterTranslateInput";
import {learnWord} from "./components/learnAllWordsByThemeModal/learningWord/learningWord";
import { addThemeInput } from './components/addThemeModal/addThemeModal';
import './components/addThemeModal/addThemeModal';;
import { addWord } from "./components/addNewWordModal/addNewWordModal"
import "./components/addNewWordModal/addNewWordModal";



// пример объекта "тема"
// let themes = {
//   furniture: {
//     table: "стол",
//     chair: "стул",
//     furniture: "мебель",
//     sofa: "диван",
//     bed: "кровать",
//     sofa: "диван-кровать",
//     armchair: "кресло",
//     stool: "табурет",
//     couch: "кушетка",
//     bench: "скамейка",
//     desk: "письменный стол",
//     coffee_table: "журнальный столик",
//     cabinet: "сервант",
//     chest_of_drawers: "комод",
//     cupboard: "шкаф_для посуды",
//     bookcase: "книжный шкаф",
//     wardrobe: "гардероб",
//     bookshelf: "книжная полка",
//     double_bed: "двухместная кровать",
//     shelf: "полка",
//     hanger: "вешалка",
//   },
//   food: {
//     banana: "банан",
//     juice: "сок",
//   },
//   clothes: {
//     jeans: "джинсы",
//   },
// };

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

export let keyByValue = null;

export let currentLanguage = true; //флаг для выбора "Russian-English" или "English-Russian" внутри формы "learn all words by theme"

export let wordsCopy; //при открытии окна копируем объект

export let index; // индекс ключа объекта (английского слова)

let previousWord; // переменная для отмены повторения слова при нажатии кнопки "skip"

//инициализируем модальные окна (добавляется функционал из библиотеки materialize и добавляется функционал при закрытии форм)
document.addEventListener("DOMContentLoaded", function (e) {
  const elems = document.querySelectorAll(".modal");
  M.Modal.init(elems, {
    onOpenEnd: function () {
      translate.focus();
      addThemeInput.focus();
      addWord.focus();
    },
    onCloseEnd: function () {
      learnWord.innerHTML = "";
      checkButton.innerHTML = "check";
      checkButton.disabled = false;
      changeLanguageButton.disabled = false;
      skipButton.disabled = false;
      resetCheckInput(translate, "enter translate", "error");
      if (isActiveTheme()) {
        onSnapshot(getRefDoc(getActiveTheme()), (doc) => {
          wordsCopy = doc.data();
          renderTable(doc.data());
        });
      }
    },
  });
});

//настраиваем параметры выпадающего списка тем
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {
    constrainWidth: false,
    isScrollable: true,
  });
});


//-----------------------ФУНКЦИИ-------------------------------------------------------------------------------------------------------------------------------------------------------------
 
//получаем рандомное число от 0 до макс.длины массива
function random(lengthArray) {
  let max = lengthArray;
  let min = 0;
  return Math.floor(Math.random() * (max - min) + min);
}
//рендер рандомного числа
export function renderRandomWord() {
  index = random(Object.values(wordsCopy).length);
  //Object.values(themes[activeTheme]) - возвращает массив

  if (currentLanguage === true) {
    if (
      Object.values(wordsCopy)[index] === previousWord &&
      Object.values(wordsCopy).length > 1
    ) {
      renderRandomWord();
    } else {
      previousWord = Object.values(wordsCopy)[index];
      learnWord.innerHTML = "";
      learnWord.insertAdjacentHTML(
        "afterbegin",
        ` <div
    class="learning__word learn__input flow-text"
    data-function="learn__input"
  >${previousWord}</div>`
      );
    }
  } else {
    if (
      Object.keys(wordsCopy)[index] === previousWord &&
      Object.keys(wordsCopy).length > 1
    ) {
      renderRandomWord();
    } else {
      previousWord = Object.keys(wordsCopy)[index];
      learnWord.innerHTML = "";
      learnWord.insertAdjacentHTML(
        "afterbegin",
        ` <div
  class="learning__word learn__input flow-text"
  data-function="learn__input"
>${previousWord}</div>`
      );
    }
  }
}

//очистка инпута
export function resetCheckInput(element, placeholder, className) {
  element.value = "";
  element.disabled = false;
  element.classList.remove(className);
  element.setAttribute("placeholder", placeholder);
}

// функция полного копирования объекта
function deepClone(obj) {
  const clObj = {};
  for (const i in obj) {
    if (obj[i] instanceof Object) {
      clObj[i] = deepClone(obj[i]);
      continue;
    }
    clObj[i] = obj[i];
  }
  return clObj;
}
