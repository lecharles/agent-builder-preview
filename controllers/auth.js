const express = require('express')
const router = express.Router() // how controllers can define their own routes
const User = require('../models/user')
const bcrypt = require('bcrypt') // for hashing passwords

// show sign-up form
router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up', { message: '' }) 
})

// create new user account
router.post('/sign-up', async (req, res) => {
    try {
        const { username, password, confirmPassword, language } = req.body

        const foundUser = await User.findOne({ username: username })
        if (foundUser) {
            throw new Error(`User with username ${username} already exists.`)
        }

        if (password !== confirmPassword) {
            throw new Error('Password and password confirm do not match.')
        }

        const hashedPassword = bcrypt.hashSync(password, 8)
        const user = await User.create({
            username,
            hashedPassword,
            language,
        })

        req.session.user = {
            _id: user._id,
            username: user.username,
        }

        req.session.save(() => {
            res.redirect('/users/me')
        })

    } catch (error) {
        res.render('auth/sign-up', { message: error.message })
    }
})

// show sign-in form
router.get('/sign-in', (req, res) => {
    res.render('auth/sign-in', { message: '' })
})

// authenticate user
router.post('/sign-in', async (req, res) => {
    try {
        const { username, password } = req.body

        const foundUser = await User.findOne({ username })
        if (!foundUser) {
            throw new Error(`User with username ${username} does not exist.`)
        }

        const isValidPassword = bcrypt.compareSync(password, foundUser.hashedPassword)
        if (!isValidPassword) {
            throw new Error('Password incorrect, please try again.')
        }

        req.session.user = {
            _id: foundUser._id,
            username: foundUser.username,
        }

        req.session.save(() => {
            res.redirect('/users/me')
        })

    } catch (error) {
        res.render('auth/sign-in', { message: error.message })
    }
})

// sign out user
router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router