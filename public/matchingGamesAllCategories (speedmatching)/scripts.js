const overlayBtns = document.getElementById("categories-btn");
const cards = document.querySelectorAll(".memory-card");
const gameBoard = document.getElementById("gameBoard");
const timeBar = document.getElementById("timeBar");
let totalPairs = 14;
let totalCards = 24;

let x = "";
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
var words = [];
var cardsHtml = "";
var matchesMade = 0;
var timeSet = 60;

$(document).ready(function() {
  // gameBoard.addEventListener("click", function(event) {
  //   if (event.target.classList.contains("memory-card")) {
  //     alert("hello");
  //     flipCard();
  //   }
  // });
  $("#timeRemaining").html(timeSet);
  //resets all values for a new game
  $("#playAgain").click(function() {
    // player1turn = true;
    matchesMade = 0;
    resetBoard();
    // cards.forEach(card => card.classList.remove("flip"));
    $(".memory-card").removeClass("flip");
    $(".memory-card").attr("disabled", false);
    // shuffle();
    // cards.forEach(card => card.addEventListener("click", flipCard));
    $(".overlayMenu").show();
    $(".matching-game-select button").css("background-color", "aqua");
    $("#playBtn").css("background-color", "lightcyan");
    $("#playBtn, #categories-btn button, #time-select button").attr(
      "disabled",
      true
    );
    $("#howManyCards button").attr("disabled", false);
    $("#howManyCards").addClass("currentSelection");
    $(".winnerBackground").hide();
    $("#gameContainer").hide();
  });
  // creates buttons to select the category for the game
  $("#categories-btn").on("click", "button", function() {
    $("#categories-btn button").css("background-color", "aqua");
    $(this).css("background-color", "yellow");
    var chosenCat = $(this).html();
    loadCards(chosenCat);
    // shuffle();
    // $(".memory-game").css("order", randomPosition);
    $("#matching-game-category").html(chosenCat);
    $("#categories-btn button").attr("disabled", true);
    $("#whichCategory").removeClass("currentSelection");
    $("#howMuchTime").addClass("currentSelection");
    // $(".overlayMenu").hide();
    console.log("totalPairs outside function: " + totalPairs);
  });

  $("#cards-amount button").click(function() {
    totalCards = parseInt($(this).attr("data-num"));
    $("#cards-amount button").attr("disabled", true);
    $(this).css("background-color", "yellow");
    $("#categories-btn button").attr("disabled", false);
    $("#time-select button").attr("disabled", false);
    $("#howManyCards").removeClass("currentSelection");
    $("#whichCategory").addClass("currentSelection");
  });

  $("#time-select button").click(function() {
    timeSet = parseInt($(this).html());
    $("#timeRemaining").html(timeSet);

    var animation =
      "MoveBG 5s linear infinite, timer " + timeSet + "s linear 1000ms";
    $("#timeBar").css("animation", "none");

    setTimeout(function() {
      $("#timeBar").css("animation", animation);
    });

    // $(".animateTimer").css("animation-duration", timeSet + 1);
    $("#time-select button").css("background-color", "aqua");
    $(this).css("background-color", "yellow");
    $("#howMuchTime").removeClass("currentSelection");
    $("#playBtn").attr("disabled", false);
    $("#playBtn").css("background-color", "yellow");
  });

  $("#playBtn").click(function() {
    matchesMade = 0;
    resetBoard();
    let timeleft = timeSet;
    $(".timeRemaining").html(timeleft);
    $(".overlayMenu").hide();
    $("#gameContainer").show();

    var countdownTimer = setInterval(function() {
      document.getElementById("timeRemaining").innerHTML = timeleft;
      timeleft -= 1;
      if (matchesMade === totalPairs) {
        $("#winner").html(
          "all the matches!!<br>" +
            matchesMade +
            " matches in " +
            (timeSet - timeleft) +
            " seconds!!<br>Great job!!"
        );
        $(".winnerBackground").show();
        clearInterval(countdownTimer);
      } else if (timeleft < 0) {
        clearInterval(countdownTimer);
        $(".timeRemaining").html("Time's up!");
        $("#winner").html(matchesMade + " matches!!<br>Great job!!");
        $(".winnerBackground").show();
      }
    }, 1000);
    timeBar.classList.add("animateTimer");
  });

  // function shuffle() {
  //   cards.forEach(card => {
  //     let randomPos = Math.floor(Math.random() * 21);
  //     // card.style.order = randomPos;
  //     $(".memory-card").css("order", randomPos);
  //   });
  // }
  //handles the clicks for each card
  $(".memory-game").on("click", ".memory-card", function() {
    flipCard(this);
    // // prevents player from flipping a new card before game is ready
    // if (lockBoard) return;
    // // if same card is clicked twice, prevents a match being made
    // if (this === firstCard) return;
    // this.classList.add("flip");
    // if (!hasFlippedCard) {
    //   // first click
    //   hasFlippedCard = true;
    //   firstCard = this;
    //   return;
    // }
    // // second click
    // secondCard = this;
    // checkForMatch();
    // if (player1turn == true) {
    //   setTimeout(() => {
    //     $("#turn").html(p2arrow);
    //     player1turn = false;
    //   }, 1000);
    // } else {
    //   setTimeout(() => {
    //     $("#turn").html(p1arrow);
    //     player1turn = true;
    //   }, 1000);
    // }
  });

  function flipCard(x) {
    // prevents player from flipping a new card before game is ready
    if (lockBoard) return;
    // if same card is clicked twice, prevents a match being made
    if (x === firstCard) return;

    // x.classList.add("flip");
    $(".back-face", x).hide();

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = x;

      return;
    }

    // second click
    secondCard = x;
    checkForMatch();
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    // firstCard.removeEventListener("click", flipCard);
    // secondCard.removeEventListener("click", flipCard);
    firstCard.disabled = true;
    secondCard.disabled = true;
    matchesMade++;
    $("#matches").html(matchesMade);
    console.log("matches made: " + matchesMade, "total pairs: " + totalPairs);
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      // firstCard.classList.remove("flip");
      // secondCard.classList.remove("flip");
      $(".back-face", firstCard).show();
      $(".back-face", secondCard).show();
      resetBoard();
    }, 500);
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
  }
  // function shuffle() {
  //   cards.forEach(card => {
  //     let randomPos = Math.floor(Math.random() * 21);
  //     card.style.order = randomPos;
  //   });
  // }
  // (function shuffle() {
  //   cards.forEach(card => {
  //     let randomPos = Math.floor(Math.random() * 12);
  //     card.style.order = randomPos;
  //   });
  // })();

  // function shuffle() {
  //   cards.forEach(card => {
  //     let randomPos = Math.floor(Math.random() * 12);
  //     card.style.order = randomPos;
  //   });
  // }
  // shuffle();

  // cards.forEach(card => card.addEventListener("click", flipCard));

  // function hasClass(elem, className) {
  //   return elem.classList.contains(className);
  // }
  // document.addEventListener(
  //   "click",
  //   function(e) {
  //     if (hasClass(e.target, "memory-card")) {
  //       flipCard();
  //       // .bu clicked
  //       // Do your thing
  //     }
  //   },
  //   false
  // );
});
// document.getElementById("gameBoard").addEventListener("click", function(e) {
//   // e.target was the clicked element
//   if (e.target && e.target.matches("div.memory-card")) {
//     flipCard();
//   }
// });

