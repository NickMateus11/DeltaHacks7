async function getData() {
    response = await fetch('http://192.168.0.126:5000/historicaldata')
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
        x = setInterval(function () {

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
    close[i].onclick = function () {
        var div = this.parentElement;
        div.style.display = "none";
    }
}

var list = document.querySelector('ul');
list.addEventListener('click', function (ev) {
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
        close[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}

function showHistory(data) {
    let sessions = Object.keys(data)
    for (i = 0; i < sessions.length; i++) {
        var ul = document.createElement('ul');
        var date = document.createTextNode(data[i]["date"]);
        var li = document.createElement('li');
        var start = document.createTextNode("Start Time:" + data[i]["start_time"]);
        var breaks = document.createTextNode("Break Time:" + data[i]["break_time"]);
        var cycles = document.createTextNode("Cycles:" + data[i]["cycles"]);
        ul.appendChild(li.appendChild(date));
        ul.appendChild(li.appendChild(start));
        ul.appendChild(li.appendChild(breaks));
        ul.appendChild(li.appendChild(cycles));
        document.getElementById("sessions").appendChild(ul);
    }
}
getData().then((data) => {
    showHistory(data)
});