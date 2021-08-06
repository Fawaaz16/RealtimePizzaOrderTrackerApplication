const Order = require('../../../models/order')
const moment = require('moment')

function orderController () {
    return {
        store(req, res) {
            const { phone, address} = req.body

            if(!phone || !address) {
                req.flash('error', 'Enter all the fields')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,//We can get user from req with the help of passport library
                items: req.session.cart.items,
                phone: phone,
                address: address
            })
            order.save().then(result => {
                req.flash('success', 'Order placed successfully')
                delete req.session.cart
                return res.redirect('/customers/orders')
            }).catch(err => {
                req.flash('error', 'Something went wrong')
                return res.redirect('/cart')
            })

        },
        async index(req, res) {
            const orders = await Order.find({ customerId: req.user._id}, null, { sort:{ 'createdAt': -1 } })
            res.render('customers/orders', {orders: orders, moment: moment})
        },
        async show(req, res) {
            const order = await Order.findById(req.params.id)//:id is a param
            // Authorize user
            if(req.user._id.toString() === order.customerId.toString()) {
                return res.render('customers/singleOrder', { order: order })
            }
            return  res.redirect('/')
        }
    }
}


module.exports = orderController