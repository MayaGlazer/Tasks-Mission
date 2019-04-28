
const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

let Tasks  = mongoose.model("tasks", {
    _id: { type: String },
    name: { type: String },
    date: { type: String },
    executor: { type: Number }
}, "Tasks");

module.exports = { Tasks };
