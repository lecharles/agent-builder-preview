const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        hashedPassword: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            enum: ['english', 'french', 'spanish', 'italian', 'portuguese'],
            default: 'english',
        },
    },
    {
        timestamps: true,
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User