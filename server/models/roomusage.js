"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomUsage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RoomUsage.belongsTo(models.Client, { foreignKey: "clientId" });
      RoomUsage.belongsTo(models.Room, { foreignKey: "roomId" });
    }
  }
  RoomUsage.init(
    {
      clientId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      startTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide start time of your reservation",
          }
        },
      },
      endTime: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide end time of your reservation",
          }
        },
      },
      bookingDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide date of your reservation",
          }
        },
      },
      quotaUsed: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Please provide the number of people for your reservation",
          }
        },
      },
    },
    {
      sequelize,
      modelName: "RoomUsage",
    }
  );
  return RoomUsage;
};
