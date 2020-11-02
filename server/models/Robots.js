const mongoose = require('mongoose');
const schema = mongoose.Schema;
// create schema
const RobotsSchema = new schema({
  robotName: { type: String },
  robotType: { type: String },
  robotImage: { type: String },
  robotTasks: [],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Robots = mongoose.model('robot', RobotsSchema);
