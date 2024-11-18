document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('start-button');
    const timerDisplay = document.getElementById('timer');
    let countdown;
  
    startButton.addEventListener('click', () => {
      const minutesInput = document.getElementById('minutes').value;
      const minutes = parseInt(minutesInput, 10);
  
      if (isNaN(minutes) || minutes < 0) {
        alert('Please enter a valid number of minutes.');
        return;
      }
  
      if (countdown) {
        clearInterval(countdown);
      }
  
      let timeRemaining = minutes * 60;
      updateDisplay(timeRemaining);
  
      countdown = setInterval(() => {
        timeRemaining--;
        updateDisplay(timeRemaining);
  
        if (timeRemaining <= 0) {
          clearInterval(countdown);
          alert('Time is up!');
        }
      }, 1000);
    });
  
    function updateDisplay(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    }
  });
  