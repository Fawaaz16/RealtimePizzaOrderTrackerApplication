function guest (req, res, next) {
    if(!req.isAuthenticated()) {//isAuthenticated is used to check whether user is loged in or not
        return next()
    }
    return res.redirect('/')
}

module.exports = guest