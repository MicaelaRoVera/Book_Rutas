const express = require('express');
const mysql = require ('mysql');
const app = express();
const util = require('util');

app.use(express.json());
app.use(express.urlencoded({extended: true }));

//CONEXION A LA BASE DE DATOS
var conexion = mysql.createConnection ({
    /*host: 'remotemysql.com',
    database:'hakESjEndG',
    user:'hakESjEndG',
    password:'2rOmKCYLE7',
    connectTimeout:30000*/
    host: 'localhost',
    database:'mybooks',
    user:'root',
    password:'root'
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

//CATEGORIA GET BASE DE DATOS
app.get('/categoria',async(req,res)=>{
    try{
        const query = 'SELECT * FROM Categoria';
        const respuesta = await qy(query);
        res.send({'respuesta': respuesta}); // tambien se puede poner un res.json
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});
//traer una categoria en especifico 
app.get('/categoria/:id',async(req,res)=>{
    try{
        const query = 'SELECT * FROM Categoria WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        res.send({'respuesta': respuesta});
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});

//Postear una nueva categoria
app.post('/categoria',async(req,res)=>{
    try{
        //valido que me manden correctamente la info
        if(!req.body.nombre){
            throw new Error ('Falta enviar el nombre');
        }
        //Verifico que no exista previamente esa categoria
        let query = 'SELECT id FROM Categoria WHERE nombre = ?';

        let respuesta = await qy(query, [req.body.nombre]);
    
        if (respuesta.length > 0) {
            res.status(200).json({response: false, mensaje: 'Esa categoria ya existe'});
            throw new Error('Esa categoria ya existe');
        }
         //Guardo la nueva categoria
        query = 'INSERT INTO Categoria (nombre) VALUE (?)';
        respuesta = await qy(query, [req.body.nombre]);

        //envio de la informacion
        res.send({'respuesta': respuesta.insertId});
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});

//borrar una categoria
app.delete('/categoria/:id', async (req, res) => {
    try{
        let query ='SELECT * FROM libro WHERE categoria_id = ?';
        let respuesta = await qy(query,[req.params.id]);
        if(respuesta.length > 0){
            throw new Error('Esa categoria tiene productos asociados, no se puede eliminar');
        }
    query ='DELETE FROM categoria WHERE id = ?';
    respuesta= await qy(query,[req.params.id]);
    res.send({'respuesta':respuesta.affectedRows})

    }catch(e){
    console.error(e.message);
    res.status(413).send({"Error inesperado":e.message});
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log(`Servidor escuchando en el puerto ${PORT}`)});