const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        checklist: { type: String },
        comments: { type: String },
        project: { type: String },
        assign: [
            {
                name: { type: String, required: true },
                userId: { type: String, required: true }
            }
        ],
        dueDate: { type: Date },
        labels: { type: String },
        user: [{ type: String, required: true }]
    },
    {
        versionKey: false
    }
);

const TaskModel = mongoose.model("task", TaskSchema);

module.exports = {
    TaskModel
};
