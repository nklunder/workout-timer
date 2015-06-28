//all of the different display areas to be hidden / shown throughout workout
var setupForm = document.getElementById("setup-form"),
  repsForm = document.getElementById("reps-form"),
  restTimerDisplay = document.getElementById("rest-timer-display"),
  statsDisplay = document.getElementById("stats-display");

// vars for managing data collected during the workout
var currentExercise,
  currentSet = 1,
  exerciseStartTime,
  exerciseEndTime,
  exerciseType,
  numberOfSets,
  todaysWorkout = {
    date: Date.now(),
    exercises: [],
    totalTime: null
  };

// If not present, empty array is created to store user's workout data,
// else grab existing workout data from localStorage
if (!localStorage.workoutData) {
  localStorage.setItem("workoutData", JSON.stringify([]));
}
var workoutData = JSON.parse(localStorage.getItem("workoutData"));

var restTimer = new ProgressBar.Circle("#countdown-display", {
  fill: "#DADADA",
  color: '#FCB03C',
  strokeWidth: 4,
  trailColor: "#C1C1C1",
  trailWidth: 2,
  text: {
    value: '0'
  }
});

// initially hide everything but the first module
repsForm.style.display = "none";
restTimerDisplay.style.display = "none";
statsDisplay.style.display = "none";

setupForm.addEventListener("submit", startWorkout);
repsForm.addEventListener("submit", endCurrentSet);

function startWorkout(e) {
  setupForm.style.display = "none";
  repsForm.style.display = "initial";

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
}

function endCurrentSet(e) {
  repsForm.style.display = "none";
  restTimerDisplay.style.display = "initial";

  e.preventDefault();
  var repsInput = document.getElementById("reps-input");

  exerciseEndTime = Date.now();
  currentExercise.reps = parseInt(repsInput.value);
  currentExercise.time = exerciseEndTime - exerciseStartTime;
  todaysWorkout.exercises.push(currentExercise);

  repsInput.value = "";

  if (currentSet < numberOfSets) {
    currentSet++;
    startNextSet();
  } else {
    repsForm.style.display = "none";
    statsDisplay.style.display = "initial";

    todaysWorkout.totalTime = Date.now() - todaysWorkout.date;
    workoutData.push(todaysWorkout);
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }
}

function startNextSet() {
  startCountdown(currentExercise.time);
  exerciseStartTime = Date.now();
  currentExercise = {
    set: currentSet,
    reps: null,
    time: null
  };
}

function swapTimerAndReps() {
  restTimerDisplay.style.display = "none";
  repsForm.style.display = "initial";
}

function startCountdown(time) {
  restTimer.set(1);
  restTimer.animate(0, {
    duration: time,
    step: function(state, bar) {
      bar.setText((bar.value() * (this.duration / 1000)).toFixed(0));
    }
  },
  function() {
    restTimer.setText("Start next set!");
    setTimeout(swapTimerAndReps, 5000);
  });
}
