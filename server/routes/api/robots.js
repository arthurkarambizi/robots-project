// all Robots routes  are here

const express = require('express');

//router

const router = express.Router();

// Robots model we need it to make querries, save ,find etc..

const Robots = require('../../models/Robots');

// '/' is  api/robots   because we have already  /routes/api/robots in server.js


router.get('/', (req, res) => {
    // take the model
    Robots.find()
        .then(robots => res.json(robots))
        .catch(err => res.status(404).json({ success: false }));
});


router.get('/:id', (req, res) => {
    Robots.findById(req.params.id)
        .then(robot => res.json(robot))
        .catch(err => res.status(404).json({ success: false }));
});


router.post('/', (req, res) => {
    // create new robot from the Robots model
    const { robotName, robotType, robotImage } = req.body;

    const newRobot = new Robots({
        robotName,
        robotType,
        robotImage
    });
    newRobot.save().then(robot => res.json(robot));
});


router.put('/:id', (req, res) => {
    Robots.findByIdAndUpdate(
        // the id of the robot to find
        req.params.id,

        // the change to be made. Mongoose will smartly combine your existing
        // document with this change, which allows for partial updates too
        req.body,

        // an option that asks mongoose to return the updated version
        // of the document instead of the pre-updated one.
        { new: true },

        (err, robot) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(robot);
        }
    ).then();
});


router.delete('/:id', (req, res) => {
    // req.params.id fetch the id from the uri
    Robots.findById(req.params.id)
        .then(robot => robot.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
