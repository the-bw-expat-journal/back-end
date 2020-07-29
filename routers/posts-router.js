const express = require("express");
const db = require("./model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { render } = require("../server");
const e = require("express");


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
        post_id: req.params.id,
        username: req.decodedToken.username
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

router.get("/:id/comments", (req, res) =>{
    db.getCommentsForPost(req.params.id)
        .then(comments =>{
            res.status(200).json(comments)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.post('/:id/like', (req, res) => {
    const newLike = {
        username: req.decodedToken.username,
        post_id: req.params.id
    }
    db.likePost(newLike)
        .then(newLikeId => {
            res.status(200).json(newLikeId)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id/like', (req, res) => {
    const unlike = {
        username: req.decodedToken.username,
        post_id: req.params.id
    }
    db.removeLike(unlike)
        .then(like => {
            res.status(200).json(like)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/:id/like', (req, res) => {  //returns 1 if there is a like on a post. 0 if there is no like.
    const checklike = {
        username: req.decodedToken.username,
        post_id: req.params.id
    }
    db.checkLikeOnPost(checklike)
        .then(result => {
            if(result.length === 0){
                res.status(200).json(0)
            }else{
                res.status(200).json(1)
            }
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

module.exports=router;