async function getData() {
response = await fetch('http://192.168.0.127:5000/currentdata')
data = await response.json()
return data
}

(function () {
const second = 1000,
minute = second * 60,
hour = minute * 60,
day = hour * 24;

let endtime = "March 7, 2021 00:00:00",
countDown = new Date(endtime).getTime(),
x = setInterval(function() {    

let now = new Date().getTime(),
distance = countDown - now;
document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

if (distance < 0) {
let headline = document.getElementById("headline"),
countdown = document.getElementById("countdown"),
content = document.getElementById("content");

headline.innerText = "You are done!!";
countdown.style.display = "none";
content.style.display = "block";

clearInterval(x);
}
}, 0)
}());








var myNodelist = document.getElementsByClassName("close");
var i;
for (i = 0; i < myNodelist.length; i++) {
var span = document.createElement("SPAN");
var txt = document.createTextNode("\u00D7");
span.className = "close";
span.appendChild(txt);
myNodelist[i].appendChild(span);
}

var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
close[i].onclick = function() {
var div = this.parentElement;
div.style.display = "none";
}
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
if (ev.target.tagName === 'LI') {
ev.target.classList.toggle('checked');
}
}, false);

function newElement() {
var li = document.createElement("li");
var inputValue = document.getElementById("input").value;
var t = document.createTextNode(inputValue);
li.appendChild(t);
if (inputValue === '') {
alert("You must write something!");
} else {
document.getElementById("newAct").appendChild(li);
}
document.getElementById("input").value = "";

var span = document.createElement("SPAN");
var txt = document.createTextNode("\u00D7");
span.className = "close";
span.appendChild(txt);
li.appendChild(span);

for (i = 0; i < close.length; i++) {
close[i].onclick = function() {
var div = this.parentElement;
div.style.display = "none";
}
}
}

function newHistory(){
var history_list = document.getElementById('history');
var entry = document.createElement('li');
entry.appendChild(document.createTextNode())
}