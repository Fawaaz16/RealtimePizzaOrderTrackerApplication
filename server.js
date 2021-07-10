const express = require('express')

const app = express() //Here, express is a function and app is an object of it

const ejs = require('ejs')

const path = require('path') //path is an inbuilt node module that is not needed to be installed

const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3000 //The easier explanation of this line is as follows
// const PORT;
// if(process.envy.PORT) {
//     PORT=(process.envy.PORT
// }else{
//     PORT = 3000
// }

app.get('/' , (req, res) => {
    res.render('home')
})

app.use(expressLayout) //Setting the template engine and now express will know what layout to use i.e. express-ejs-layouts
app.set('views', path.join(__dirname, '/resources/views')) //Setting direction to template files
app.set('view engine', 'ejs')

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)//Observe that backticks are used here
})
//listen is a method of express