
let display = document.querySelector("#time")
let work = document.querySelector("#work")
let breaktime = document.querySelector("#break")
let playstate = false;
let breakstate = false;

work.addEventListener("click", (w) => {
    if (!playstate) {
        display.innerHTML = work.value + ":00"
    }
})


let play = document.querySelector("#play")
let state = false;
let intervalId = 0

play.addEventListener("click", () => {
    playstate = true
    if (state) {
        play.innerHTML = "&#9654;"
        state = false
        clearInterval(intervalId)
    } else {
        play.innerHTML = "<b>&#8545;</b>"
        state = true;
        intervalId = setInterval(timerStart, 1000)
    }
})

let stop = document.querySelector("#stop")

stop.addEventListener("click", () => {
    clearInterval(intervalId)
    display.innerHTML = work.value + ":00"
    play.innerHTML = "&#9654;"
    playstate = false
    state = false
})

let reset = document.querySelector("#reset")

reset.addEventListener("click", () => {
    clearInterval(intervalId)
    work.value = "25"
    breaktime.value = "5"
    display.innerHTML = work.value + ":00"
    play.innerHTML = "&#9654;"
    playstate = false;
    breakstate = false;
    state = false;
    intervalId = 0
})

let workBreakSwitch = false;

let timerStart = function() {
    let time = display.textContent

    let timeArray = time.split(":")
    let m = timeArray[0]
    let s = timeArray[1]

    if (+m === 0 && +s === 0 && !breakstate) {
        workBreakSwitch = true;
        display.innerHTML = breaktime.value + ":00"
        breakstate = true;
    } else if (+m === 0 && +s === 0 && breakstate) {
        workBreakSwitch = true;
        display.innerHTML = work.value + ":00"
        breakstate = false;
    } else if (+s === 0) {
        m = +m - 1
        s = "59"
    } else {
        s = +s - 1
    }

    if (+s < 10) {
        s = "0" + s
    }

    if (workBreakSwitch) {
        workBreakSwitch = false;
    } else {
        display.innerHTML = m + ":" + s
    }
}