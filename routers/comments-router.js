const express = require("express");
const db = require("./model");
const router = express.Router();



router.get('/all', (req, res) => {
    db.getAllComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.get('/:id', (req, res) => {
    db.findComment(req.params.id)
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.delete('/:id', (req, res) => {
    db.deleteComment(req.params.id)
        .then(deletePostId => {
            res.status(200).json(deletePostId)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

router.put('/:id', (req, res) => {
    db.editComment(req.body, req.params.id)
        .then(edittedPostId => {
            res.status(200).json(edittedPostId)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})
module.exports = router;