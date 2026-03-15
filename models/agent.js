const mongoose = require('mongoose')

const agentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        job: {
            type: String,
        },
        personalityPrompt: { // Hardcoded enum for now — will be replaced with PersonalityPrompt model reference
            type: String,
            enum: ['role-play', 'assistant', 'coaching', 'customer-care'],
            default: 'assistant',
        },
        skills: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
        }],
        customPersonality: {
            type: String,
        },
        status: {
            type: String,
            enum: ['on', 'off'],
            default: 'off',
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
)

const Agent = mongoose.model('Agent', agentSchema)

module.exports = Agent