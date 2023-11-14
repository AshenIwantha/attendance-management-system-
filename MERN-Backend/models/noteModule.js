const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Note Schema
const noteSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

// Export the model
module.exports = mongoose.model('Note', noteSchema)
