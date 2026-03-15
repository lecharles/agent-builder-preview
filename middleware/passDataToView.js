const passDataToView = (req, res, next) => {
    // if there is a user in the session, make it available in res.locals for the views, otherwise, set it to null
    res.locals.user = req.session.user ? req.session.user : null; 
    next()
}

module.exports = passDataToView