function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function ajaxRequest(url, fn) {
  var httpRequest = new XMLHttpRequest();

  if (!httpRequest) {
    alert('Giving up :( Cannot create an XMLHTTP instance');
    return false;
  }

  httpRequest.open('GET', url, true);

  httpRequest.onreadystatechange = function () {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        if (httpRequest.status === 200) {
          fn(httpRequest.responseText);
        } else {
          alert(httpRequest.status + ': ' + httpRequest.statusText);
        }
      }
    } catch (e) {
      alert('Caught Exception: ' + e.description);
    }
  };

  httpRequest.send();
}

function getWikiData(wikiResponce) {
  var wikiData = JSON.parse(wikiResponce).query.pages;

  var tempHtml1, tempHtml2, tempHtml3;
  var htmlWiki = [];

  for (element in wikiData) {
    tempHtml1 = '<div class="blockData"><a href="https://en.wikipedia.org/?title=' + wikiData[element].title + '" target="_blank" rel="noopener noreferrer"><div class="imgWiki">';

    tempHtml2 = '';
    if (wikiData[element].thumbnail) {
      tempHtml2 = '<img src="' + wikiData[element].thumbnail.source + '" alt="' + wikiData[element].title + '">';
    }

    tempHtml3 = '</div><div class="textWiki"><h2>' +
      wikiData[element].title + '</h2><br><p>' + wikiData[element].extract +
      '</p></div><div class="clearfix"></div></a></div>';

    htmlWiki.push(tempHtml1 + tempHtml2 + tempHtml3);
  }

  var blocks = document.getElementById('dataWiki');

  blocks.style.display = "block";
  blocks.innerHTML = htmlWiki.join('');
}

function wikiRequest() {
  var api = "https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts%7Cpageimages&generator=search&utf8=1&exsentences=2&exlimit=20&exintro=1&explaintext=1&gsrlimit=10&pithumbsize=150&origin=*&gsrsearch=";

  var searchText = document.forms['formWiki'].elements['formWikiText'].value;

  ajaxRequest(api + searchText, getWikiData);
}

function openSearchBox() {
  document.getElementById('bntRandom').style.display = "none";
  document.getElementById("searchForm").style.display = "block";
  document.forms['formWiki'].elements['formWikiText'].focus();
}

function closeSearchBox() {
  document.getElementById('bntRandom').style.display = "inline-block";
  document.getElementById("searchForm").style.display = "none";
  document.getElementById('dataWiki').style.display = "none";
}

ready(function () {
  var form = document.getElementById("wiki");

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    wikiRequest();
  });

});
