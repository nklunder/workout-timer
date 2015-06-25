function startCountdown(seconds) {
  seconds = seconds * 1000; // convert seconds into millisecons
  circle.set(1);
  circle.animate(0, { duration: seconds }, function() {
    circle.setText("Done!");
  });
}

var repsInput = document.getElementById("reps");
var repsBtn = document.getElementById("reps-button");

repsBtn.addEventListener("click", function() {
  startCountdown(repsInput.value);
});

var circle = new ProgressBar.Circle('#display', {
  color: '#FCB03C',
  strokeWidth: 10,
  trailWidth: 15,
  fill: "lime",
  text: {
    value: '0'
  },
  step: function(state, bar) {
    bar.setText((bar.value() * (this.duration / 1000)).toFixed(0));
  }
});
