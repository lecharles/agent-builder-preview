require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000 

// Libraries
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo').default || require('connect-mongo')
const path = require('path')

// Middleware
const authRequired = require('./middleware/isUserAuthorized')
const passDataToView = require('./middleware/passDataToView')

// db
require('./db/connection')

// Middleware config
app.use(morgan('tiny'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))

// Session config
app.use(session({ 
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI
    })
}))

// Make user data available to all views
app.use(passDataToView)

// Auth routes - accessible to everyone
const authRoutes = require('./controllers/auth')
app.use('/auth', authRoutes)

// Root route
app.get('/', (req, res) => {
    res.render('index', {
        user: req.session.user
    })
})

// Auth gate - everything below requires login
app.use(authRequired)

const userRoutes = require('./controllers/user')
app.use('/users', userRoutes)

const skillRoutes = require('./controllers/skills')
app.use('/skills', skillRoutes)

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))