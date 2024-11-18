document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const pauseButton = document.getElementById('pause-button');
    const resetButton = document.getElementById('reset-button');
    const timerDisplay = document.getElementById('timer');
  
    let countdown;
    let timeRemaining = 0;
    let isPaused = false;
  
    startButton.addEventListener('click', () => {
      const hoursInput = parseInt(document.getElementById('hours').value || 0, 10);
      const minutesInput = parseInt(document.getElementById('minutes').value || 0, 10);
      const secondsInput = parseInt(document.getElementById('seconds').value || 0, 10);
  
      timeRemaining = hoursInput * 3600 + minutesInput * 60 + secondsInput;
  
      if (timeRemaining <= 0) {
        alert('Please set a valid time.');
        return;
      }
  
      startButton.disabled = true;
      pauseButton.disabled = false;
      resetButton.disabled = false;
  
      if (!isPaused) {
        updateDisplay(timeRemaining);
      }
  
      countdown = setInterval(() => {
        if (!isPaused) {
          timeRemaining--;
          updateDisplay(timeRemaining);
  
          if (timeRemaining <= 0) {
            clearInterval(countdown);
            alert('Time is up!');
            resetTimer();
          }
        }
      }, 1000);
    });
  
    pauseButton.addEventListener('click', () => {
      isPaused = !isPaused;
      pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
    });
  
    resetButton.addEventListener('click', resetTimer);
  
    function resetTimer() {
      clearInterval(countdown);
      timeRemaining = 0;
      isPaused = false;
      updateDisplay(0);
  
      startButton.disabled = false;
      pauseButton.disabled = true;
      resetButton.disabled = true;
      pauseButton.textContent = 'Pause';
    }
  
    function updateDisplay(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainingSeconds = seconds % 60;
  
      timerDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  });
  
