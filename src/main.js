import "./css/nullstyle.css";
import "./css/style.css";
import "./js/material";
import "./firebase/firebase";
import {
  fetchThemes,
  deleteWord,
  getRefDoc,
  addNewWord,
  addNewTheme,
  getRefCollection,
  deleteTheme,
  addNewUser,
  login,
} from "./firebase/firebase";

import { onSnapshot } from "firebase/firestore";

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

let keyByValue = null;

let currentLanguage = true; //флаг для выбора "Russian-English" или "English-Russian" внутри формы "learn all words by theme"

let wordsCopy; //при открытии окна копируем объект

let activeTheme = null; //выбранная тема

let index; // индекс ключа объекта (английского слова)

let previousWord; // переменная для отмены повторения слова при нажатии кнопки "skip"

let container = document.querySelector(".container"); // основной контейнер с программой

let preLoader = document.querySelector(".container-preloader"); // показывается preloader до тех пор, пока не загрузятся темы

// -----------------------------------ФОРМЫ-------------------------------------------------------------------------------------------------------------------------------------------------------

// -------------------------форма: добавить тему-----------------------

let addThemeInput = document.querySelector(".enter-new-theme"); // инпут "enter new theme" "введите название новой темы" внутри формы

const addThemeButtonInForm = document.querySelector(".add-new-theme"); //кнопка "add" "добавить тему в базу" внутри формы

// -------------------------форма: добавить слово в текущую тему-----------------------

let addWord = document.querySelector(".enter-word"); // инпут "enter word" "добавьте новое слово" внутри формы

let addTranslate = document.querySelector(".enter-translate"); // инпут с переводом "enter translate" "введите перевод" внутри формы

let addButtonForm = document.querySelector(".add-button-form"); //кнопка "add" "добавить слово в базу" внутри формы

let addWordHeader = document.querySelector(".add-word_header"); //заголовок "add a word to the current topic" внутри формы

//----------------форма: учить слова на выбранную тему ------------------

const formLearn = document.querySelector(".learn"); // форма "учить слова на текущую тему"

let learnWord = document.querySelector(".learning__word"); //проверяемое слово (в заголовке)

let translate = document.querySelector(".translate"); //инпут с проверочным словом "enter translate" "введите перевод" внутри формы

const checkButton = document.querySelector(".check"); // кнопка "check" проверяющая слово

const skipButton = document.querySelector(".next__word"); // кнопка "skip" "следующее слово" пропускающая слово

const changeLanguageButton = document.querySelector(".change-language-button"); // кнопка меняющая язык "Russian-English" на "English-Russian"

let translateType = document.querySelector(".translate-type__header"); // контейнер с текстом "Russian-English" или "English-Russian"

let showTranslateButton = document.querySelector(".show-translate"); // кнопка "show translate" показать перевод (подсказка)

//------------------------------форма: регистрация и вход ---------------------

// регистрация-----------------------------------

const registerForm = document.querySelector(".register-form");

let addNewUserNameInput = document.getElementById("register-name"); //инпут имя пользователя

let addNewUserEmailInput = document.getElementById("register-email"); //инпут Email

let addNewUserPasswordInput = document.getElementById("register-password"); //инпут Password

let addNewUserButton = document.querySelector(".register-button"); // кнопка регистрация нового пользователя

// вход------------------------------------------

const loginForm = document.querySelector(".login-form");

let loginNewUserNameInput = document.getElementById("login-name"); //инпут имя пользователя

let loginNewUserEmailInput = document.getElementById("login-email"); //инпут Email

let loginNewUserPasswordeInput = document.getElementById("login-password"); //инпут Password

let loginButton = document.querySelector(".login-button"); // кнопка логин (вход)

//--------------------------------ГЛАВНОЕ ОКНО ПРОГРАММЫ----------------------------------------------------------------------------------------------------------------------------------------

//----------------------------меню (заголовок)-----------------------------

const menuTheme = document.querySelector(".functions"); // контейнер с кнопками "choose theme", "learn all words by theme"

const LearnWordsByThemeButton = document.querySelector(".learn-button"); //кнопка "Learn Words ByTheme" учить слова по текущей теме

