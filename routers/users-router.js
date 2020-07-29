const express = require("express");
const db = require("./model");
const router = express.Router();

router.get("/", (req, res) => {
    db.getUsers()
        .then(users=>{
            res.status(200).json(users)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
})

router.get("/:username/posts", (req, res) => {
    const username=req.params.username;
    db.getPostsFromUser(username)
        .then(posts=>{
            res.status(200).json(posts)
        })
        .catch(error=>{
            res.status(500).json(error)
        })
})

router.delete("/:username", (req, res) => {
    db.deleteUser(req.params.username)
        .then(deletedSuccess => {
            res.status(200).json({message: `hahahahah loser ${req.params.username} been deleted`, deletedSuccess})
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({error: 'wow we have an error', error})
        })
})

module.exports=router;