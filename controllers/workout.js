const Workout = require('../models/Workout.js');
const auth = require('../auth.js');

//[SECTION] Controller for Add Workout
module.exports.addWorkout = (req, res) => {

    let newWorkout = new Workout({
    	userId: req.user.id,
        name : req.body.name,
        duration : req.body.duration
    });

    return newWorkout.save()
    .then((workout) => res.status(201).send({workout}))
    .catch(error => {
      console.error("Error adding workout:", error);
      res.status(500).send({ error: "Failed to add workout. Please try again." });
})
}


//[SECTION] Controller for Get My Workouts
module.exports.getMyWorkouts = (req, res) => {

    return Workout.find({})
    .then(workout => res.status(200).send({ workout }))
    .catch(error => {
      console.error("Error retrieving workout:", error);
      res.status(500).send({ error: "Failed to retrive workouts. Please try again." });
})
}

//[SECTION] Controller for Update Workout
module.exports.updateWorkout = (req, res) => {

    let updatedWorkout = {
        name: req.body.name,
        duration: req.body.duration,
    }
    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout)
    .then(workout => {
        if (workout) {
            res.status(200).send({ 
            	message: 'Workout updated successfully', 
            	updatedWorkout: workout });
        } else {
            res.status(404).send({ message: 'Workout not found' });
        }
    })
    .catch(error => {
      console.error("Error updating workout:", error);
      res.status(500).send({ error: "Failed to update workout. Please try again." });
})
};


//[SECTION] Controller for Delete Workout
module.exports.deleteWorkout = (req, res) => {

    return Workout.deleteOne({ _id: req.params.workoutId })
    .then((deleteStatus) => res.status(200).send({ 
        message: 'Workout deleted successfully'
    }))
    .catch(error => {
      console.error("Error deleting workout:", error);
      res.status(500).send({ error: "Failed to delete workout. Please try again." });
})
}


//[SECTION] Controller for Complete Workout Status
module.exports.completeWorkoutStatus = (req, res) => {

    let updatedWorkout = {
        status: 'completed'
    }

    return Workout.findByIdAndUpdate(req.params.workoutId, updatedWorkout, {new: true})
    .then((workout) => res.status(200).send({ 
        message: 'Workout status updated successfully', 
        updatedWorkout: workout 
    }))
    .catch(error => {
      console.error("Error updating workout:", error);
      res.status(500).send({ error: "Failed to successfully update workout. Please try again." });
})
}

