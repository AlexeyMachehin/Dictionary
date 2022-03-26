import {renderRandomWord, currentLanguage} from "../../../main";
import { translate } from '../enterTranslateInput/enterTranslateInput';

let translateType = document.querySelector(".translate-type__header"); // контейнер с текстом "Russian-English" или "English-Russian"

export const changeLanguageButton = document.querySelector(".change-language-button"); // кнопка меняющая язык "Russian-English" на "English-Russian"

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