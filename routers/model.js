const db = require("../data/dbConfig");



function getUsers(){
    return db("users")
}

function addUser(newUser){
    return db("users").insert(newUser, "id")
}

function findUser(User){
    return db("users")
        .where(User)
        .orderBy("users.id");
}

function deleteUser(user){
    return db("users").where({ username: user }).del()
}

function getPosts(){
    return db("posts")
}

function addPost(newPost){
    return db("posts").insert(newPost, "id")
}

function getPostsFromUser(username){
    return db("posts").where({ username: username })
}

function getPost(postId){
    return db("posts").where({ id: postId })
}

function deletePost(postId){
    return db("posts").where({ id: postId }).del()
}

function editPost(edittedPost, postId){
    return db("posts").where({ id: postId }).update(edittedPost)
}

function addComment(newComment){
    return db("comments").insert(newComment, "id")
}

function getCommentsForPost(post_id){
    return db("comments").where({ post_id: post_id })
}

function getAllComments(){
    return db("comments")
}

function findComment(commentId){
    return db("comments").where({ id: commentId })
}

function deleteComment(commentId){
    return db("comments").where({ id: commentId }).del()
}

function editComment(edittedComment, commentId){
    return db("comments").where({ id: commentId }).update(edittedComment)
}

function likePost(incomingLike){
    return db("likes").insert(incomingLike, "id")
}

function removeLike(incomingUnlike){
    return db("likes").where({ username: incomingUnlike.username, post_id: incomingUnlike.post_id }).del()
}

function checkLikeOnPost(check){
    return db("likes").where({ username: check.username, post_id: check.post_id })
}
module.exports = {
    getUsers,
    addUser,
    findUser,
    deleteUser,
    getPosts,
    addPost,
    getPostsFromUser,
    getPost,
    deletePost,
    editPost,
    addComment,
    getCommentsForPost,
    getAllComments,
    findComment,
    deleteComment,
    editComment,
    likePost,
    removeLike,
    checkLikeOnPost
}