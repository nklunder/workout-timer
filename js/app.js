function startCountdown(time) {
  circle.set(1);
  circle.animate(0, {
    duration: time,
    step: function(state, bar) {
        bar.setText((bar.value() * (this.duration / 1000)).toFixed(0));
      }
    },
    function() {
      circle.setText("Start next set!");
    });
}

function startNextExercise() {
  startCountdown(currentExercise.time);
  exerciseStartTime = Date.now();
  currentExercise = {
    set: currentSet,
    reps: null,
    time: null
  };
}
// If not present, empty array is created to store user's workout data
if (!localStorage.workoutData) {
  localStorage.setItem("workoutData", JSON.stringify([]));
}

var workoutData = JSON.parse(localStorage.getItem("workoutData"));

var setupForm = document.getElementById("setup-form");
var repsForm = document.getElementById("reps-form");

var currentExercise,
    currentSet = 1,
    exerciseStartTime,
    exerciseEndTime,
    exerciseType,
    numberOfSets;

var todaysWorkout = {
  date: Date.now(),
  exercises: [

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

setupForm.addEventListener("submit", function (e) {
  e.preventDefault();
  exerciseType = document.getElementById("exercise-select").value;
  var radios = document.getElementsByName("sets"),
      length = radios.length;
  for (var i = 0; i < length; i++) {
    if (radios[i].checked) {
      numberOfSets = parseInt(radios[i].value);
      break;
    }
  }
  currentExercise = {
    set: currentSet,
    type: exerciseType,
    reps: null,
    time: null
  };
  exerciseStartTime = Date.now();
});

repsForm.addEventListener("submit", function (e) {
  e.preventDefault();
  exerciseEndTime = Date.now();

  var repsInput = document.getElementById("reps-input");

  currentExercise.reps = parseInt(repsInput.value);
  currentExercise.time = exerciseEndTime - exerciseStartTime;

  todaysWorkout.exercises.push(currentExercise);

  repsInput.value = "";

  if (currentSet < numberOfSets) {
    currentSet++;
    startNextExercise();
  } else {
    circle.setText("Wooo! Ur all done dood!");
    todaysWorkout.totalTime = Date.now() - todaysWorkout.date;
    workoutData.push(todaysWorkout);

    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }


});
