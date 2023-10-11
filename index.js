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
  }, 4000 /*Card time*/ );
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
  alert("Dừng")
  document.getElementById("content").innerHTML = currentKanji
  clearInterval(myTimeout)
}

function resume() {
  document.getElementById("content").innerHTML = currentKanji = arr[Math.floor(Math.random() * (arr.length - 1))];
  console.log(currentKanji)
  mainloop()
}