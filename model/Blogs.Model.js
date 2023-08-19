const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {

        name: { type: String, required: true },
        description: { type: String },
        checklist: { type: String },
        comments: { type: String },
        project: { type: String },
        assign: [{ type:String }],
        dueDate: { type: Date },
        labels: { type: String },
        user:[{type:String,required:true}]
    },
    {
        versionKey: false
    }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
    TaskModel
};