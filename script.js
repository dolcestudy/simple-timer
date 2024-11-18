let startButton = document.getElementById("start-button");
let pauseButton = document.getElementById("pause-button");
let resumeButton = document.getElementById("resume-button");
let resetButton = document.getElementById("reset-button");

let timerInterval;
let timeRemaining = 0;
let isRunning = false;
let isPaused = false;
let totalTime = 0; // 初期のタイマー設定時間（再開時に使用）

// 円の周長
const circle = document.querySelector(".circle-svg circle");
const circumference = circle.getTotalLength();

// 初期設定で円の長さを設定
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;  // 初期状態では円を完全に表示

// 通知の許可を求める関数
function requestNotificationPermission() {
    if (Notification.permission !== "granted") {
        Notification.requestPermission().then(permission => {
            if (permission !== "granted") {
                console.log("通知の許可が必要です");
            }
        });
    }
}

// 通知を表示する関数
function showNotification() {
    if (Notification.permission === "granted") {
        new Notification("タイマー終了", {
            body: "タイマーが終了しました！",
            icon: "https://example.com/icon.png"  // 任意のアイコンURL
        });
    }
}

// タイマーを開始する関数
function startTimer() {
    let hours = parseInt(document.getElementById("hours").value) || 0;
    let minutes = parseInt(document.getElementById("minutes").value) || 0;
    let seconds = parseInt(document.getElementById("seconds").value) || 0;

    timeRemaining = (hours * 3600) + (minutes * 60) + seconds; // 時間を秒に変換して合計
    totalTime = timeRemaining; // 初期のタイマー設定時間を保存

    if (timeRemaining <= 0) return; // 0以下の時間でスタートしない

    isRunning = true;
    isPaused = false;
    updateButtonVisibility();
    updateTimerDisplay();

    // タイマーのカウントを開始
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();

            // 残り時間に応じて円を反時計回りに消す
            const offset = (timeRemaining / totalTime) * circumference;
            circle.style.strokeDashoffset = offset;
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            updateButtonVisibility();

            // タイマーが0になったら通知を表示
            showNotification();
        }
    }, 1000);
}

// タイマーを一時停止する関数
function pauseTimer() {
    clearInterval(timerInterval); // 現在のタイマーを停止
    isRunning = false;
    isPaused = true;
    updateButtonVisibility();
}

// タイマーを再開する関数
function resumeTimer() {
    isRunning = true;
    isPaused = false;
    updateButtonVisibility();

    // 再開時に再度setIntervalを設定
    timerInterval = setInterval(() => {
        if (timeRemaining > 0) {
            timeRemaining--;
            updateTimerDisplay();

            // 残り時間に応じて円を反時計回りに消す
            const offset = (timeRemaining / totalTime) * circumference;
            circle.style.strokeDashoffset = offset;
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            updateButtonVisibility();

            // タイマーが0になったら通知を表示
            showNotification();
        }
    }, 1000);
}

// タイマーをリセットする関数
function resetTimer() {
    clearInterval(timerInterval); // 現在のタイマーを停止
    timeRemaining = 0;
    updateTimerDisplay();
    isRunning = false;
    isPaused = false;
    updateButtonVisibility();

    // リセット時に円を元の状態に戻す
    circle.style.strokeDashoffset = circumference;
}

// タイマーの表示を更新する関数
function updateTimerDisplay() {
    let hours = Math.floor(timeRemaining / 3600);
    let minutes = Math.floor((timeRemaining % 3600) / 60);
    let seconds = timeRemaining % 60;

    document.getElementById("timer-display").innerHTML =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
}

// ボタンの表示・非表示を制御する関数
function updateButtonVisibility() {
    if (isRunning) {
        startButton.style.display = "none";
        pauseButton.style.display = "inline-block";
        resetButton.style.display = "inline-block";
        resumeButton.style.display = "none";
    } else if (isPaused) {
        startButton.style.display = "none";
        pauseButton.style.display = "none";
        resetButton.style.display = "inline-block";
        resumeButton.style.display = "inline-block";
    } else {
        startButton.style.display = "inline-block";
        pauseButton.style.display = "none";
        resetButton.style.display = "none";
        resumeButton.style.display = "none";
    }
}

// 初期表示
updateButtonVisibility();

// ページ読み込み時に通知の許可をリクエスト
requestNotificationPermission();
