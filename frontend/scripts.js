async function getHistoricalData() {
    response = await fetch('http://192.168.0.126:5000/historicaldata')
    data = await response.json()
    return data
}
async function getCurrentData() {
    response = await fetch('http://192.168.0.126:5000/currentdata')
    data = await response.json()
    return data
}

(async function () {
    const second = 1,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    let data = await getCurrentData(),
        now = new Date().getTime(),
        newnow = data.start_time_epoch,
        endtime = newnow + (data.work_time + data.break_time) * data.cycles,
        time = endtime,
        x = setInterval(() => {
            now = new Date().getTime();
            time = endtime - now / 1000;
            document.getElementById("hours").innerText = Math.floor((time % (day)) / (hour)),
            document.getElementById("minutes").innerText = Math.floor((time % (hour)) / (minute)),
            document.getElementById("seconds").innerText = Math.floor((time % (minute)) / second);

            document.getElementById("headline").innerText = "";
            if (time % (data.work_time + data.break_time) > data.break_time) {
                document.getElementById("onoroff").innerText = "Keep Working";
            }
            else {
                document.getElementById("onoroff").innerText = "Take A Break";
            }

            if (time < 0) {
                let headline = document.getElementById("headline"),
                    countdown = document.getElementById("countdown"),
                    content = document.getElementById("content");
                document.getElementById("hours").innerText = 0,
                document.getElementById("minutes").innerText = 0,
                document.getElementById("seconds").innerText = 0;
                headline.innerText = "You are done!!";
                document.getElementById("onoroff").innerText = "";
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
    for (i = 0; i < Math.min(sessions.length,5); i++) {
        table_row = document.createElement('tr');
        var date = document.createElement('td');
        date.className = "stat";
        date.innerHTML = data[i]["date"];
        var start = document.createElement('td');
        start.className = "stat";
        start.innerHTML = data[i]["start_time"].slice(0,data[i]["start_time"].length-7);
        var breaks = document.createElement('td');
        breaks.className = "stat";
        breaks.innerHTML = data[i]["break_time"];
        var cycles = document.createElement('td');
        cycles.className = "stat";
        cycles.innerHTML = data[i]["cycles"];
        var work = document.createElement("td");
        work.className = "stat";
        work.innerHTML = data[i]["work_time"];
        table_row.appendChild(date);
        table_row.appendChild(start);
        table_row.appendChild(work);
        table_row.appendChild(breaks);
        table_row.appendChild(cycles);
        document.getElementById("sessions").appendChild(table_row);
    }
}
getHistoricalData().then((data) => {
    showHistory(data), showTotals(data)
});

function showTotals(data) {
    let sessions = Object.keys(data)
    var worked = 0;
    var rested = 0;
    for (i = 0; i < sessions.length; i++) {
        worked = worked + data[i]["work_time"] * data[i]["cycles"]
        rested = rested + data[i]["break_time"] * data[i]["cycles"]
    }
    document.getElementById("worked").innerText = worked;
    document.getElementById("rested").innerText = rested;
}