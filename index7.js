const timerDisplay = document.getElementById("timer");
const studyTime = 25 * 60; 
const breakTime = 5 * 60; 

let interval = null;
let currentTime = 0;
let isBreak = false;
let isPaused = false;

const updateTimerDisplay = () => {
    let totalTime;
    if (isBreak) {
        totalTime = breakTime;
    } else {
        totalTime = studyTime;
    }
    
    const remainingTime = totalTime - currentTime;
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    
    let minutesStr;
    if (minutes < 10) {
        minutesStr = "0" + minutes;
    } else {
        minutesStr = minutes;
    }
    
    let secondsStr;
    if (seconds < 10) {
        secondsStr = "0" + seconds;
    } else {
        secondsStr = seconds;
    }
    
    timerDisplay.innerText = `${minutesStr}:${secondsStr}`;
};

const startPomodoro = () => {
    if (isPaused) {
        isPaused = false;
    } else {
        currentTime = 0;
    }
    
    const tick = () => {
        let totalTime;
        if (isBreak) {
            totalTime = breakTime;
        } else {
            totalTime = studyTime;
        }
        
        if (currentTime < totalTime) {
            updateTimerDisplay();
            currentTime++;
        } else {
            clearInterval(interval);
            if (isBreak) {
                alert("Break time is over! Back to work!");
                isBreak = false;
            } else {
                alert("Study time is over! Take a 5-minute break.");
                isBreak = true;
            }
            currentTime = 0;
            startPomodoro(); 
        }
    };
    
    updateTimerDisplay(); 
    tick(); 
    interval = setInterval(tick, 1000);
};

const pause = () => {
    clearInterval(interval);
    isPaused = true;
};