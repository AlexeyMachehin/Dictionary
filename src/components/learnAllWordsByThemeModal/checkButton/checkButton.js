import {
  renderRandomWord,
  keyByValue,
  currentLanguage,
  wordsCopy,
  index,
  resetCheckInput,
} from "../../../main";
import { translate } from '../enterTranslateInput/enterTranslateInput';
import { skipButton } from '../skipButton/skipButton';
import { learnWord } from '../learningWord/learningWord';
import { showTranslateButton } from '../showTranslateButton/showTranslateButton';
import { changeLanguageButton } from '../changeLanguageButton/changeLanguageButton';

export const checkButton = document.querySelector(".check"); // кнопка "check" проверяющая слово

const formLearn = document.querySelector(".learn"); // форма "учить слова на текущую тему"

//проверка введенного перевода при нажатии кнопки "check", вывод "CORRECT", "WRONG!", "You translated all words correctly", очистка формы, рендер рандомного слова
checkButton.addEventListener("click", (e) => check());

// теже функции что у checkButton, только при нажатии ENTER
formLearn.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    check();
  }
});

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

//получаем ключ объекта, зная значение
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
