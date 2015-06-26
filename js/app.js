function startCountdown(seconds) {
  seconds = seconds * 1000; // convert seconds into millisecons
  circle.set(1);
  circle.animate(0, {
    duration: seconds,
    step: function(state, bar) {
        bar.setText((bar.value() * (this.duration / 1000)).toFixed(0));
      }
    },
    function() {
    circle.setText("Done!");
  });
}

var circle = new ProgressBar.Circle('#display', {
  fill: "#DADADA",
  color: '#FCB03C',
  strokeWidth: 4,
  trailColor: "#C1C1C1",
  trailWidth: 2,
  text: {
    value: '0'
  }
});

var repsForm = document.getElementById("reps-form");
repsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  var repsInput = document.getElementById("reps-input");
  alert(repsInput.value);
  startCountdown(repsInput.value);
});
