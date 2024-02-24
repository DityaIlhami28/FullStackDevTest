const { Room } = require("../models");

class RoomController {
  static async getRooms(req, res, next) {
    try {
      const rooms = await Room.findAll();
      res.status(200).json(rooms);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomController;
