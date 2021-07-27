const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const guest = require('../app/http/middleware/guest')

function initRoutes(app) {
    app.get('/' , homeController().index)

    app.get('/login' , guest, authController().login)//Guest is an added middleware to prevent the display of login after the user has logged in
    app.post('/login' , authController().postLogin)

    app.get('/register' , guest, authController().register)//Guest is added to prevent the display of register after the user has logged in
    app.post('/register' , authController().postRegister)
    app.post('/logout', authController().logout)


    app.get('/cart' , cartController().cart)
    app.post('/update-cart', cartController().update)

}

module.exports = initRoutes