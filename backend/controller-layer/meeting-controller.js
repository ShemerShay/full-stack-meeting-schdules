const meetingLogic = require("../business-logic-layer/meetings-logic");
const express = require("express");
const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const Schedules = await meetingLogic.getAllSchedulesAsync();
    response.json(Schedules);
  } catch (error) {
    response.status(500).send(error.message);
  }
});

router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id
      const meetings = await meetingLogic.getMeetingsBySchedulesAsync(id);
      response.json(meetings);
    } catch (error) {
      response.status(500).send(error.message);
    }
  });

  router.post("/", async (request, response) => {
      try {
          const meeting = request.body;
          const addedMeeting = await meetingLogic.addOneMeetingAsync(meeting);
          response.status(201).json(addedMeeting)
      } catch (error) {
      response.status(500).send(error.message);
      }
  })


module.exports = router;