const chooseThemeButton = document.querySelector("[data-target='dropdown1']"); //меняющееся название темы у кнопки выпадающего меню

let dropDownList = document.querySelector(".dropdown-content"); //выпадающий список с темами

let dropDownListInner = document.querySelector(".dropdown-content__inner"); //внутренний список с темами

let deleteThemeButtons; // кнопка "DEL" удалить тему из выпадающего списка

let addThemeButtonInList = document.querySelector(".add-theme"); //кнопка "add theme" внутри выпадающего списка

//-------------------------окно со списком слов текущей темы---------------

let addButtonTable = document.querySelector(".add-button-table"); //кнопка "add" добавляющая новое слово в текущую тему

let tableBody = document.querySelector(".words-list"); // список слов на текующую тему

let tableHeadItem = document.querySelector(".table-head-item"); // заголовок таблицы со словами на текущую тему и кнопкой "add"

//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//инициализируем модальные окна (добавляется функционал из библиотеки materialize и добавляется функционал при закрытии форм)
const authModal = document.querySelector(".register-and-login");
const imgWrong = document.querySelector(".img-wrong");
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
      if (activeTheme) {
        onSnapshot(getRefDoc(activeTheme), (doc) => {
          wordsCopy = doc.data();
          renderTable(doc.data());
        });
      }
    },
  });
});

//настраиваем параметры выпадающего списка
document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {
    constrainWidth: false,
    isScrollable: true,
  });
});

//действия при нажатии кнопок "choose theme" и "learn words by theme" (рендер таблицы слов, рендер рандомного числа, очистка формы)
menuTheme.addEventListener("click", (e) => {
  if (e.target.dataset.theme === "theme-link") {
    activeTheme = e.target.innerHTML;
    onSnapshot(getRefDoc(activeTheme), (doc) => {
      wordsCopy = doc.data();
      renderTable(doc.data());
    });
    LearnWordsByThemeButton.style.display = "block";
    chooseThemeButton.innerHTML =
      activeTheme + '<i class="material-icons right">arrow_drop_down</i>'; //меняет название темы у кнопки выпадающего меню
    chooseThemeButton.classList.remove("pulse");
  }

  if (e.target.dataset.function === "learn-all-words-by-theme") {
    if (!activeTheme) {
      translate.disabled = true;
      learnWord.innerHTML = "Choose theme";
      checkButton.disabled = true;
      skipButton.disabled = true;
      showTranslateButton.disabled = true;
    } else {
      showTranslateButton.disabled = false;
      //показываем проверяемое слово
      //Object.values(themes[activeTheme]) - возвращает массив
      renderRandomWord();
    }
    tableBody.innerHTML = "";
  }
});

//----------------------------------ФОРМЫ------------------------------------------------------------------------------------------------------------------------------------------------------------

// --------------------форма "добавление новой темы"---------------------------------------

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewUser(registerForm.email.value, registerForm.password.value);
});

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  login(loginForm.email.value, loginForm.password.value).then(() => {
    M.Modal.getInstance(authModal).close();
  });
});

// --------------------форма "добавление новой темы"---------------------------------------

//добавляем новую тему (берем значение из инпута и при нажатии кнопки "add" записываем его в колонку words в firebase)
addThemeButtonInForm.addEventListener("click", () => {
  addNewTheme(addThemeInput.value).then(
    resetCheckInput(addThemeInput, "Add new theme", "empty")
  );
});

// --------------------форма "Learn All Words ByTheme" учить слова по текущей теме-------------

//проверка введенного перевода при нажатии кнопки "check", вывод "CORRECT", "WRONG!", "You translated all words correctly", очистка формы, рендер рандомного слова
checkButton.addEventListener("click", (e) => check());

// теже функции что у checkButton, только при нажатии ENTER
formLearn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    check();
  }
});

