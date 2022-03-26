import { onSnapshot } from "firebase/firestore";
import { getRefCollection } from '../../firebase/firebase'
import {
  renderTheme,
  dropDownListInner,
} from "../../components/mainWindow/header/dropDownList";

const preLoader = document.querySelector(".container-preloader"); // показывается preloader до тех пор, пока не загрузятся темы
export const container = document.querySelector(".container"); // основной контейнер с программой

//отключает preloader после загрузки тем
onSnapshot(getRefCollection(), (doc) => {
  dropDownListInner.innerHTML = "";
  doc.docs.forEach((value) => renderTheme(value.id));
  preLoader.classList.remove("active");
  preLoader.style.display = "none";
  container.style.display = "block";
});