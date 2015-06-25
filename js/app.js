function startCountdown(seconds) {
  seconds = seconds * 1000;
  var options = {
    color: '#FCB03C',
    strokeWidth: 10,
    trailWidth: 15,
    duration: seconds,
    text: {
      value: '0'
    },
    step: function(state, bar) {
      bar.setText((bar.value() * (this.duration / 1000)).toFixed(0));
    }
  };

  var circle = new ProgressBar.Circle('#display', options);

  circle.set(1);
  circle.animate(0, function () { circle.setText("Done!");});
}

var repsInput = document.getElementById("reps")
var repsBtn = document.getElementById("reps-button");

repsBtn.addEventListener("click", function () {
  startCountdown(repsInput.value);
})
