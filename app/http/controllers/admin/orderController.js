const order = require('../../../models/order')

function orderController() {
    return {
        index(req, res) {
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).
           populate('customerId', '-password').exec((err, orders) => {//populate is used for displaying the data of a customer given the customer id
               if(req.xhr) {//The case of ajax call
                   return res.json(orders)
               } else {//The case of no ajax call
                return res.render('admin/orders')
               }
           })
        }
    }
}

module.exports = orderController

