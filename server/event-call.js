const express = require("express");

const routes = express.Router();

const OneSignal = require("onesignal-node");

const eventModel = require("./event-model");

const eventCall =  async (req, res) => {
    const date = new Date();

    console.log(
      date,
      new Date("2021-08-27T3:30:00.247Z").getHours(),
      new Date().getHours(),
      new Date("2021-08-27T3:30:00.247Z").getHours(),
      new Date().getHours() + 3,
      new Date("2021-08-27T3:30:00.247Z").getMonth(),
      new Date().getMonth()
    );
    const events = [];
    const isEvent = await eventModel.find();
    // console.log(isEvent)
    await isEvent.map((e) => {
      if (
        new Date(e.date).getHours() >= new Date().getHours() &&
        new Date(e.date).getHours() <= new Date().getHours() + 3 &&
        new Date(e.date).getFullYear() == new Date().getFullYear() &&
        new Date(e.date).getMonth() == new Date().getMonth() &&
        new Date(e.date).getDate() == new Date().getDate() &&
        new Date(e.date).getMonth() == new Date().getMonth()
      ) {
        console.log("trues");
        events.push(e);
      }
    });
    if (events.length) {
      var sendNotification = function (data) {
        var headers = {
          "Content-Type": "application/json; charset=utf-8",
          Authorization: "Basic NTVmZTU5M2MtNjNmNi00NTRhLWIxYjgtOTNlZmM2Njk5MjM4",
        };
  
        var options = {
          host: "onesignal.com",
          port: 443,
          path: "/api/v1/notifications",
          method: "POST",
          headers: headers,
        };
  
        var https = require("https");
        var req = https.request(options, function (res) {
          res.on("data", function (data) {
            console.log("Response:");
            console.log(JSON.parse(data));
          });
        });
  
        req.on("error", function (e) {
          console.log("ERROR:");
          console.log(e);
        });
  
        req.write(JSON.stringify(data));
        req.end();
      };
  
      await events.map((i) => {
        var message = {
          app_id: "41998dbe-0c68-4d54-bd48-2d3ddb5aad9b",
          contents: {
            en: `Hey ${i.name} !Event Reminder You have Meet on ${new Date(
              i.date
            ).toLocaleString()}`,
          },
          // included_segments: ["Subscribed Users"],
          include_external_user_ids: [`${i._id}`],
        };
        sendNotification(message);
      });
  
      res.json({ data: events, message: "events fetched successfully" });
    } else {
      res.json({ message: "events not fetched successfully" });
    }
  };

  module.exports = eventCall;
  