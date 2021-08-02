const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')

//Middlewares

const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const admin = require('../app/http/middleware/admin')

function initRoutes(app) {
    app.get('/' , homeController().index)

    app.get('/login' , guest, authController().login)//Guest is an added middleware to prevent the display of login after the user has logged in
    app.post('/login' , authController().postLogin)

    app.get('/register' , guest, authController().register)//Guest is added to prevent the display of register after the user has logged in
    app.post('/register' , authController().postRegister)
    app.post('/logout', authController().logout)


    app.get('/cart' , cartController().cart)
    app.post('/update-cart', cartController().update)

    //Customer routes
    app.get('/customers/orders', auth, orderController().index)    
    app.post('/orders', auth,  orderController().store)

    //Admin routes
    app.get('/admin/orders', admin, AdminOrderController().index)

}

module.exports = initRoutes