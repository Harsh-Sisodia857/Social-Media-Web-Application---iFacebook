const express = require('express');

const port = 8000;
const app = express();

// use express router
// require('./routes/index) is similar to require('./routes) in this case, it by default fetch routes
app.use('/',require('./routes/index'))


app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is listening at ${port}`);
})