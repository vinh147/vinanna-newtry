const overlayBtns = document.getElementById("categories-btn");
const cards = document.querySelectorAll(".memory-card");
const gameBoard = document.getElementById("gameBoard");
let totalPairs = 14;

let x = "";
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let player1turn = true;
const p1arrow = "<i class='fas fa-arrow-alt-circle-left'></i>";
const p2arrow = "<i class='fas fa-arrow-alt-circle-right'></i>";
let p1pts = 0;
let p2pts = 0;
var words = [];
var cardsHtml = "";
var matchesMade = 0;
let player1name = "";
let player2name = "";

$(document).ready(function() {
  // gameBoard.addEventListener("click", function(event) {
  //   if (event.target.classList.contains("memory-card")) {
  //     alert("hello");
  //     flipCard();
  //   }
  // });

  //resets all values for a new game
  $("#playAgain").click(function() {
    // player1turn = true;
    p1pts = 0;
    p2pts = 0;
    $(".p1pts").html(p1pts);
    $(".p2pts").html(p2pts);
    matchesMade = 0;
    resetBoard();
    // cards.forEach(card => card.classList.remove("flip"));
    $(".memory-card").removeClass("flip");
    $(".memory-card").attr("disabled", false);
    // shuffle();
    // cards.forEach(card => card.addEventListener("click", flipCard));
    $(".overlayMenu").show();
    $("#categories-btn button").css("background-color", "aqua");
    $("#playBtn").attr("disabled", true);
    $("#playBtn").css("background-color", "lightcyan");
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
    $("#playBtn").attr("disabled", false);
    $("#playBtn").css("background-color", "yellow");
    // $(".overlayMenu").hide();
    console.log("totalPairs outside function: " + totalPairs);
  });
  $("#playBtn").click(function() {
    p1pts = 0;
    p2pts = 0;
    $(".p1pts").html(p1pts);
    $(".p2pts").html(p2pts);
    matchesMade = 0;
    resetBoard();
    $(".overlayMenu").hide();
    $("#gameContainer").show();
    player1name = prompt("What's Player1's name?");
    player2name = prompt("What's Player2's name?");
    $("#name1").html(player1name);
    $("#name2").html(player2name);
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

    x.classList.add("flip");

    if (!hasFlippedCard) {
      // first click
      hasFlippedCard = true;
      firstCard = x;

      return;
    }

    // second click
    secondCard = x;
    checkForMatch();

    if (player1turn == true) {
      setTimeout(() => {
        $("#turn").html(p2arrow);
        player1turn = false;
      }, 700);
    } else {
      setTimeout(() => {
        $("#turn").html(p1arrow);
        player1turn = true;
      }, 700);
    }
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
    console.log("matches made: " + matchesMade, "total pairs: " + totalPairs);
    if (player1turn === true) {
      p1pts++;
      $(".p1pts").html(p1pts);
    } else {
      p2pts++;
      $(".p2pts").html(p2pts);
    }
    if (matchesMade === totalPairs) {
      if (p1pts > p2pts) {
        $("#winner").html(player1name + "!!");
        // player1turn = true;
        // $("#turn").html(p1arrow);
      } else if (p2pts > p1pts) {
        $("#winner").html(player2name + "!!");
        // player1turn = false;
        // $("#turn").html(p2arrow);
      } else {
        $("#winner").html("no one, it's a tie.");
        // player1turn = false;
        // $("#turn").html(p2arrow);
      }
      $(".winnerBackground").show();
    }
    resetBoard();
  }

  function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 700);
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
//call the function to create the buttons
createBtns();

function loadCards(cat) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      words = response[cat];
      var wordsLength = words.length;
      var randArr = [];
      let randomPos = 0;
      for (var i = wordsLength; i > 0; i--) {
        randomPos = Math.floor(Math.random() * wordsLength);
        randArr.push(randomPos);
        randomPos = Math.floor(Math.random() * wordsLength);
        randArr.push(randomPos);
      }
      totalPairs = words.length;
      console.log("totalPairs inside function: " + totalPairs);

      var result = "";
      for (var i = 0; i < words.length; i++) {
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
