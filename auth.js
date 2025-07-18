
const jwt = require("jsonwebtoken");

const secret = "FitnessTrackerAPI";


module.exports.createAccessToken = (user) => {
    const data = {
        id : user._id,
        email : user.email,
        isAdmin : user.isAdmin
    };
    return jwt.sign(data, secret, {});		
};


module.exports.verify = (req, res, next) => {

    let token = req.headers.authorization;


    if(typeof token === "undefined"){
        return res.send({auth: "Failed. No Token"});
    } else {

        token = token.slice(7, token.length);

        jwt.verify(token, secret, function(err, decodedToken){
            if(err){
                return res.send({
                    auth: "Failed",
                    message: err.message
                });
            } else {

                req.user = decodedToken
                next();
            }
        })
    }
};


// [SECTION] Error Handler
module.exports.errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;
    const errorMessage = err.message || 'Internal Server Error';

    res.status(statusCode).json({
        error: {
            message: errorMessage,
            errorCode: err.code || 'SERVER_ERROR',
            details: err.details
        }
    });
};
