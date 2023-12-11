/**
 * @file api/controllers/users.controller.js
 * @description Controlador de rutas para las llamadas a la API relacionadas con info de usuarios
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

const { Router } = require('express')

const auth = require("../auth.js");

// Importar modelos necesarios para el controlador
const usersModel = require('../models/users.model.js')

// Importamos los módulos necesarios para el funcionamiento del controlador
const router = Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

/**
 * @url /api/usuarios/login
 * @method POST
 * @description Llamada que devuelve si el login en Filemaker es correcto
 * @return {JSON}
 */

router.post('/login', async (req, res) => {
    // Comprobamos que los parámetros son correctos
    if (!req.body.usuario || !req.body.password) {
      res.writeHead(400);
      res.end(JSON.stringify({code: 400, message: "Error iniciando sesión, no se han enviado los parámetros requeridos para completar esta acción"}));
      return;
    }

    // Generamos el token de sesión iniciando sesión en Filemaker mediante el model
    const token = await usersModel.doLogin(req.body)

    // Si el inicio de sesión no es correcto, devolvemos el error
    if (!token) {
        res.writeHead(401);
        res.end("token nulo");
        return "no hay token";
    }

    res.end(JSON.stringify(token));
})

/**
 * @url /api/usuarios/logout
 * @method  POST
 * @description Llamada que devuelve la información del usuario logeado
 * @return {JSON}
 */
router.post("/logout", [auth.validateAccess], async (req, res) => {
    const token = req.user.fmtoken
    const logout = await usersModel.doLogout(token)

    if (!logout) {
        res.writeHead(400);
        res.end("error cerrando sesión");
        return;
    }

    console.log("logged out")
    
    res.end("logged out")
  });

/**
 * @url /api/usuarios/list
 * @method  GET
 * @description Llamada que lista los técnicos de la tabla de empleados
 * @return {JSON}
 */
router.get("/list", [auth.validateAccess], async (req, res) => {
  usersModel.fmtoken = req.user.fmtoken;
  const users = await usersModel.getAllUsers()

  if (!users) {
    res.writeHead(500);
    res.end("Error obteniendo la lista de usuarios");
    return;
  }

  res.end(JSON.stringify(users));
})

/**
 * @url /api/usuarios/whoami
 * @method  POST
 * @description Llamada que devuelve la información del usuario logeado
 * @return {JSON}
 */
router.post("/whoami", [auth.validateAccess], (req, res) => {
    res.end(JSON.stringify(req.user));
  });
  

module.exports = router