//рендер рандомного слова при нажатии кнопки "skip", вывод "You translated all words correctly", очистка формы
skipButton.addEventListener("click", () => {
  if (Object.keys(wordsCopy).length === 0) {
    skipButton.disabled = true;
    translate.disabled = true;
    learnWord.innerHTML = "You translated all words correctly";
  } else {
    //показываем проверяемое слово
    renderRandomWord();
    checkButton.disabled = false;
    checkButton.innerHTML = "check";
    translate.focus();
  }
});

skipButton.addEventListener("mousedown", () => {
  resetCheckInput(translate, "enter translate", "correct");
  resetCheckInput(translate, "enter translate", "error");
});

// кнопка меняющая язык "Russian-English" на "English-Russian"
changeLanguageButton.addEventListener("click", () => {
  translate.placeholder = "enter translate";
  translate.classList.remove("error");
  if (currentLanguage) {
    currentLanguage = false;
    translateType.innerHTML = "English-Russian";
  } else {
    currentLanguage = true;
    translateType.innerHTML = "Russian-English";
  }
  renderRandomWord();
  translate.focus();
});

// кнопка "show Translate" показывает подсказку
showTranslateButton.addEventListener("mousedown", () => {
  if (currentLanguage) {
    translate.value = Object.keys(wordsCopy)[index];
  } else {
    translate.value = Object.values(wordsCopy)[index];
  }
});
showTranslateButton.addEventListener("touchstart", () => {
  if (currentLanguage) {
    translate.value = Object.keys(wordsCopy)[index];
  } else {
    translate.value = Object.values(wordsCopy)[index];
  }
});

showTranslateButton.addEventListener("mouseup", () => {
  translate.value = "";
  translate.focus();
});
showTranslateButton.addEventListener("touchend", () => {
  translate.value = "";
  translate.focus();
});

// --------------------форма с добавлением слова-------------------------------------------

//при нажатии кнопки "add" добавляем новое английское и русское слово в firebase
addButtonForm.addEventListener("click", () => {
  if (addWord.value === "" || addTranslate.value === "") {
    addWordHeader.innerHTML = "enter translate";
  } else {
    if (
      (!checkRussian(addWord.value) && checkRussian(addTranslate.value)) ||
      (checkRussian(addWord.value) && !checkRussian(addTranslate.value))
    ) {
      if (checkRussian(addWord.value)) {
        addNewWord(
          activeTheme,
          addTranslate.value.trim().toLowerCase(),
          addWord.value.trim().toLowerCase()
        );
        addWord.value = "";
        addTranslate.value = "";
        addWordHeader.innerHTML = "add a word to the current theme";
      } else {
        addNewWord(
          activeTheme,
          addWord.value.trim().toLowerCase(),
          addTranslate.value.trim().toLowerCase()
        );
        addWord.value = "";
        addTranslate.value = "";
        addWordHeader.innerHTML = "add a word to the current theme";
      }
    } else {
      addWordHeader.innerHTML = "enter in different languages";
      addWord.value = "";
      addTranslate.value = "";
    }
  }
});

//-----------------------ФУНКЦИИ-------------------------------------------------------------------------------------------------------------------------------------------------------------

//очистка формы: "добавить новое слово"
function resetAddButtonForm(addWord, addTranslate, addWordHeader) {
  addWord.value = "";
  addTranslate.value = "";
  addWordHeader.innerHTML = "add a word to the current theme";
}

//проверка русское слово или нет
function checkRussian(text) {
  return /[а-я]/i.test(text);
}

