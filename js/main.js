var myString = "Place your string data here, and as much as you like.\n";
var myArray = myString.split("");
var highlight = 1;
var highlightTimer = 0;
var loopTimer;
function frameLooper() {
  var output = document.getElementById("myTypingText");
  if (highlight ==1) {
    var textNode = output.firstChild;
    textNode.data = textNode.data.slice(0, -1);
  }

  if(myArray.length > 0) {
    output.innerHTML += myArray.shift() + myArray.shift();
    buffer = [];
  } else {
    //clearTimeout(loopTimer);
    //return false;
  }

  highlightTimer++;
  if (highlightTimer >= 10) {
    if (highlight == 0)
      highlight = 1;
    else
      highlight = 0;
    highlightTimer=0;
  }
  if (highlight)
    output.innerHTML += "_";

  loopTimer = setTimeout('frameLooper()',30);
}

//"types" the myString to the screen
frameLooper();

function navigateAbout() {
  window.location.href = "file:///Users/Adam/Desktop/adams%20site/index.html";
}
