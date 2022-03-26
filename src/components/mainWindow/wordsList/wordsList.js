import {addWord, addTranslate, addButtonForm, addWordHeader} from "../../addNewWordModal/addNewWordModal"

import {activeTheme} from "../../../main";




export let tableBody = document.querySelector(".words-list"); // список слов на текующую тему

let tableHeadItem = document.querySelector(".table-head-item"); // заголовок таблицы со словами на текущую тему и кнопкой "add"

//рендер таблицы со словами
export function renderTable(words) {
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
    
  }