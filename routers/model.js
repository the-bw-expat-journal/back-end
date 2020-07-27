const db = require("../data/dbConfig");

module.exports = {
    getUsers,
    addUser,
    findUser
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

