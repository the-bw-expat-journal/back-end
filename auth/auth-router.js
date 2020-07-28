const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = require('express').Router();

const Users = require("../routers/model");

const { isValidRegister, isValidLogin } = require("./auth-service");

router.post('/register', (req, res) => {
    const credentials = req.body;
    if(isValidRegister(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8;
        const hash = bcryptjs.hashSync(credentials.password, rounds);

        credentials.password=hash;

        Users.addUser(credentials)
            .then(user => {
                res.status(201).json({ data: user });
            })
            .catch(error => {
                res.status(500).json({ message: error.message })
            })
    }else{
        res.status(400).json({
            message: "Please provide a username, email, password, name, and location."
        })
    }
})

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if(isValidLogin(req.body)){
        Users.findUser({ username: username})
            .then(([user]) => {
                if( user && bcryptjs.compareSync(password, user.password)) {
                    const token = createToken(user);

                    res.status(200).json({ token,
                        message: `Welcome Expat, ${username}!`, 
                        user: {
                            id: user.id,
                            username: user.username,
                            name: user.name
                        }
                    })
                } else {
                    res.status(401).json({ message: "Invalid credentials" });
                }
            })
            .catch(error=>{
                res.status(500).json({ message: error.message });
            })
    } else {
        res.status(400).json({
            message: "You need to provide both username and password."
        })
    }

    function createToken(user){
        const payload = {
            subject: user.id,
            username: user.username
        };
        const secret = process.env.JWT_SECRET || "secret";
        const options = {
            expiresIn: "30m",
        }
        return jwt.sign(payload, secret, options)
    }
})

module.exports = router;