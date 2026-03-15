const express = require('express')
const router = express.Router()
const User = require('../models/user')

// show user page
router.get('/me', async (req, res) => {
    const user = await User.findById(req.session.user._id)
    res.render('profile', { user })
})

module.exports = router