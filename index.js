const express = require('express');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose')

// used for session cookie
const session = require('express-session')
const passport = require('passport')
const passportLocal = require('./config/passport-local-strategy')
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMiddleware = require('./config/middleware')


app.use(sassMiddleware({
    src: './assets/scss',
    dest : './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix : '/css'
}))

app.use(express.urlencoded())

const cookieParser = require('cookie-parser');
app.use(cookieParser());

// where to look static files like css,js
app.use(express.static('./assets'))


// this line must be above the routes line (line no. 11 in this case) because in the routes all the views are going to be render and before that we have to tell to the browser the layout
app.use(expressLayout)

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');


app.use(session({
    // properties need to be set  for cookie
    // name of cookie
    name: 'iFacebook',
    // TODO change the secret before deployment in production mode
    secret: 'Coder',
    // when user is not signed in we don't want to store extra data in session cookie
    saveUninitialized: false,
    // when the identity is establish then i dont't want to rewrite the identity
    resave: false,
    // session expire time
    cookie: {
        maxAge : (1000*60*100)
    },
    store: MongoStore.create({
        mongoUrl: "mongodb://localhost/iFacebook_development",
        autoRemove : 'disabled'
    }, function (err) {
        console.log(err || 'connect-mongodb setup OK');
    })
}))

app.use(passport.initialize());
app.use(passport.session())

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMiddleware.setFlash)
// use express router
// require('./routes/index) is similar to require('./routes) in this case, it by default fetch routes
app.use('/', require('./routes/index'))

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is listening at ${port}`);
})