const db = require("../data/dbConfig");

module.exports = {
    getUsers,
    addUser,
    findUser,
    getPosts,
    addPost,
    getPostsFromUser,
    getPost,
    deletePost,
    editPost,
    addComment
}

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