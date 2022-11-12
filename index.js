const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const expressLayout = require('express-ejs-layouts');
const db = require('./config/mongoose')

app.use(express.urlencoded())

app.use(cookieParser());

// where to look static files like css,js
app.use(express.static('./assets'))


// this line must be above the routes line (line no. 11 in this case) because in the routes all the views are going to be render and before that we have to tell to the browser the layout
app.use(expressLayout)

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


// use express router
// require('./routes/index) is similar to require('./routes) in this case, it by default fetch routes
app.use('/',require('./routes/index'))


// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is listening at ${port}`);
})