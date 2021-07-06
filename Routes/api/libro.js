const router = require('express').Router(); 
const { json } = require('express');
const qy = require('../../db');

//AGREGAR UN LIBRO NUEVO
router.post('/', async (req, res) => {
    try{  
        if(!req.body.nombre || !req.body.categoria_id){
            res.status(200).json({response: false, mensaje: 'No se enviaron los datos obligatorios'});
            throw new Error('No se enviaron los datos obligatorios')
        }

        let respuesta =  await qy('SELECT * FROM Libro WHERE nombre = ?', [req.body.nombre])
        if(respuesta.length > 0) {
            res.status(200).json({response: false, mensaje: 'Ya existe un libro con ese nombre'});
            throw new Error('Ya existe un libro con ese nombre');
        }
        //por aca hay un error, fijate como guardar o nose. 
        let descripcion = '';
        if(req.body.descripcion){
            descripcion = req.body.descripcion;
        }

        respuesta = await qy('SELECT * FROM Categoria WHERE id = ?', [req.body.categoria_id]);      
        if (respuesta.length == 0) {
            res.status(200).json({response: false, mensaje: 'No existe una categoria con ese id'});
            throw new Error('No existe una categoria con ese id');
        }no     
        
        respuesta = await qy('INSERT INTO Libro (nombre, descripcion, categoria_id) VALUES (?,?,?)',[req.body.nombre, descripcion, req.body.categoria_id]);
        res.send({'respuesta': respuesta});
        ///

    } catch (err) {
        console.error(err.message);
        res.status(413).json({ 'Se produjo un error inesperado': err.message});
    }
});

//TRAER TODAS LOS LIBROS
router.get('/',async(req,res)=>{
    try{
        const query = 'SELECT * FROM libro';
        const respuesta = await qy(query);
        res.send({'respuesta': respuesta}); // tambien se puede poner un res.json
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});

//TRAER UN LIBRO
router.get('/:id',async(req,res)=>{
    try{
        const query = 'SELECT * FROM libro WHERE id = ?';
        const respuesta = await qy(query, [req.params.id]);
        res.send({'respuesta': respuesta});
    }
    catch(e){
        console.error(e.message);
        res.status(413).send({"Error":e.message});
    }
});

//TRAER TODOS LOS LIBROS DE UNA CATEGORIA EN ESPECIFICO
router.get('/categoria/:id', async (req , res) => {

    try{                            
        
        const respuesta = await qy('SELECT * FROM libro WHERE categoria_id	 = ?', [req.params.id]);
        if (respuesta.length < 1) {
            res.status(200).json({response: false, mensaje: 'No se encontraron libros asignados a esta categoria'});
            throw new Error('No se encontraron libros asignados a esta categoria');
        }
        res.json(respuesta);

    } catch (err) {
        console.error(err.message);
        res.status(413).json({ 'error inesperado': err.message});
    }

});
//BORRA UN LIBRO
router.delete('/:id', async (req, res) => {
    try{
        let query ='SELECT * FROM libro WHERE id = ?';
        let respuesta = await qy(query,[req.params.id]);
        if(respuesta.length == 0){
            throw new Error('No se encuentra ese libro');
        }
    query ='DELETE FROM libro WHERE id = ?';
    respuesta= await qy(query,[req.params.id]);
    res.send({'respuesta':respuesta.affectedRows, mensaje: "Se borro correctamente"})

    }catch(e){
    console.error(e.message);
    res.status(413).send({"Error inesperado":e.message});
    }
});

module.exports = router;