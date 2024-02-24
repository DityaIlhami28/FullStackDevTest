const { RoomUsage } = require('../models');

module.exports = async function authorization(req, res, next) {
    try {
        let room = await RoomUsage.findByPk(req.params.id)
        if(!room) {
            throw {name : "Not Found"}
        }
        let {id} = req.user
        if(room.clientId !== id) {
            throw {name : "Forbidden"}
        }
        next()
    } catch (error) {
        next(error)
    }
}