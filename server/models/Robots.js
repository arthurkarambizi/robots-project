const mongoose = require('mongoose');
// we are going to create a schema
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

// export the schema because we have no access
module.exports = Robots = mongoose.model('robot', RobotsSchema);
