// models/Project.js
const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: String,
    projectDesc: String,
    cost: String,
    time: String,
    manPower: String,
    involvedDepts: String
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
