//[SECTION] Dependencies and Modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//[SECTION] Routes
const workoutRoutes = require("./routes/workout.js");
const userRoutes = require("./routes/user.js");

//[SECTION] Database Setup
mongoose.connect("mongodb+srv://admin123:admin123@b546.jckmsx9.mongodb.net/FitnessTrackerAPI?retryWrites=true&w=majority&appName=b546");
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'))

//[SECTION] Server Setup
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const corsOptions = {
    origin: 'https://fitness-app-client-omega-henna.vercel.app',
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

//[SECTION] Backend Routes
app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

//[SECTION] Server Gateway Response
app.listen(process.env.PORT || 4000, () => {
    console.log(`API is now online on port ${ process.env.PORT || 4000 }`)
});
module.exports = { app, mongoose };