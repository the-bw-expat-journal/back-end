const express = require("express");
const db = require("./model");
const router = express.Router();
const jwt = require("jsonwebtoken")


router.get("/allPosts", (req, res) => {
    db.getPosts()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


// router.post("/:username/posts", (req, res) => {
//     const username=req.params.username;
//     const newPost = {
//         ...req.body,
//         username: username
//     }
//     console.log(newPost)
//     db.addPost(newPost)
//         .then(newPostId=>{
//             res.status(200).json(newPostId)
//         })
//         .catch(error=>{
//             res.status(500).json(error)
//         })
// })

router.post("/", (req, res) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "secret";
    let newPost = req.body;

    if(token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ you: "Session Expired. Please re-login." })
            } else {
                console.log(decodedToken)
                newPost = {
                    ...newPost,
                    username: decodedToken.username
                }
                db.addPost(newPost)
                    .then(newPostId => {
                        res.status(200).json(newPostId)
                    })
                    .catch(error => {
                        res.status(500).json(error)
                    })
            }
        });
    } else {
        res.status(401).json({ message: "Please login to add a post." })
    }
})

router.get("/", (req, res) => {
    const token = req.headers.authorization;
    const secret = process.env.JWT_SECRET || "secret";

    if(token){
        jwt.verify(token, secret, (error, decodedToken) => {
            if(error) {
                res.status(401).json({ you: "Session Expired. Please re-login to see your posts." })
            } else {
                console.log(decodedToken)
                db.getPostsFromUser(decodedToken.username)
                    .then(posts=>{
                        res.status(200).json(posts)
                    })
                    .catch(error=>{
                        res.status(500).json(error)
                    })
            }
        });
    } else {
        res.status(401).json({ message: "Please login to see your posts." })
    }
})

router.get("/:id", (req, res) => {
    db.getPost(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete("/:id", (req, res) => {
    db.deletePost(req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put("/:id", (req, res) => {
    db.editPost(req.body, req.params.id)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post("/:id/comments", (req, res) => {
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