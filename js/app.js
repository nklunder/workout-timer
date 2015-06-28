//all of the different display areas to be hidden / shown throughout workout
var primaryInfo = document.getElementById("primary-info"),
  secondaryInfo = document.getElementById("secondary-info"),
  setupForm = document.getElementById("setup-form"),
  repsForm = document.getElementById("reps-form"),
  repsInput = document.getElementById("reps-input"),
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

var restTimer = new ProgressBar.Circle("#progressbar-display", {
  color: '#512DA8',
  strokeWidth: 4,
  trailColor: "#B6B6B6",
  trailWidth: 4,
  text: {
    color: "#212121",
    value: '0'
  }
});

setupForm.addEventListener("submit", startWorkout);
repsForm.addEventListener("submit", endCurrentSet);

function swapComponentVisibility(inComponent, outComponent) {
  outComponent.className = "animated zoomOut";

  setTimeout(function () {
    outComponent.className = "hidden";
    inComponent.className = "animated fadeInUp";
  }, 250);
}

function startWorkout(e) {
  swapComponentVisibility(restTimerDisplay, setupForm);

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

  startNextSet(5000);

  primaryInfo.textContent = "Get Ready";
  secondaryInfo.textContent = "Start your first set when the timer reaches 0.";

  // primaryInfo.textContent = "Set " + currentSet + " Total";
  // secondaryInfo.textContent = "Enter the number of repetitions performed during your first set.";
}

function endCurrentSet(e) {
  if (currentSet < numberOfSets) {
    swapComponentVisibility(restTimerDisplay, repsForm);
  } else {
    swapComponentVisibility(statsDisplay, repsForm);
  }

  e.preventDefault();

  exerciseEndTime = Date.now();
  currentExercise.reps = parseInt(repsInput.value);
  currentExercise.time = exerciseEndTime - exerciseStartTime;
  todaysWorkout.exercises.push(currentExercise);

  repsInput.value = "";

  if (currentSet < numberOfSets) {
    primaryInfo.textContent = "Set " + currentSet + " Complete";
    secondaryInfo.textContent = "You did " + currentExercise.reps + " " + exerciseType + " in " + (currentExercise.time / 1000).toFixed(1) + " seconds.";

    currentSet++;
    startNextSet();
  } else {
    primaryInfo.textContent = "Workout Complete";
    secondaryInfo.textContent = "Here are today's stats.";

    generateStats();

    todaysWorkout.totalTime = Date.now() - todaysWorkout.date;
    workoutData.push(todaysWorkout);
    localStorage.setItem("workoutData", JSON.stringify(workoutData));
  }
}

function startNextSet(timeOverride) {
  startCountdown(timeOverride || currentExercise.time);

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
    from: { color: "#512DA8"},
    to: { color: "#03A9F4"},
    step: function(state, bar) {
      restTimer.path.setAttribute("stroke", state.color);
      bar.setText(Math.ceil(bar.value() * (this.duration / 1000)).toFixed(0));
    }
  },
  function() {
    if (currentSet === 1) {
      restTimer.setText("GO!");
    } else {
      restTimer.setText("Start Next Set!");
    }
    exerciseStartTime = Date.now();
    setTimeout(function () {
      primaryInfo.textContent = "Set " + currentSet + " Total";
      secondaryInfo.textContent = "Enter the number of " + exerciseType + " performed during set " + currentSet + ".";
      swapComponentVisibility(repsForm, restTimerDisplay);
      repsInput.focus();
    }, 3000);
  });
}

function generateStats() {

}
