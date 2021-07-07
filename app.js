const express = require('express');
const app = express();
const util = require('util');
const qy = require('./db');
const cors = require('cors');;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true }));
app.use(require('./Routes/api'));


app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => { console.log(`Servidor escuchando en el puerto`,app.get('port'))});
