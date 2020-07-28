const express = require("express");
const db = require("./model");
const router = express.Router();


router.get("/posts", (req, res) => {
    db.getPosts()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post("/:username/posts", (req, res) => {
    const username=req.params.username;
    const newPost = {
        ...req.body,
        username: username
    }
    console.log(newPost)
    db.addPost(newPost)
        .then(newPostId=>{
            res.status(200).json(newPostId)
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

router.get("/posts/:id", (req, res) => {
    db.getPost(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete("/posts/:id", (req, res) => {
    db.deletePost(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put("/posts/:id", (req, res) => {
    db.editPost(req.body, req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post("/posts/:id/comments", (req, res) => {
    const newComment = {
        ...req.body,
        post_id: req.params.id
    }
    console.log(newComment)
    db.addComment(newComment)
        .then(newComment => {
            res.status(200).json(newComment)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports=router;