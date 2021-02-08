global.config = require("./config.json");
const express = require("express");
const cors = require("cors");
const meetingController = require("./controller-layer/meeting-controller")
const server = express();


server.use(express.json());
server.use(cors());
server.use("/api/meetings", meetingController);





server.listen(3001, () => console.log("Listening...."))