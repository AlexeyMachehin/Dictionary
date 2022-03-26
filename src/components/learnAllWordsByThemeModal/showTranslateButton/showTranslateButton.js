import {currentLanguage, wordsCopy, index} from "../../../main"
import {translate} from "../enterTranslateInput/enterTranslateInput"

export let showTranslateButton = document.querySelector(".show-translate"); // кнопка "show translate" показать перевод (подсказка)

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
  