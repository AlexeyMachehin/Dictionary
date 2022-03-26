import { renderRandomWord, wordsCopy } from "../../../main";

import { checkButton } from "../../learnAllWordsByThemeModal/checkButton/checkButton";

import { translate } from "../../learnAllWordsByThemeModal/enterTranslateInput/enterTranslateInput";

import { learnWord } from "../../learnAllWordsByThemeModal/learningWord/learningWord";

import { showTranslateButton } from "../../learnAllWordsByThemeModal/showTranslateButton/showTranslateButton";

import { skipButton } from "../../learnAllWordsByThemeModal/skipButton/skipButton";

import {
  chooseThemeButton,
} from "../../mainWindow/header/dropDownList";

let activeTheme = null; //выбранная тема

const menuTheme = document.querySelector(".functions"); // контейнер с кнопками "choose theme", "learn all words by theme"

const LearnWordsByThemeButton = document.querySelector(".learn-button"); //кнопка "Learn Words ByTheme" учить слова по текущей теме

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

export function isActiveTheme() {
  return activeTheme ? true : false;
}

export function getActiveTheme() {
  return activeTheme;
}