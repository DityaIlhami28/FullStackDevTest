const { RoomUsage, Room, Client } = require("../models");

class RoomUsageController {
  static async getRoomUsage(req, res, next) {
    try {
      const { id } = req.user;
      const booking = await RoomUsage.findAll({
        where: {
          clientId: id,
        },
        include: {
          model: Room, as: "Room",
        },
      });
      res.status(200).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async addRoomUsage(req, res, next) {
    try {
      const { id } = req.user;
      const { roomId, startTime, endTime, bookingDate, quotaUsed } = req.body;
      const client = await Client.findByPk(id);
      const room = await Room.findByPk(roomId);
      const parsedDate = new Date(bookingDate);
      if (client.credits < room.costPerHour) {
        throw { name: "Insufficient Credits", message: "Insufficient Credits" };
      }
      const existedBooking = await RoomUsage.findOne({
        where: {
          roomId: roomId,
          bookingDate: parsedDate,
          startTime: startTime,
        },
      });
      if (existedBooking) {
        throw { name: "Already Booked", message: "Already Booked" };
      }
      const booking = await RoomUsage.create({
        clientId: id,
        roomId: roomId,
        startTime: startTime,
        endTime: endTime,
        bookingDate: parsedDate,
        quotaUsed: quotaUsed,
      });
      if (booking) {
        await client.update({ credits: client.credits - room.costPerHour });
      }
      res.status(201).json(booking);
    } catch (error) {
      next(error);
    }
  }

  static async deleteRoomUsage(req, res, next) {
    try {
      const { id } = req.user;
      const client = await Client.findByPk(id);
      const booking = await RoomUsage.findOne({
        where: {
          id: req.params.id,
        },
        include: {
          model: Room,
          as: "Room",
        },
      });
      await booking.destroy();
      if (booking) {
        await client.update({
          credits: booking.Room.costPerHour + client.credits,
        });
      }
      res.status(200).json({
        message: "Your Booking is Canceled and Your Credits has been refunded",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RoomUsageController;
