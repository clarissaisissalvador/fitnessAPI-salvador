const bcrypt = require('bcrypt');
const User = require('../models/User.js');
const auth = require('../auth.js');

const { errorHandler } = auth;

//[SECTION] Controller for User Registration
module.exports.registerUser = (req, res) => {

    let newUser = new User({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    });

    return newUser.save()
    .then((user) => res.status(201).send({ message: "Registered Successfully" }))
    .catch(error => errorHandler(error, req, res));
};



//[SECTION] Controller for User Login
module.exports.loginUser = (req, res) => {

        return User.findOne({ email : req.body.email })
        .then(result => {

            if(result == null){
                return res.status(404).send({ error: "No Email Found" });
            } else {
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);
                if (isPasswordCorrect) {
                    return res.status(200).send({ access : auth.createAccessToken(result)})
                } else {
                    return res.status(401).send({ error: "Email and password do not match" });
                }
            }
        })
        .catch(error => errorHandler(error, req, res));
};



//[SECTION] Controller for Retrieving User Details 
module.exports.getProfile = (req, res) => {

    return User.findById(req.user.id)
    .then(user => {
        if(!user){
            res.status(404).send({ error: "User not Found" })
        }
        user.password = undefined;
        res.status(200).send({ user: user })
    })
    .catch(error => errorHandler(error, req, res));
}