const express = require("express");
const db = require("./model");
const router = express.Router();

router.get("/users", (req, res) => {
    db.getUsers()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
})

router.post("/register", (req, res) => {
    db.addUser(req.body)
        .then(newUserId=>{
            res.status(200).json(newUserId)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
})

module.exports=router;