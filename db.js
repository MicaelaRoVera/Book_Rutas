const util = require('util');
const mysql = require('mysql');

var conexion = mysql.createConnection ({
    host: 'remotemysql.com',
    database:'hakESjEndG',
    user:'hakESjEndG',
    password:'2rOmKCYLE7',
    connectTimeout:30000
    /*host: 'localhost',
    database:'mybooks',
    user:'root',
    password:'root' */
})

conexion.connect((error)=>{
    if(error){
        throw error;
    }else{
        console.log('Conexion a la base de datos exitosa');
    }
});
//conexion.end();

const qy= util.promisify(conexion.query).bind(conexion); //permite el uso de asyn-await

module.exports = qy; 

