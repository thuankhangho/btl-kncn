var arr = ['']
var form = document.getElementById('kanjiform')
var currentKanji = ''
var myTimeout

form.addEventListener('submit', function(event) {
    event.preventDefault()
    arr = []
    var kanjiinput = document.getElementById('kanjiinput').value
    arr = kanjiinput.split('・')
    document.getElementById("content").innerHTML = currentKanji = arr[Math.floor(Math.random() * (arr.length - 1))];
    console.log(currentKanji)
    mainloop()
    document.getElementById("stop").disabled = false
    document.getElementById("submit").disabled = true
    // move()
})

// var i = 0;
// function move() {
//   if (i == 0) {
//     i = 1;
//     var elem = document.getElementById("myBar");
//     var width = 0;
//     var id = setInterval(frame, 40 - 1);
//     function frame() {
//       if (width >= 100) {
//         clearInterval(id);
//         i = 0;
//       } else {
//         width++;
//         elem.style.width = width + "%";
//         elem.innerHTML = width + "%";
//       }
//     }
//   }
// }

function mainloop() {
  myTimeout = setInterval(async () => {
    // move()
    displayCards();
  }, 500 /*Card time*/ );
}
   
function displayCards() {
  var j = Math.floor(Math.random() * (arr.length - 1));
  document.getElementById("content").innerHTML = arr[j];
  currentKanji = arr[j]
  console.log(currentKanji)
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function pause() {
  console.log("Dừng")
  document.getElementById("content").innerHTML = currentKanji
  document.getElementById("content").style.backgroundColor = "red"
  document.getElementById("content").style.color = "white"
  clearInterval(myTimeout)
  document.getElementById("stop").disabled = !document.getElementById("stop").disabled
  document.getElementById("continue").disabled = !document.getElementById("continue").disabled
}

function resume() {
    console.log("Tiếp tục")
//   document.getElementById("content").innerHTML = currentKanji = arr[Math.floor(Math.random() * (arr.length - 1))];
//   console.log(currentKanji)
  document.getElementById("content").style.backgroundColor = "white"
  document.getElementById("content").style.color = "black"
  if (arr == []) return;
  mainloop()
  document.getElementById("stop").disabled = !document.getElementById("stop").disabled
  document.getElementById("continue").disabled = !document.getElementById("continue").disabled
}