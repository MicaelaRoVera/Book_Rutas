/*POST '/categoria' recibe: {nombre: string} retorna: status: 200, {id: numerico, nombre: string} - status: 413,
{mensaje: <descripcion del error>} que puede ser: "faltan datos", "ese nombre de categoria ya existe", "error inesperado"

GET '/categoria' retorna: status 200  y [{id:numerico, nombre:string}]  - status: 413 y []

GET '/categoria/:id' retorna: status 200 y {id: numerico, nombre:string} - status: 413,
{mensaje: <descripcion del error>} que puede ser: "error inesperado", "categoria no encontrada"

DELETE '/categoria/:id' retorna: status 200 y {mensaje: "se borro correctamente"} - status: 413,
{mensaje: <descripcion del error>} que puese ser: "error inesperado", "categoria con libros asociados,
no se puede eliminar", "no existe la categoria indicada"

No se debe implementar el PUT */