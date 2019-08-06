const listButton = document.querySelectorAll('.listBtn');
var words = [];
console.log('The sections js file is connected');
// make buttons for each category to create a vocabList table in Learn Section
function createBtns() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var keys = Object.keys(response);
      result = '';
      for (var i = 0; i < keys.length; i++) {
        result += `
        <button class="listBtn" id="${keys[i]}">${keys[i]}</button>
      `;
      }
      vocabLists.innerHTML = result;

      // console.log(keyOut);
      // words = JSON.parse(JSON.stringify(response));
    }
  };
  xhttp.open('GET', '../json/words.json', true);
  xhttp.send();
}

function getWords() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(xhttp.responseText);
      words = response;
    }
  };
  xhttp.open('GET', '../json/words.json', true);
  xhttp.send();
}
$(document).ready(function() {
  // console.log(fruits);
  function createList(category, catNS, catArr) {
    // var result = "";
    var result = `
    <div id="${catNS}List">
     <h1 class="banner">${category}</h1>
     <span
      class="closeBox"
      onclick="document.getElementById('${catNS}List').style.display='none'"
     >
      <i class="fas fa-window-close"></i>
     </span>
     <div class="vocabList" id="${catNS}Words">`;
    for (var i = 0; i < catArr.length; i++) {
      result += `
  <div>
          <img class="wordImg" src="../pictures/${catArr[i].picture}" alt="${
        catArr[i].enWord
      }" />
        </div>
        <div class="wordEng">${catArr[i].enWord}</div>
        <div class="wordKr">${catArr[i].krWord}</div>
  `;
    }
    result += '</div></div>';
    return result;
  }

  $('#vocabLists').on('click', '.listBtn', function() {
    var category = $(this).attr('id'); //ex: "fruits" id of the button
    var categoryNS = category.replace(/\s/g, '');
    var catName = $(this).html(); //ex: "fruits" word that's on button
    var catArr = words[category]; //ex: array of the "fruits"
    listHtml = createList(category, categoryNS, catArr);
    // $("#" + category + "Words").html(listHtml);
    // $("#" + category + "List").show();
    $('.listContainer').html(listHtml);
    $('.banner').css(
      'background-image',
      "url('../pictures/" + categoryNS + ".jpg')"
    );
    if (category.length > 12) {
      $('.banner').addClass('bannerLong');
    }
    $('#' + category + 'List').show;
    window.scrollTo(0, 0);
    console.log(category, categoryNS);
  });
});

//shows the correct lesson window when the button is clicked
$('#lessons').on('click', 'button', function() {
  var lesson = $(this).html();
  lesson = lesson.replace(/\s+/g, '');
  $('.banner').css('background-image', "url('../pictures/" + lesson + ".jpg')");
  $('#' + lesson).show();
  window.scrollTo(0, 0);
});
