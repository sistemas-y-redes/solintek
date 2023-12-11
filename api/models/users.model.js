const usersModel = {};
const jwt = require("jsonwebtoken");
const axios = require("axios");
const https = require("https");
const serverName = process.env.FM_SERVER;
const visitasModel = require('../models/visitas.model.js')
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

usersModel.fmtoken = "";

usersModel.doLogin = async ({ usuario, password }) => {
  try {
    let respuesta = await axios.post(`https://${serverName}/fmi/data/v1/databases/Acceso/sessions`, {},
      {
        auth: { username: usuario, password: password },
        httpsAgent: httpsAgent,
        headers: { 'Content-Type': 'application/json', },
      })

    if (respuesta) {
      visitasModel.usuario = usuario;
    }

    const fmtoken = respuesta.data.response.token;
    console.log('fmtoken:', fmtoken);  // Depuración: imprime el fmtoken

      const queryBody = {
        "query": [
          {
            "CódigoFM": usuario
          }
        ]
      };


      const userdata = await axios.post(`https://${serverName}/fmi/data/v1/databases/Acceso/layouts/PersonalAPI/_find`,
        queryBody,
        {
          httpsAgent: httpsAgent,
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${fmtoken}` },
        }
      );
    

    if (!userdata || !userdata.data || !userdata.data.response || !userdata.data.response.data[0]) {
      throw new Error('Datos de usuario inválidos desde la API de FileMaker.');
    }
    console.log(userdata.data)
    let user = {
      username: usuario,
      password,
      fmtoken,
      EmpleadoNombre: userdata.data.response.data[0].fieldData.EmpleadoNombre
    }
    
    const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "24h" });
    return token;

  } catch (error) {
    console.log('Error:', error);
    if (error.response) {
      /* El servidor respondió con un estado fuera del rango de 2xx
      console.log('Data:', error.response.data);
      console.log('Status:', error.response.status);
      console.log('Headers:', error.response.headers);
      */
    }
    return error
  }
}

usersModel.getAllUsers = async () => {
  try {
    let respuesta = await axios.get(`https://${serverName}/fmi/data/v1/databases/Acceso/layouts/PersonalAPI/records`,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${usersModel.fmtoken}`,
        },
      }
    )
    return respuesta.data.response.data
  } catch (error) {
    console.log(error)
    return false
  }
}


usersModel.doLogout = async token => {
  try {
    let respuesta = await axios.delete(`https://${serverName}/fmi/data/v1/databases/Acceso/sessions/${token}`, {},
      {
        httpsAgent: httpsAgent,
        headers: { 'Content-Type': 'application/json', },
      })
    if (respuesta) return true
  } catch (error) {
    console.log(error.reponse.data);
    return false;
  }
}

module.exports = usersModel