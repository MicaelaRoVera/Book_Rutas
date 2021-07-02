const express = require('express');
const app = express();
const util = require('util');
const qy = require('./db');
//const apiRouter = require('./Routes/api');

app.use(express.json());
app.use(express.urlencoded({extended: true }));
//app.use('/api', apiRouter); //si no conecto bien se rompe aca. 
app.use(require('./Routes/api'));


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { console.log(`Servidor escuchando en el puerto`,app.get('port'))});
