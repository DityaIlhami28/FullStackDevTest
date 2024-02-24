const { verifyToken } = require('../helper/jwt');
const { Client } = require('../models');

module.exports = async function authentication (req, res, next) {
    try {
        let token = req.headers.authorization
        if(!token) {
            throw {name: "Invalid Token"}
        }
        if (token.slice(0, 7) !== "Bearer ") {
            throw {name: "Invalid Token"}
        }
        token = token.slice(7)
        let payload = verifyToken(token)
        let user = await Client.findByPk(payload.id)
        if(!user) {
            throw {name: "Invalid Token"}
        }
        req.user = {
            id: user.id,
        }
        next()
    } catch (error) {
        next(error)
    }
}