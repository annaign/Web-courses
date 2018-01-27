function createQuote(quote, author) {
  this.quote = quote;
  this.author = author;
}

var quotes = [];
quotes.push(new createQuote("A journey of a thousand miles begins with a single step.", "Laozi"));
quotes.push(new createQuote("I recommend you to take care of the minutes: for hours will take care of themselves.", "Lord Chesterfield"));
quotes.push(new createQuote("The man who makes no mistakes does not usually make anything.", "Edward Phelps"));
quotes.push(new createQuote("Music is the universal language of the world.", "Henry Longfellow"));
quotes.push(new createQuote("Either I will find a way, or I will make one.", "Philip Sidney"));
quotes.push(new createQuote("The future belongs to those, who believe in beauty of their dreams.", "Eleanor Roosevelt"));
quotes.push(new createQuote("A small leak will sink a great ship.", "Benjamin Franklin"));
quotes.push(new createQuote("The best way to predict the future is to create it.", "Peter Drucker")); 

function ready(fn) {
  if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading") {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

ready(function () {
  var currentQouteNumber = 0;
  var quoteText = document.getElementById('quote').children[0].children[0];
  var quoteAuthor = document.getElementById('quote').children[0].children[1];

  quoteText.innerHTML = quotes[currentQouteNumber].quote;
  quoteAuthor.innerHTML = "- " + quotes[currentQouteNumber].author;

  var newQuote = document.getElementById('newQuote');
  newQuote.onclick = getQuote;

  var tweet = document.getElementById('tweet');
  tweet.onclick = getTweet;

  function getQuote() {
    var random = Math.floor(Math.random() * quotes.length);
    if (random == currentQouteNumber) {
      random++;
      if (random == quotes.length) {
        random = 0;
      }
    }

    quoteText.innerHTML = quotes[random].quote;
    quoteAuthor.innerHTML = "- " + quotes[random].author;
    currentQouteNumber = random;
  }

  function getTweet() {
    tweet.setAttribute("href", "https://twitter.com/intent/tweet?text=" + '"' +
      encodeURIComponent(quoteText.innerHTML) + '"' + encodeURIComponent(quoteAuthor.innerHTML));
  }
});
