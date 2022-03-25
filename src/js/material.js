import "materialize-css/dist/css/materialize.min.css";
import "materialize-css/dist/js/materialize.min";
import "materialize-css/dist/js/materialize";

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems);
});

