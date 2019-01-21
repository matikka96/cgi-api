var express = require("express");
var router = express.Router();
const Specialist = require("../models/specialist");
const Appointment = require("../models/appointment");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("api");
});

// Create specialist
router.post("/specialists", function(req, res, next) {
  Specialist.findOne({ name: req.body.name }).then(search => {
    if (search) {
      res.json({ message: `User with name ${req.body.name} already exist` });
    } else {
      new Specialist({ name: req.body.name, role: req.body.role }).save().then(newSpecialist => {
        console.log(newSpecialist);
        res.json({ message: "User created succesfully", user: newSpecialist });
      });
    }
  });
});

// Load all specialists
router.get("/specialist-load-all", function(req, res, next) {
  Specialist.find().then(search => {
    res.json(search);
  });
});

// Delete specialist by id
router.post("/specialist-delete", function(req, res, next) {
  Specialist.findByIdAndDelete(req.body.id, (err, search) => {
    if (err) {
      console.log(err);
      res.json({ message: "User not found" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

// Create appointment
router.post("/timeslots", function(req, res, next) {
  req.body.appointments.map(a => {
    new Appointment({
      startTime: parseInt(a.startTime),
      endTime: parseInt(a.endTime),
      status: "vapaa",
      visitorName: null,
      specialistName: a.specialistName,
      notes: a.notes
    })
      .save()
      .then(newAppointment => {
        console.log(newAppointment);
      });
  });
  res.json({ message: "Appointments created" });
});

// Appointment booking
router.post("/timeslots/t", function(req, res) {
  console.log(req.body);
  Appointment.findByIdAndUpdate(
    req.body.id,
    { status: req.body.newStatus, visitorName: req.body.visitorName },
    (err, search) => {
      if (err) {
        console.log(err);
        res.json({ message: "Could not find appointment to delete" });
      } else {
        console.log(search);
        res.json({ message: `Booking status changed to ${req.body.newStatus}` });
      }
    }
  );
});

// Search for free appointments
router.get("/appointment/free", function(req, res, next) {
  let query = {};
  if (req.query.specialist) query.specialistName = req.query.specialist;
  if (req.query.from) {
    query.startTime = { $gte: parseInt(req.query.from) };
  } else {
    res.json({ message: "Start-time not specified" });
  }
  if (req.query.to) query.endTime = { $lte: parseInt(req.query.to) };
  query.status = "vapaa";
  console.log(query);
  Appointment.find(query, (err, r) => {
    if (err) {
      console.log(err);
      res.json({ message: "Something went wrong..." });
    } else {
      res.json(r);
    }
  });
});

// Search for all appointments
router.get("/appointment/all", function (req, res, next) {
  let query = {};
  if (req.query.specialist) query.specialistName = req.query.specialist;
  if (req.query.from) {
    query.startTime = { $gte: parseInt(req.query.from) };
  } else {
    res.json({ message: "Start-time not specified" });
  }
  if (req.query.to) query.endTime = { $lte: parseInt(req.query.to) };
  console.log(query);
  Appointment.find(query, (err, r) => {
    if (err) {
      console.log(err);
      res.json({ message: "Something went wrong..." });
    } else {
      res.json(r);
    }
  });
});

router.get("/appointment/available", function(req, res, next) {
  const { specialist, from, to } = req.query;
  if (specialist === null || from === null || to === null) {
    res.json({ message: "Not all properties provided" });
  }
  console.log(`specialist: ${specialist} + from: ${from} + to: ${to}`);
  let query = {
    specialistName: specialist,
    $or: [
      { $and: [{ startTime: { $lte: from } }, { endTime: { $gt: from } }] },
      { $and: [{ startTime: { $lt: to } }, { endTime: { $gte: to } }] }
    ]
  };
  Appointment.find(query, (err, r) => {
    if (err) {
      console.log(err);
      res.json({ message: "Something went wrong..." });
    } else {
      const taken = r.map(res => {
        return {
          from: res.startTime,
          to: res.endTime
        };
      });
      console.log(taken);
      res.json({
        reserved: r,
        message: `${specialist} is not available: ${JSON.stringify(taken)}`
      });
    }
  });
});

module.exports = router;
