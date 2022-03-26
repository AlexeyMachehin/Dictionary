import { renderRandomWord, wordsCopy, resetCheckInput } from "../../../main";

import { checkButton } from "../checkButton/checkButton";

import { learnWord } from "../learningWord/learningWord";

import { translate } from "../enterTranslateInput/enterTranslateInput";

export const skipButton = document.querySelector(".next__word"); // кнопка "skip" "следующее слово" пропускающая слово

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
