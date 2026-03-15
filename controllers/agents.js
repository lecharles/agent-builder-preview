const express = require('express')
const router = express.Router()
const Agent = require('../models/agent')
const Skill = require('../models/skill')

// /agents
router.get('/', async (req, res) => {
    try {
        const agents = await Agent.find({ createdBy: req.session.user._id })
        res.render('agents/index', { agents })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// /agents/new — also loads user's skills for checkbox selection
router.get('/new', async (req, res) => {
    try {
        const skills = await Skill.find({ createdBy: req.session.user._id })
        res.render('agents/new', { skills })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// CREATE - POST /agents
router.post('/', async (req, res) => {
    try {
        req.body.createdBy = req.session.user._id
        if (!req.body.skills) req.body.skills = [] // if no skills checkboxes selected, form sends nothing - default to empty array
        await Agent.create(req.body)
        res.redirect('/agents')
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// SHOW - GET /agents/:id — populate skills to display full details
router.get('/:id', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id).populate('skills') // .populate() replaces ObjectId refs with full Skill records from the database
        res.render('agents/show', { agent })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Edit agent form (pre-filled) — also loads user's skills for checkbox selection
router.get('/:id/edit', async (req, res) => {
    try {
        const agent = await Agent.findById(req.params.id)
        const skills = await Skill.find({ createdBy: req.session.user._id })
        res.render('agents/edit', { agent, skills })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Update agent in database
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.skills) req.body.skills = []
        await Agent.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/agents/' + req.params.id)
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Delete agent from database
router.delete('/:id', async (req, res) => {
    try {
        await Agent.findByIdAndDelete(req.params.id)
        res.redirect('/agents')
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

module.exports = router