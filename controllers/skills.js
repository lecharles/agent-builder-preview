const express = require('express')
const router = express.Router()
const Skill = require('../models/skill')

// /skills
router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find({ createdBy: req.session.user._id })
        res.render('skills/index', { skills })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// /skills/new
router.get('/new', (req, res) => {
    res.render('skills/new')
})

// CREATE - POST /skills
router.post('/', async (req, res) => {
    try {
        req.body.createdBy = req.session.user._id
        await Skill.create(req.body)
        res.redirect('/skills')
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// SHOW - GET /skills/:id
router.get('/:id', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id)
        res.render('skills/show', { skill })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Edit skill form (pre-filled)
router.get('/:id/edit', async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id)
        res.render('skills/edit', { skill })
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Update skill in database
router.put('/:id', async (req, res) => {
    try {
        await Skill.findByIdAndUpdate(req.params.id, req.body)
        res.redirect('/skills/' + req.params.id)
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

// Delete skill from database
router.delete('/:id', async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id)
        res.redirect('/skills')
    } catch (error) {
        res.status(500).render('error', { error: error.message })
    }
})

module.exports = router