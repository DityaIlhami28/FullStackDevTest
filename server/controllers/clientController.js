const { Client, RoomUsage } = require("../models");
const { comparePass } = require("../helper/bcrypt");
const { signToken } = require("../helper/jwt");

class ClientController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "Bad Request", message: "Email is Required" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password is Required" };
      }
      const client = await Client.findOne({ where: { email } });
      if (!client) {
        throw { name: "Bad Request", message: "Invalid Email" };
      }
      if (!comparePass(password, client.password)) {
        throw { name: "Bad Request", message: "Invalid Password" };
      }
      const payload = {
        id: client.id,
      };
      const access_token = signToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      const { name, email, password, phone } = req.body;
      if (!name) {
        throw { name: "Bad Request", message: "Name is Required" };
      }
      if (!email) {
        throw { name: "Bad Request", message: "Email is Required" };
      }
      if (!password) {
        throw { name: "Bad Request", message: "Password is Required" };
      }
      if (!phone) {
        throw { name: "Bad Request", message: "Phone is Required" };
      }
      const emailExist = await Client.findOne({ where: { email } });
      if (emailExist) {
        throw {
          name: "EmailAlreadyRegistered",
          message: "Email is Already Exist",
        };
      }
      const client = await Client.create({ name, email, password, phone });
      res.status(201).json(client);
    } catch (error) {
      next(error);
    }
  }

  static async addCredits(req, res, next) {
    try {
      const { id } = req.user;
      let { credits } = req.body;
      credits = parseFloat(credits);
      if (isNaN(credits) || credits <= 0) {
        throw { name: "Invalid Credits" };
      }
      const client = await Client.findByPk(id);
      if (!client) {
        throw { name: "Invalid Token" };
      }
      await client.update({ credits: client.credits + credits });
      res.status(200).json({
        message: `Successfully added ${credits} credits to your account`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getProfile(req, res, next) {
    try {
      const { id } = req.user;
      const client = await Client.findOne({
        where: {
          id: id,
        },
        include: {
          model: RoomUsage,
        },
      });
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClientController;
