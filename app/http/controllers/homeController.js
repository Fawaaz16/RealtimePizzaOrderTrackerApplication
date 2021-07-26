const Menu = require('../../models/menu')

function homeController() {
    return {
        async index(req, res) {
            const pizzas = await Menu.find()
            //Does Menu.find() here find the collection menus from the database it is connected to(i.e pizzaOrderTracker)?
            //Is menus derived from Menu by lower casing the first letter and making it plural and find the resultant collection in the database? 
            //console.log(pizzas)
            return res.render('home', { pizzas: pizzas })//Pizzas here is array of objects i.e the number of menu items

            // Menu.find().then(function(pizzas) {            
            //     console.log(pizzas)
            //     return res.render('home', { pizzas: pizzas })//Pizzas here is array of objects i.e the number of menu items
            //})
        }
    }
}


module.exports = homeController

//homeController here is a factory function(like class). A factory function is a function that returns objects.
//We can call the object index of the factory function homeController.