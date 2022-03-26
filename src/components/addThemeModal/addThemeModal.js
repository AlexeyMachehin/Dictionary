import {resetCheckInput} from "../../main"

export const addThemeInput = document.querySelector(".enter-new-theme"); // инпут "enter new theme" "введите название новой темы" внутри формы

const addThemeButtonInForm = document.querySelector(".add-new-theme"); //кнопка "add" "добавить тему в базу" внутри формы

//добавляем новую тему (берем значение из инпута и при нажатии кнопки "add" записываем его в колонку words в firebase)
addThemeButtonInForm.addEventListener("click", () => {
    addNewTheme(addThemeInput.value).then(
      resetCheckInput(addThemeInput, "Add new theme", "empty")
    );
  });
  
