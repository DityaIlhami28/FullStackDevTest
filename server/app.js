const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors')
const ClientController = require('./controllers/clientController');
const errorHandler = require('./middlewares/errorHandler');
const authentication = require('./middlewares/authentication');
const RoomController = require('./controllers/roomController');
const RoomUsageController = require('./controllers/roomUsageController');
const userAuthorization = require('./middlewares/userAuthorization');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Hello World",
    });
})

app.post("/register", ClientController.register);
app.post("/login", ClientController.login);
app.get("/room", RoomController.getRooms);

app.use(authentication);
app.get("/profile", ClientController.getProfile);
app.patch("/credits", ClientController.addCredits);
app.get("/roomUsage", RoomUsageController.getRoomUsage)
app.post("/roomUsage", RoomUsageController.addRoomUsage)
app.delete("/roomUsage/:id", userAuthorization,RoomUsageController.deleteRoomUsage)

app.use(errorHandler);
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})