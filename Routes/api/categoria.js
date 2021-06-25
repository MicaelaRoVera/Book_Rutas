const router = require('express').Router(); 
const { json } = require('express');
const qy = require('../../db'); 


router.get('/',async(req,res)=>{
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

module.exports = router;
/*
//TRAER UNA SOLA CATEGORIA POR ID
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

//AGREGAR UNA NUEVA CATEGORIA
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

//BORRAR UNA CATEGORIA
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

*/




