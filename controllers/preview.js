const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')
const User = require('../models/user')

// Preview page for an agent
router.get('/:agentId', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.agentId).populate('skills')
        const user = await User.findById(req.session.user._id)

        // Assemble system prompt from agent configuration
        const skillsContext = agent.skills.map(s => s.name + ': ' + s.description).join('\n')
        const systemPrompt = [
            'You are an AI agent in ' + agent.personalityPrompt + ' mode.',
            agent.customPersonality ? 'Additional instructions: ' + agent.customPersonality : '',
            skillsContext ? 'You have the following skills:\n' + skillsContext : '',
            agent.job ? 'Your job: ' + agent.job : '',
            'Respond in ' + user.agentLanguage + '.',
        ].join('\n\n')

        res.render('preview/show', {
            agent,
            systemPrompt,
            response: null,
            question: '',
        })
        console.log('Loaded agent:', agent)
        console.log('System prompt:', systemPrompt)
        console.log('Response:', null)
        console.log('Question:', '')
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Send question to agent via Anthropic API
router.post('/:agentId', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.agentId).populate('skills')
        const user = await User.findById(req.session.user._id)
        const question = req.body.question

        const skillsContext = agent.skills.map(s => s.name + ': ' + s.description).join('\n')
        const systemPrompt = [
            'You are an AI agent in ' + agent.personalityPrompt + ' mode.',
            agent.customPersonality ? 'Additional instructions: ' + agent.customPersonality : '',
            skillsContext ? 'You have the following skills:\n' + skillsContext : '',
            agent.job ? 'Your job: ' + agent.job : '',
            'Respond in ' + user.agentLanguage + '.',
        ].join('\n\n')

        console.log('Question:', question)
        console.log('System prompt:', systemPrompt)

        // Call Anthropic API — ref: https://platform.claude.com/docs/en/api/messages/create
        const apiResponse = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01',
            },
            body: JSON.stringify({
                model: 'claude-opus-4-6',
                max_tokens: 1024,
                system: systemPrompt,
                messages: [{ role: 'user', content: question }],
            }),
        })
        // Parse JSON response - data.content[0].text is where the response text lives per API docs
        const data = await apiResponse.json()
        console.log('API response:', data)
        const response = data.content[0].text

        res.render('preview/show', {
            agent,
            systemPrompt,
            response,
            question,
        })
    } catch (error) {
        console.log('Preview error:', error.message)
        res.status(500).render('error', { error: error.message })
    }
})

module.exports = router