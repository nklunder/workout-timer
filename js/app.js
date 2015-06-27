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
    circle.setText("Start next exercise!");
  });
}


// If not present, empty array is created to store user's workout data
if (!localStorage.workoutData) {
  localStorage.setItem("workoutData", JSON.stringify([]));
}
var workoutData = JSON.parse(localStorage.getItem("workoutData"));

var exerciseStartTime,
    exerciseEndTime;

var todaysWorkout = {
  date: Date.now(),
  exercises: [
    //  {
    //    set: 1,
    //    type: "push up",
    //    reps: 25,
    //    time: 45
    //  }
  ],
  totalTime: null
};

var circle = new ProgressBar.Circle('#countdown-display', {
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
  startCountdown(repsInput.value);
});
