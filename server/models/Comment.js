const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const CommentSchema = new Schema({
    caption: { type: String,  required: true }, 
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    timeStamp: { type: Date, default: Date.now },
})

CommentSchema.virtual("timeStamp_formatted").get(function() {
    return DateTime.fromJSDate(this.timeStamp).toLocaleString(DateTime.DATE_MED)
})

module.exports = mongoose.model("Comment", CommentSchema);