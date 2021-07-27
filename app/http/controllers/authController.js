const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req, res) {
            res.render('auth/login')
        },
        postLogin(req, res, next) {
            passport.authenticate('local', (err, user, info) => {
                //Done is the function we are passing here
                //info contains the message of done
                //ex: if done is done(null, false, { message: 'No user with this email'}), err here is null, user is false 
                //and info is 'No user with this email'
                if(err) {
                    req.flash('error', info.message)//Flash is for displaying on frontend
                    return next(err)
                }

                if(!user) {
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message)
                        return next(err)
                    }

                    return res.redirect('/')
                })

            })(req, res, next)
        },
        register(req, res) {
            res.render('auth/register')
        },
        async postRegister(req, res){
            const {name, email, password} = req.body
            //We need to make a collection named users in our database to store user's login credentials 
            //and for that, make a model first named user.
            //Check validity
           //console.log(req.body)
            if (!name || !email || !password) {
                //console.log(req.body)
                req.flash('error', 'All the fields are required')
                //All the middlewares like flash, session can be available from request
                return res.redirect('/register')
            }
            
            //Check if the email is already used
            User.exists({ email: email}, (err, result) => {
                if(result) {
                    req.flash('error', 'Entered email id is already taken')
                    return res.redirect('/register')
                }
            })
            
            //Hash password
            const hashedPassword = await bcrypt.hash(password, 10)//Await is used here because the function postRegister is asynchronous

            //Create a user
            const user = new User({
                name: name, 
                email: email,
                password: hashedPassword
            })

            user.save().then((user) => {
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/register')
            })


        },
        logout(req, res) {
            req.logout()//Application of passport
            return res.redirect('/login')
        }

    }
}


module.exports = authController