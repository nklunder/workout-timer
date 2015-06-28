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
  color: '#FCB03C',
  strokeWidth: 4,
  trailColor: "#C1C1C1",
  trailWidth: 4,
  text: {
    value: '0'
  }
});

// initially hide everything but the first module

setupForm.addEventListener("submit", startWorkout);
repsForm.addEventListener("submit", endCurrentSet);

function swapComponentVisibility(inComponent, outComponent) {
  outComponent.className = "animated zoomOut";

  setTimeout(function () {
    outComponent.className = "hidden";
    inComponent.className = "animated zoomIn";
  }, 250);
}

function startWorkout(e) {
  swapComponentVisibility(repsForm, setupForm);

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
  swapComponentVisibility(restTimerDisplay, repsForm);

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
    swapComponentVisibility(statsDisplay, repsForm);

    todaysWorkout.totalTime = Date.now() - todaysWorkout.date;
    workoutData.push(todaysWorkout);
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }
}

function startNextSet() {
  startCountdown(currentExercise.time);
  currentExercise = {
    set: currentSet,
    reps: null,
    time: null
  };
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
    exerciseStartTime = Date.now();
    setTimeout(function () {
      swapComponentVisibility(repsForm, restTimerDisplay);
    }, 3000);
  });
}
