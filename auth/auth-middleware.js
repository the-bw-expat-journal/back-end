const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    const secret = process.env.JWT_SECRET || "secret";
    
    if(token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ you: "Session Expired. Please re-login." })
            } else {
                req.decodedToken = decodedToken;

                next();
            }
        });
    } else {
        res.status(401).json({ message: "Please login to access this section." })
    }
}