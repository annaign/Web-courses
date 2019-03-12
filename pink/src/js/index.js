"use strict";

document.addEventListener("DOMContentLoaded", function() {
  var btnOpen = document.querySelector(".mainNav__btn._open");
  var btnClose = document.querySelector(".mainNav__btn._close");
  var mainNav = document.querySelector(".mainNav");
  var no_jsArr = document.querySelector(".no-js");

  no_jsArr.classList.remove("no-js");
  btnOpen.classList.add("_active");
  mainNav.classList.remove("_open");

  btnOpen.addEventListener("click", function(evt) {
    evt.preventDefault();
    btnOpen.classList.remove("_active");
    btnClose.classList.add("_active");
    mainNav.classList.add("_open");
  });

  btnClose.addEventListener("click", function(evt) {
    evt.preventDefault();
    btnClose.classList.remove("_active");
    btnOpen.classList.add("_active");
    mainNav.classList.remove("_open");
  });
});
