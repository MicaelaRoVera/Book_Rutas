const router = require('express').Router(); 
const { json } = require('express');
const qy = require('../../db');

//AGREGAR UN LIBRO NUEVO: agregar lo de editorial tambien
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

        let descripcion = '';
        if(req.body.descripción){
            descripcion = req.body.descripción;
        }

        respuesta = await qy('SELECT * FROM Categoria WHERE id = ?', [req.body.categoria_id]);      
        if (respuesta.length == 0) {
            res.status(200).json({response: false, mensaje: 'No existe una categoria con ese id'});
            throw new Error('No existe una categoria con ese id');
        }     
        
        respuesta = await qy('INSERT INTO Libro (nombre, descripción, categoria_id) VALUES (?,?,?)',[req.body.nombre, descripcion, req.body.categoria_id]);
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

//EDITAR LA DESCRIPCION DE UN LIBRO: eanalizar codigo

router.put('/:id', async (req, res) => {
    try{
         //verifico que mande todos los datos necesarios
        if(!req.body.descripción || !req.body.Editorial){
            res.status(200).json({response: false, mensaje: 'No enviaste los datos necesarios para efectuar un cambio'});
            throw new Error('No se enviaron los datos obligatorios')
        } 

        //id nombre descripcion categoria_id persona_id
        let consulta = await qy('SELECT * FROM Libro WHERE id = ?', [req.params.id]);
        // res.json(consulta);
        
        if(consulta.length < 1){
            res.status(200).json({response: false, mensaje: 'No se encontro el libro'});
            throw new Error('No se encontro el libro');
        }

        let descripcion = null;

        if((req.body.descripción != null && req.body.descripción != '')){
            descripcion = req.body.descripción;
        }else{
            descripcion = consulta[0].descripción;
        }

        let editorial = null;

        if((req.body.Editorial != null && req.body.Editorial != '')){
            editorial = req.body.Editorial;
        }else{
            editorial = consulta[0].Editorial;
        }

        let post = await qy('UPDATE Libro SET descripción = ?, Editorial = ?  WHERE id = ?', [descripcion,editorial, consulta[0].id]);

        let consulta_final = await qy('SELECT * FROM Libro WHERE id = ?', [consulta[0].id])
        res.status(200).json({response: true, consulta_final});

    }catch (err) {
        console.error(err.message);
        res.status(413).json({ 'error inesperado encontrado': err.message});
    }
});
//ANDA TODO OK
module.exports = router;