function createBtns() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var keys = Object.keys(response);
      result = "";
      for (var i = 0; i < keys.length; i++) {
        result += `
        <button>${keys[i]}</button>
      `;
      }
      overlayBtns.innerHTML = result;

      // words = JSON.parse(JSON.stringify(response));
    }
  };
  xhttp.open("GET", "../json/words.json", true);
  xhttp.send();
}

function loadCards(cat) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      words = response[cat];
      var wordsLength = 0;
      if (totalCards === 99) {
        wordsLength = words.length;
      } else {
        wordsLength = totalCards / 2;
      }
      console.log(wordsLength, words.length);
      var randArr = [];
      let randomPos = 0;
      for (var i = wordsLength; i > 0; i--) {
        randomPos = Math.floor(Math.random() * wordsLength);
        randArr.push(randomPos);
        randomPos = Math.floor(Math.random() * wordsLength);
        randArr.push(randomPos);
      }
      totalPairs = wordsLength;
      console.log("totalPairs inside function: " + totalPairs);

      var result = "";
      for (var i = 0; i < wordsLength; i++) {
        result += `
        <div class="memory-card" data-framework="${
          words[i].enWord
        }" style="order: ${randArr[i]}">
        <img class="front-face" src="../pictures/${words[i].picture}" alt="${
          words[i].enWord
        }" />
        <img class="back-face" src="img/card-back.png" alt="VA Badge" />
      </div><div class="memory-card" data-framework="${
        words[i].enWord
      }" style="order: ${
          randArr[i + words.length]
        }"><p class="front-face front-word">${
          words[i].enWord
        }</p><img class="back-face" src="img/card-back.png" alt="VA Badge" />
      </div>
      `;
      }
      gameBoard.innerHTML = result;
    }
    // console.log("words = " + response);
  };
  xhttp.open("GET", "../json/words.json", true);
  xhttp.send();
}
// loadCards("fruits");
// console.log("words = " + words);
