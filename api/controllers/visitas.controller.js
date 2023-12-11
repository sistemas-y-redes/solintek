/**
 * @file api/controllers/visitas.controller.js
 * @description Controlador de rutas para las llamadas a la API relacionadas con info de usuarios
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

const { Router } = require('express')
const auth = require("../auth.js");

// Importar modelos necesarios para el controlador
const visitasModel = require('../models/visitas.model.js')

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
    visitasModel.fmtoken = req.user.fmtoken;
    const recordId = await visitasModel.newVisita(req.body.data)
    if (!recordId) {
        res.writeHead(500)
        res.end()
        return
    }
    
    const visitaServicio = await visitasModel.getVisitaServicioByRecordId(recordId)

    res.end(visitaServicio[0].fieldData.NumeroServicio)
})

/**
* @url /api/visitas/
* @method POST
* @description Llamada para obtener visitas
* @return {JSON}
*/

router.post('/' , [auth.validateAccess], async (req, res) => {
    visitasModel.fmtoken = req.user.fmtoken;
    const visitas = await visitasModel.findVisitas(req.body)
    res.end(JSON.stringify(visitas));
})

/**
 * @url /api/visitas/:id
 * @method  GET
 * @description Llamada para obtener los detalles de una visita
 * @return {JSON}
 */
router.get('/:id', [auth.validateAccess], async (req, res) => {
    const visita = await visitasModel.getVisita(req.params.id)
    
    // Si no ha devuelto una visita devuelve error
    if (!visita) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(visita))
})


/**
 * @url /api/visitas/:id
 * @method  GET
 * @description Llamada para obtener los detalles de una visita en una SAT
 * @return {JSON}
 */
router.get('/servicio/:id/', [auth.validateAccess], async (req, res) => {
    const visita = await visitasModel.getVisitaServicio(req.params.id)
    
    // Si no ha devuelto una visita devuelve error
    if (!visita) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(visita))
})

/**
 * @url /api/visitas/edit/:id
 * @method  PATCH
 * @description Llamada que finaliza la tarea de un proyecto en FileMaker
 * @return {JSON}
 */
router.patch("/edit/:id", [auth.validateAccess], async (req, res) => {
    console.log('estoy en el controlador');
    console.log(req.params.id);
    console.log(req.body);
    const update =  await visitasModel.updatevisitas(req.params.id, req.body);

    if (!update) {
        res.writeHead(500)
        res.end()
        return;
    }

    res.end("visitas: " + req.params.id + " cambiado")
})

router.patch("/close/:id", [auth.validateAccess], async (req, res) => {
    const update =  await visitasModel.updateVisita(req.params.id, req.body);

    if (!update) {
        res.writeHead(500)
        res.end()
        return;
    }

    res.end("visitas: " + req.params.id + " cambiado")
})

/**
 * @url /documento/new
 * @method  POST
 * @description Llamada para crear registro documento de una visita
 * @return {JSON}
 */
router.post('/documento/new', [auth.validateAccess], async (req, res) => {
    const respuesta = await visitasModel.crearRegistroDocumento(req.body);
    // Si no ha devuelto una visita devuelve error
    if (!respuesta) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(respuesta))
})

/**
 * @url /documento
 * @method  POST
 * @description Llamada para borrar documento de una visita
 * @return {JSON}
 */
router.post('/documento',[auth.validateAccess], async (req, res) => {
    const respuesta = await visitasModel.borrarDocumento(req.body)
    // Si no ha devuelto una visita devuelve error
    if (!respuesta) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(respuesta))
})

/**
 * @url /api/visitas/:id/seguimiento/
 * @method  POST
 * @description Llamada para insertar seguimiento a una visita
 * @return {JSON}
 */
router.post('/:id/seguimiento', [auth.validateAccess], async (req, res) => {
    var seguimiento
    
    if (req.body.formulario.Tipo === "M.Obra"){
        seguimiento = await visitasModel.insertarSeguimiento({...req.body.formulario, referencia: req.user.codMobra})
    }
    if (req.body.formulario.Tipo === ""){
        seguimiento = await visitasModel.insertarMaterial({...req.body.formulario})
    }

    // Si no ha devuelto un seguimiento devuelve error
    if (!seguimiento) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(seguimiento))
})

module.exports = router