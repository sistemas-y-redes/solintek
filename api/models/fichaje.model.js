const fichajeModel = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const serverName = process.env.FM_SERVER;

fichajeModel.fmtoken = "";
fichajeModel.usuario = "";

fichajeModel.findFichaje = async (req) => {

  const query = {
    query: [
      {
        TecCod: req.Tec,
      },
    ],
  };
  if (req.Fecha) {
    query.query[0].Fecha = req.Fecha;
  }

  console.log(query)
  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/InformesApi/_find`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${fichajeModel.fmtoken}`,
        },
      }
    );
    const fichaje = respuesta.data.response.data;
    console.log(fichaje);
    return fichaje;
  } catch (error) {
    console.log("Error en encontrar Fichaje: " + error);
    return false;
  }
};

/**
 * @name        newFichaje
 * @description Crea un fichaje en Filemaker
 * @param       {object} req        Los datos para crear un registro en el FM
 * @param       {object} data       Los datos a crear
 * @returns     {bool}
 */

fichajeModel.newFichaje = async (req) => {
  console.log(req)
  const data = {
    fieldData: {
      TecCod: req.Tec,
      ETaller: req.horaEntrada
    },
  };

  let respuesta = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/InformesApi/records`,
    data,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fichajeModel.fmtoken}`,
      },
    }
  );

  console.log(respuesta)
  if (!respuesta) {
    console.log("Error al crear nuevo informe");
    return false;
  }

  const dataUbicacion = {
    fieldData: {
      ClienteAccion: "INICIO JORNADA",
      Direccion: "",
      fecha: req.fecha,
      FechaHora: req.fecha + " " + req.horaEntrada,
      IdLineaVisita: "",
      idSat: "",
      Notas: "",
      Tecnico: req.Tec,
      Ubicacion: req.UserLocation
    },
  };

  let respuestaUbi = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/UbicaciónApi/records`,
    dataUbicacion,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fichajeModel.fmtoken}`,
      },
    }
  );

  if (!respuestaUbi) {
    console.log("Error al guardar la ubicación");
    return false;
  }

  return respuesta.data.response.recordId;
};

/**
 * @name        getFichajeByRecordId
 * @description Obtiene el fichaje según la ID
 * @param       {object} id        El recordId   
 * @returns     {object}      
 */

fichajeModel.getFichajeByRecordId = async (id) => {
  try {
    const fichaje = await axios.get(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/InformesApi/records/${id}`,
      {
        httpsAgent: httpsAgent,
        headers: {
          Authorization: `Bearer ${fichajeModel.fmtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const properList = fichaje.data.response.data;

    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};



fichajeModel.updateFichaje = async (id, req) => {
  const data = {
    fieldData: {
      STaller: req.horaSalida
    }
  }

  const update = await axios.patch(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/InformesApi/records/${id}`,
    data,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fichajeModel.fmtoken}`,
      },
    }
  );

  const dataUbicacion = {
    fieldData: {
      ClienteAccion: "FIN JORNADA",
      Direccion: "",
      fecha: req.fecha,
      FechaHora: req.fecha + " " + req.horaSalida,
      IdLineaVisita: "",
      idSat: "",
      Notas: "",
      Tecnico: req.Tec,
      Ubicacion: req.UserLocation
    },
  };

  let respuestaUbi = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/UbicaciónApi/records`,
    dataUbicacion,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${fichajeModel.fmtoken}`,
      },
    }
  );

  if (!respuestaUbi) {
    console.log("Error al guardar la ubicación");
    return false;
  }

  return update ? true : false;
  
};

module.exports = fichajeModel;
