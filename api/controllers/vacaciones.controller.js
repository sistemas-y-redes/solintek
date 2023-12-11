/**
 * @file api/controllers/vacaciones.controller.js
 * @description Controlador de rutas para las llamadas a la API relacionadas con info de usuarios
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

const { Router } = require('express')
const auth = require("../auth.js");

// Importar modelos necesarios para el controlador
const vacacionesModel = require('../models/vacaciones.model.js');

// Importamos los módulos necesarios para el funcionamiento del controlador
const router = Router()
const bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/**
* @url /api/vacaciones/new
* @method POST
* @description Llamada para crear una nueva visita
* @return {JSON}
*/
router.post('/new', [auth.validateAccess], async (req, res) => {
    vacacionesModel.fmtoken = req.user.fmtoken;

    const recordId = await vacacionesModel.newVacaciones(req.body)
    if (!recordId) {
        res.writeHead(500)
        res.end()
        return
    }
    
    res.end(recordId)
})

/**
* @url /api/vacaciones/find
* @method POST
* @description Llamada para crear una nueva visita
* @return {JSON}
*/
router.post('/find', [auth.validateAccess], async (req, res) => {
    vacacionesModel.fmtoken = req.user.fmtoken;
    if(!req.body.Tec){
        res.writeHead(500)
        res.end()
        return 
    }
    const vacaciones = await vacacionesModel.getvacacionesByCuentaFM(req.body.Tec)
    if (!vacaciones) {
        res.writeHead(200)
        res.end('Vacio!')
        return
    }
    
    
    res.end(JSON.stringify(vacaciones))
})


/**
 * @url /api/vacaciones/:id
 * @method  GET
 * @description Llamada para obtener los detalles de una visita
 * @return {JSON}
 */
router.get('/:id', [auth.validateAccess], async (req, res) => {
    const vacaciones = await vacacionesModel.getvacacionesByRecordId(req.params.id)
    
    // Si no ha devuelto una visita devuelve error
    if (!vacaciones) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(vacaciones))
})



/**
 * @url /api/vacaciones/edit/:id
 * @method  PATCH
 * @description Llamada que finaliza la tarea de un proyecto en FileMaker
 * @return {JSON}
 */
router.patch("/edit/:id", [auth.validateAccess], async (req, res) => {
    const update =  await vacacionesModel.updatevacaciones(req.params.id, req.body);

    if (!update) {
        res.writeHead(500)
        res.end()
        return;
    }

    res.end("vacaciones: " + req.params.id + " cambiado")
})


module.exports = router