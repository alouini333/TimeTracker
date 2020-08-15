const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskEntrySchema = new Schema({
    description: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    endDate: {
        required: true,
        type: Date
    }
});

const TaskEntry = mongoose.model('TaskEntry', taskEntrySchema);

module.exports = TaskEntry;