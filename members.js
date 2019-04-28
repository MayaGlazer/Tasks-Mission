const mongoose = require('mongoose');
//var Schema = mongoose.Schema;

let Members  = mongoose.model("members", {
    _id: { type: Number },
    name: { type: String },
    nickname: { type: String },
    description: { type: String }
}, "Members");

module.exports = { Members };