//рендер рандомного числа
function renderRandomWord() {
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

//получаем рандомное число от 0 до макс.длины массива
function random(lengthArray) {
  let max = lengthArray;
  let min = 0;
  return Math.floor(Math.random() * (max - min) + min);
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

//рендер таблицы со словами
function renderTable(words) {
  if (activeTheme) {
    addWordHeader.innerHTML = "add a word to the current theme";
    addButtonForm.disabled = false;
    addWord.disabled = false;
    addTranslate.disabled = false;
    tableBody.innerHTML = "";
    tableHeadItem.innerHTML = "";
    Object.entries(words).map(([key, value]) =>
      tableBody.insertAdjacentHTML(
        "afterbegin",
        `<tr><td>${key}</td><td>${value}</td><td><button class="delete-button btn #ef9a9a red lighten-3" data-delete="${key}">delete</button></td></tr>`
      )
    );
    tableHeadItem.insertAdjacentHTML(
      "afterbegin",
      `<th>English word</th><th>Russian translate</th><th><button class="add-button-table btn modal-trigger" href="#modal2">add</button></th>`
    );
    let deleteWordButtons = document.querySelectorAll(".delete-button");
    deleteWordButtons.forEach((deleteWordButton) =>
      deleteWordButton.addEventListener("click", (e) => {
        let nameWord = e.target.dataset.delete;
        deleteWord(activeTheme, nameWord);
      })
    );
  } else {
    addWordHeader.innerHTML = "choose theme";
  }
  // addButtonTable.addEventListener("click", () => {
  //   if (activeTheme) {
  //     resetAddButtonForm(addWord, addTranslate, addWordHeader);
  //   } else {
  //     resetAddButtonForm(addWord, addTranslate, addWordHeader);
  //     addWordHeader.innerHTML = "choose theme";
  //   }
  // });
}

//очистка инпута
function resetCheckInput(element, placeholder, className) {
  element.value = "";
  element.disabled = false;
  element.classList.remove(className);
  element.setAttribute("placeholder", placeholder);
}

//рендер выпадающего списка тем
function renderTheme(theme) {
  dropDownListInner.insertAdjacentHTML(
    "beforeend",
    `<li class="themes-list-item">
      <a class="theme-link" data-theme="theme-link">${theme}</a><button data-function='${theme}' class="btn delete-theme #ef9a9a red lighten-3">del</button>
    </li>`
  );
  deleteThemeButtons = document.querySelectorAll(".delete-theme"); // кнопка "DEL" удалить тему из выпадающего списка
  deleteThemeButtons.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      deleteTheme(e.target.dataset.function);
      if (e.target.dataset.function === activeTheme) {
        chooseThemeButton.innerHTML = `Choose theme<i class="material-icons right">arrow_drop_down</i>`;
        tableBody.innerHTML = "";
        addButtonForm.disabled = true;
        addWord.disabled = true;
        addTranslate.disabled = true;
        activeTheme = null;
      }
    });
  });
}

//отключает preloader после загрузки тем
onSnapshot(getRefCollection(), (doc) => {
  dropDownListInner.innerHTML = "";
  doc.docs.forEach((value) => renderTheme(value.id));
  preLoader.classList.remove("active");
  preLoader.style.display = "none";
  container.style.display = "block";
});

//получаем ключ объекта, зная значение
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}

//действия при нажатии кнопки check
function check() {
  if (currentLanguage) {
    Object.keys(wordsCopy)[index] === translate.value.toLowerCase()
      ? showIsCorrectResult(translate.value.toLowerCase())
      : showIsWrongResult();
  } else { 
    keyByValue = getKeyByValue(wordsCopy, translate.value.toLowerCase());
    Object.values(wordsCopy)[index] === translate.value.toLowerCase()
      ? showIsCorrectResult(keyByValue)
      : showIsWrongResult();
  }
}

function gameOver() {
  skipButton.disabled = true;
  translate.disabled = true;
  learnWord.innerHTML = "You translated all words correctly";
  resetCheckInput(translate, "enter translate", "correct");
  showTranslateButton.disabled = true;
  checkButton.disabled = true;
  changeLanguageButton.disabled = true;
}

function showIsCorrectResult(key) {
  // translate.disabled = true;
  translate.classList.add("correct");
  translate.setAttribute("placeholder", "CORRECT");
  delete wordsCopy[key];
  translate.value = "";
  translate.classList.remove("error");
  translate.focus();
  if (Object.keys(wordsCopy).length === 0) {
    gameOver();
  } else {
    setTimeout(() => {
      renderRandomWord();
      resetCheckInput(translate, "enter translate", "correct");
    }, 500);
  }
}

function showIsWrongResult() {
  translate.classList.add("error");
  translate.setAttribute("placeholder", "WRONG!");
  translate.value = "";
  setTimeout(() => {
    resetCheckInput(translate, "enter translate", "error");
    translate.focus();
  }, 500);
}
