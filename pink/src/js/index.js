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

  var btnNext = document.querySelector("button._next");
  var btnPrev = document.querySelector("button._prev");

  if (btnNext) {
    btnNext.addEventListener("click", function(evt) {
      evt.preventDefault();
      var slideCurrent = document.querySelector(".comments__item._active");
      if (slideCurrent.nextElementSibling) {
        slideCurrent.nextElementSibling.classList.add("_active");
        slideCurrent.classList.remove("_active");
      }
    });
  }

  if (btnPrev) {
    btnPrev.addEventListener("click", function(evt) {
      evt.preventDefault();
      var slideCurrent = document.querySelector(".comments__item._active");
      if (slideCurrent.previousElementSibling) {
        slideCurrent.previousElementSibling.classList.add("_active");
        slideCurrent.classList.remove("_active");
      }
    });
  }

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

  var subscriptionTable = document.querySelector(".subscription__table");
  var subscriptionToggles = document.querySelector(".subscription__toggles");
  var subscriptionBtnLeft = document.getElementById("main_1");
  var subscriptionBtnMiddle = document.getElementById("main_2");
  var subscriptionBtnRight = document.getElementById("main_3");

  subscriptionBtnLeft.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (evt.currentTarget.classList.contains("_toggleActive")) {
      return;
    }

    var tmpBtnActive = subscriptionToggles.querySelector("._toggleActive");
    tmpBtnActive.classList.add("_toggle");
    tmpBtnActive.classList.remove("_toggleActive");

    evt.currentTarget.classList.remove("_toggle");
    evt.currentTarget.classList.add("_toggleActive");

    subscriptionTable.classList.add("_left");
    if (subscriptionTable.classList.contains("_middle")) {
      subscriptionTable.classList.remove("_middle");
    } else if (subscriptionTable.classList.contains("_right")) {
      subscriptionTable.classList.remove("_right");
    }
  });

  subscriptionBtnMiddle.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (evt.currentTarget.classList.contains("_toggleActive")) {
      return;
    }

    var tmpBtnActive = subscriptionToggles.querySelector("._toggleActive");
    tmpBtnActive.classList.add("_toggle");
    tmpBtnActive.classList.remove("_toggleActive");

    evt.currentTarget.classList.remove("_toggle");
    evt.currentTarget.classList.add("_toggleActive");

    subscriptionTable.classList.add("_middle");
    if (subscriptionTable.classList.contains("_left")) {
      subscriptionTable.classList.remove("_left");
    } else if (subscriptionTable.classList.contains("_right")) {
      subscriptionTable.classList.remove("_right");
    }
  });

  subscriptionBtnRight.addEventListener("click", function(evt) {
    evt.preventDefault();

    if (evt.currentTarget.classList.contains("_toggleActive")) {
      return;
    }

    var tmpBtnActive = subscriptionToggles.querySelector("._toggleActive");
    tmpBtnActive.classList.add("_toggle");
    tmpBtnActive.classList.remove("_toggleActive");

    evt.currentTarget.classList.remove("_toggle");
    evt.currentTarget.classList.add("_toggleActive");

    subscriptionTable.classList.add("_right");
    if (subscriptionTable.classList.contains("_middle")) {
      subscriptionTable.classList.remove("_middle");
    } else if (subscriptionTable.classList.contains("_left")) {
      subscriptionTable.classList.remove("_left");
    }
  });
});
