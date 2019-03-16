"use strict";

document.addEventListener("DOMContentLoaded", function() {
  var btnOpen = document.querySelector(".mainNav__btn._open");
  var btnClose = document.querySelector(".mainNav__btn._close");
  var mainNav = document.querySelector(".mainNav");
  var no_jsArr = document.querySelectorAll(".no-js");

  for (var i = 0; i < no_jsArr.length; i++) {
    no_jsArr[i].classList.remove("no-js");
  }

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

  var imgEditors = document.querySelectorAll(".postForm__editor");

  for (var i = 0; i < imgEditors.length; i++) {
    imgEditors[i].addEventListener("click", function(evt) {
      evt.preventDefault();

      if (!this.classList.contains("_active")) {
        document.querySelector(".postForm__editor._active").classList.remove("_active");
        this.classList.add("_active");
      }
    });
  }
});
