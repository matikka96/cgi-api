var express = require("express");
var router = express.Router();
const Specialist = require("../models/specialist");
const Appointment = require("../models/appointment");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("api");
});

// Create specialist
router.post("/specialist-new", function(req, res, next) {
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
router.post("/appointment-new", function(req, res, next) {
  new Appointment({
    startTime: parseInt(req.body.startTime),
    endTime: parseInt(req.body.endTime),
    status: "vapaa",
    visitorName: req.body.visitorName,
    specialistName: req.body.specialistName,
    notes: req.body.notes
  })
    .save()
    .then(newAppointment => {
      console.log(newAppointment);
      res.json({ message: "User appointment succesfully", appointment: newAppointment });
    });
});

router.get("/appointment/free", function(req, res, next) {
  // let query = req.query.specialist ? { specialist: req.query.specialist } : {};
  let query = {
    startTime: { $lte: parseInt(req.query.from) },
    endTime: { $gte: parseInt(req.query.to) }
  }
  Appointment.find(query, (err, r) => {
    if (err) {
      console.log(err);
      res.json({message: "Could not find appointments"});
    } else {
      res.json(r);
    }
  });
});

module.exports = router;
