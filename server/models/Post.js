const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true }, 
    timeStamp: { type: Date, default: Date.now },
    comments: { type: array, }
})

PostSchema.virtual("timeStamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model("Post", PostSchema);