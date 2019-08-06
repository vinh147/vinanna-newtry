const vocabLists = document.getElementById("vocabLists");
const catBtns = document.getElementById("catBtns");
const word = document.getElementById("vocabWord");
const picture = document.getElementById("picture");
const previousBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
var words = [];
var wordsAll = [];
var myWords = [];
// var fruits = [];
// var colors = [];
// var animals = [];
// var places = [];
// var bodyparts = [];
var wordCount = 0;

// make buttons for each category to add to flashcards
function createBtns() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var keys = Object.keys(response);
      result = "";
      for (var i = 0; i < keys.length; i++) {
        result += `
        <button class="categories" id="${keys[i]}">${keys[i]}</button>
      `;
      }
      catBtns.innerHTML = result;

      console.log(result);
      // words = JSON.parse(JSON.stringify(response));
    }
  };
  xhttp.open("GET", "../json/words.json", true);
  xhttp.send();
}

function getWords() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      var categories = Object.keys(response);
      for (var i = 0; i < categories.length; i++) {
        for (var j = 0; j < response[categories[i]].length; j++) {
          wordsAll.push(response[categories[i]][j]);
        }
      }
      words = response;
      // fruits = response.fruits;
      // colors = response.colors;
      // animals = response.animals;
      // places = response.places;
      // bodyparts = response.bodyparts;
    }
  };
  xhttp.open("GET", "../../json/words.json", true);
  xhttp.send();
}
// getWords();
// console.log(fruits);
// console.log(colors);
// console.log(myWords);

$(document).ready(function() {
  $(".toggle").on("click", function() {
    $(".menu").toggleClass("active");
    $("#flashcardBtns").toggle();
  });
  $(".categories").on("click", function() {
    // $(this).toggleClass("bkorange");
    $(this).css("background-color", "orange");
    //toggle removing and adding words to list
  });

  $("#catBtns").on("click", ".categories", function() {
    //identify button pressed, get array to add category words

    var catBtn = $(this).attr("id");
    // "window[arrayname]" => calls the array of arrayname
    var category = words[catBtn];
    //add the words of the category chosen to word list
    for (var i in category) {
      myWords.push(category[i]);
    }
    // var btn = document.getElementById(catBtn);
    $("#" + catBtn).attr("disabled", true);
    $("#" + catBtn).css("background-color", "orange");
    $("#mixBtn").attr("disabled", false);
    wordCount = 0;
    console.log(category);
  });

  // $("#fruits").on("click", function() {
  //   //add/remove fruits to word list
  //   for (var i = 0; i < fruits.length; i++) {
  //     myWords.push(fruits[i]);
  //   }
  // });
  $("#mixBtn").on("click", function() {
    var myWordsTemp = [];
    // creating a copy to of myWords to put back in random order (i.e. mixing)
    for (var i in myWords) {
      myWordsTemp.push(myWords[i]);
    }
    myWords = [];
    var y = myWordsTemp.length;
    for (var j = 0; j < y; j++) {
      var x = Math.floor(Math.random() * myWordsTemp.length);
      myWords.push(myWordsTemp.splice(x, 1)[0]);
    }
    myWordsTemp = myWords;
    wordCount = 0;
    //get a random number from 0 to myWords.length;
    // var x = Math.floor((Math.random() * myWords.length) + 1);
    // $();
    //random number generator to mix words
    console.log(myWords, words);
  });

  // function mixWords {}

  $("#allBtn").on("click", function() {
    // myWords = [];
    myWords = wordsAll;
    $(".categories").css("background-color", "orange");
    $(".categories").attr("disabled", true);
    $("#mixBtn").attr("disabled", false);
    $("#allBtn").attr("disabled", true);
    // mixWords();
    wordCount = 0;

    console.log(myWords, words);
  });

  $("#clrBtn").on("click", function() {
    myWords = [];
    $(".categories").css("background-color", "#fff");
    $(".categories").attr("disabled", false);
    $("#mixBtn").attr("disabled", true);
    $("#allBtn").attr("disabled", false);
    wordCount = 0;
    console.log(myWords, words);
    //random number generator to mix words
  });
  $("#showEn").on("click", function() {
    $("#enWord").toggle();
  });
  $("#showKr").on("click", function() {
    $("#krWord").toggle();
  });

  $("#next").click(function() {
    if (wordCount === myWords.length) {
      wordCount = 0;
    }
    $("#picture").html(
      "<img src='../../pictures/" +
        myWords[wordCount].picture +
        "' alt='word' />"
    );
    // $("#enWord").hide(); //this hides the word automatically for the next word
    // $("#krWord").hide(); //this hides the word automatically for the next word
    $("#enWord").html(myWords[wordCount].enWord);
    $("#krWord").html(myWords[wordCount].krWord);
    wordCount++;
  });
  $("#previous").click(function() {
    if (wordCount === 0) {
      wordCount = myWords.length;
    }
    $("#picture").html(
      "<img src='../../pictures/" +
        myWords[wordCount - 1].picture +
        "' alt='word' />"
    );
    // $("#enWord").hide();
    // $("#krWord").hide();
    $("#enWord").html(myWords[wordCount - 1].enWord);
    $("#krWord").html(myWords[wordCount - 1].krWord);
    wordCount--;
  });
});
