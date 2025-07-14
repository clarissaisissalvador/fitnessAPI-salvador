//[SECTION] Dependencies and Modules
const express = require('express');
const workoutController = require('../controllers/workout.js')
const { verify } = require('../auth')
//[SECTION] Routing Component
const router = express.Router();


//[SECTION] Route for Add Workout
router.post("/addWorkout", verify, workoutController.addWorkout);

//[SECTION] Route for Get My Workouts
router.get("/getMyWorkouts", verify, workoutController.getMyWorkouts);

//[Section] Route for Update Workout
router.patch("/updateWorkout/:workoutId", verify, verify, workoutController.updateWorkout);

//[Section] Route for Delete Workout
router.delete("/deleteWorkout/:workoutId", verify, workoutController.deleteWorkout);

//[Section] Route for Complete Workout Status
router.patch("/completeWorkoutStatus/:workoutId", verify, workoutController.completeWorkoutStatus);

module.exports = router