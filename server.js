require('dotenv').config()

const express = require('express')

const app = express() //Here, express is a function and app is an object of it

const ejs = require('ejs')

const path = require('path') //path is an inbuilt node module that is not needed to be installed

const expressLayout = require('express-ejs-layouts')

const passport = require('passport')

const PORT = process.env.PORT || 3000 //The easier explanation of this line is as follows
// const PORT;
// if(process.envy.PORT) {
//     PORT=process.envy.PORT
// }else{
//     PORT = 3000
// }

const mongoose = require('mongoose')

const session = require('express-session')

const flash = require('express-flash')

const MongoDbStore = require('connect-mongo')(session)


//Database Connection
const url = 'mongodb://localhost/pizzaOrderTracker';
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database Connected');
}).catch(err => {
    console.log('Connection failed')
});

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended:true}));


//Session store
let mongoStore = new MongoDbStore({
                mongooseConnection: connection,
                collection: 'sessions'//Creates a collection named sessions if it does not exist and stores all the sessions here
            })

//Session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24}
}))

app.use(flash())

//Passport config(should be done after session configuration)
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())//Analysis required
app.use(passport.session())////Analysis required

//Assets
app.use(express.static('public'))//Allows home.ejs file to locate css file in public folder

app.use(express.urlencoded({ extended : false })) //Used fo enabling data to be read by postRegister method of authController file
app.use(express.json()) 

//Global middleware =>Analysis required
app.use((req, res, next) => {
    res.locals.session = req.session//This way we make session global so that it can be used in frontend
    res.locals.user = req.user
    next()
})

app.use(expressLayout) //Setting the template engine and now express will know what layout to use i.e. express-ejs-layouts
app.set('views', path.join(__dirname, '/resources/views')) //Setting direction to template files
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)//Observe that backticks are used here
})
//listen is a method of express