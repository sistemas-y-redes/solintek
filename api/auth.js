/**
 * @file api/auth.js
 * @description Funciones relacionadas con la autenticación en la API
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const jwt = require("jsonwebtoken");
require("dotenv").config();

let auth = {}

/**
 * @name        checkFilemakerToken
 * @description Comprueba si un token de Filemaker es válido
 * @param       {string} token  El token a comprobar
 * @param       {string} layout El layout en el que consultar
 * @returns     {bool}
 */
auth.checkFilemakerToken = async token => {
  return await axios.get(`https://${process.env.FM_SERVER}/fmi/data/v1/databases/${process.env.FM_DATABASE}/layouts/`,
    { 
      httpsAgent: httpsAgent,
      headers: { Authorization: `Bearer ${token}` } 
    }
  )
    .then(response => {
      return true;
    })
    .catch(error => {
      console.log(error)
      return false;
    })
}

/**
 * @name        renewFilemakerToken
 * @description Renueva el token de Filemaker
 * @param       {object} user ELos datos del usuario para iniciar sesión
 * @returns     {string}
 */
auth.renewFilemakerToken = async ({ usuario, password }) => {
  console.log("renovar token")
  return axios
    .post(
      `https://${process.env.FM_SERVER}/fmi/data/v1/databases/${process.env.FM_DATABASE}/sessions`,
      {},
      {
        auth: { username: usuario, password: password },
        httpsAgent: httpsAgent,
        headers: { "Content-Type": "application/json" },
      }
    )
    .then(response => (response.data.response.token))
    .catch(error => {
      console.log(error);
      return false;
    });
}

/**
 * @name validateAccess
 * @description Funcion utilizada como Middleware en las llamadas a la API para validar el acceso
 */
auth.validateAccess = async (req, res, next) => {
  const authHeader = !req.body.headers ? req.headers.authorization : req.body.headers["Authorization"]
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    res.writeHead(401);
    res.end("token nulo");
    return;
  }

  // Comprobamos si el token es válido
  try {
    let jwtData = await jwt.verify(token, process.env.JWT_SECRET);

    // Comprobamos si el token de Filemaker es válido. Si no lo es, lo actualizamos para evitar errores en llamadas
    const isFmTokenValid = await auth.checkFilemakerToken(jwtData.fmtoken);
    if (!isFmTokenValid) jwtData.fmtoken = await auth.renewFilemakerToken({ usuario: jwtData.username, password: jwtData.password });
    
    // Devolvemos la información en el middleware
    req.user = { valid: true, username: jwtData.username, id: jwtData.id, fmtoken: jwtData.fmtoken, jwt: token, codMobra: jwtData.codMobra };
    next();
  } catch (error) {
    console.log(error);
    res.writeHead(401);
    res.end(JSON.stringify({ code: 401, message: "Acceso no permitido, token no válido" }));
    return;
  }
}


module.exports = auth;
