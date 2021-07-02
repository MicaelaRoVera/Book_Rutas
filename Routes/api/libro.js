const router = require('express').Router(); 
const { json } = require('express');
const qy = require('../../db');

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

module.exports = router;