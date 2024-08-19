const express = require('express');
const config = require('./server/config.js');

// database 
require('./database.js');

const app = config(express());


/// SERVER
app.listen(app.get('port'), () => {
    console.log(`Server on port http://localhost:${app.get('port')}`);
})
 