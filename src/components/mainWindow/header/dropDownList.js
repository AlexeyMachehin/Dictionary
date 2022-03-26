import {addWord, addTranslate, addButtonForm} from "../../addNewWordModal/addNewWordModal";

import {activeTheme} from "../../../main";

import {tableBody} from  "../../mainWindow/wordsList/wordsList";

export const chooseThemeButton = document.querySelector("[data-target='dropdown1']"); //меняющееся название темы у кнопки выпадающего меню

export let dropDownList = document.querySelector(".dropdown-content"); //выпадающий список с темами

export let dropDownListInner = document.querySelector(".dropdown-content__inner"); //внутренний список с темами

let deleteThemeButtons; // кнопка "DEL" удалить тему из выпадающего списка

// let addThemeButtonInList = document.querySelector(".add-theme"); //кнопка "add theme" внутри выпадающего списка // не используется


  //рендер выпадающего списка тем
  export function renderTheme(theme) {
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