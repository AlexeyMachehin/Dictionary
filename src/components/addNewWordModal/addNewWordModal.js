import {getActiveTheme} from "../mainWindow/header/menu"

export const addWord = document.querySelector(".enter-word"); // инпут "enter word" "добавьте новое слово" внутри формы

export const addTranslate = document.querySelector(".enter-translate"); // инпут с переводом "enter translate" "введите перевод" внутри формы

 export const addButtonForm = document.querySelector(".add-button-form"); //кнопка "add" "добавить слово в базу" внутри формы

export const addWordHeader = document.querySelector(".add-word_header"); //заголовок "add a word to the current topic" внутри формы





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
            getActiveTheme(),
            addTranslate.value.trim().toLowerCase(),
            addWord.value.trim().toLowerCase()
          );
          addWord.value = "";
          addTranslate.value = "";
          addWordHeader.innerHTML = "add a word to the current theme";
        } else {
          addNewWord(
            getActiveTheme(),
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

  //проверка русское слово или нет
function checkRussian(text) {
  return /[а-я]/i.test(text);
}
