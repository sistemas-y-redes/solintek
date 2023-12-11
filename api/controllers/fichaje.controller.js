/**
 * @file api/controllers/visitas.controller.js
 * @description Controlador de rutas para las llamadas a la API relacionadas con info de usuarios
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

const { Router } = require('express')
const auth = require("../auth.js");

// Importar modelos necesarios para el controlador
const fichajeModel = require('../models/fichaje.model.js')

// Importamos los módulos necesarios para el funcionamiento del controlador
const router = Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/**
* @url /api/visitas/new
* @method POST
* @description Llamada para crear una nueva visita
* @return {JSON}
*/
router.post('/new', [auth.validateAccess], async (req, res) => {
    fichajeModel.fmtoken = req.user.fmtoken;
    const recordId = await fichajeModel.newFichaje(req.body)
    if (!recordId) {
        res.writeHead(500)
        res.end()
        return
    }
    
    res.end(recordId)
})

/**
* @url /api/visitas/new
* @method POST
* @description Llamada para crear una nueva visita
* @return {JSON}
*/
router.post('/find', [auth.validateAccess], async (req, res) => {
    fichajeModel.fmtoken = req.user.fmtoken;
    const fichaje = await fichajeModel.findFichaje(req.body)
    if (!fichaje) {
        res.writeHead(200)
        res.end('Vacio!')
        return
    }
    
    
    res.end(JSON.stringify(fichaje))
})


/**
 * @url /api/visitas/:id
 * @method  GET
 * @description Llamada para obtener los detalles de una visita
 * @return {JSON}
 */
router.get('/:id', [auth.validateAccess], async (req, res) => {
    const fichaje = await fichajeModel.getFichajeByRecordId(req.params.id)
    
    // Si no ha devuelto una visita devuelve error
    if (!fichaje) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(fichaje))
})



/**
 * @url /api/visitas/edit/:id
 * @method  PATCH
 * @description Llamada que finaliza la tarea de un proyecto en FileMaker
 * @return {JSON}
 */
router.patch("/edit/:id", [auth.validateAccess], async (req, res) => {
    console.log(req.params.id, req.body)
    const update = fichajeModel.updateFichaje(req.params.id, req.body);

    if (!update) {
        res.writeHead(500)
        res.end()
        return;
    }

    res.end("Fichaje: " + req.params.id + " cambiado")
})


module.exports = router