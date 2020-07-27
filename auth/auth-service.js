module.exports = {
    isValidRegister,
    isValidLogin
}

function isValidRegister(user){
    return Boolean(user.username && user.password && typeof user.password === "string" && user.email && user.name && user.password && user.location)
}

function isValidLogin(user){
    return Boolean(user.username && user.password && typeof user.password === "string")
}