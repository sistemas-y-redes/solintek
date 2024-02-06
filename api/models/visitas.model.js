const visitasModel = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });
const fs = require('fs')
const FormData = require('form-data')

const serverName = process.env.FM_SERVER;
const database = process.env.FM_DATABASE;

visitasModel.fmtoken = "";
visitasModel.usuario = "";

visitasModel.findVisitas = async () => {
  const query = {
    query: [
      {
        EstadoServicio: "PENDIENTE",
      },
    ],
    sort: [
      {
        fieldName: "Fecha",
        sortOrder: "descend",
      },
    ],
    limit: 15,
  };

  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/_find`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );
    const visitas = respuesta.data.response.data;


    return visitas;
  } catch (error) {
    console.log(error);
    return false;
  }
};

visitasModel.newVisita = async (sat) => {
  const data = {
    fieldData: {
      Tec: sat.tec,
      Prioridad: "NORMAL",
      Tipo: "SAT",
      NumeroVisita: sat.numeroServicio,
    },
  };

  let respuesta = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasServiciosAPI/records/`,
    data,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${visitasModel.fmtoken}`,
      },
    }
  );


  if (!respuesta) {
    console.log("Error al crear el nuevo registro en visitas");
    return false;
  }

  const dataUbicacion = {
    fieldData: {
      ClienteAccion: "INICIO VISITA",
      Direccion: "",
      fecha: sat.fecha,
      FechaHora: sat.fecha + " " + sat.horaActual,
      IdLineaVisita: "",
      idSat: "",
      Notas: "",
      Tecnico: sat.tec,
      Ubicacion: sat.UserLocation
    },
  };

  let respuestaUbi = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/${database}/layouts/UbicaciónApi/records`,
    dataUbicacion,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${visitasModel.fmtoken}`,
      },
    }
  );

  if (!respuestaUbi) {
    console.log("Error al guardar la ubicación");
    return false;
  }

  return respuesta.data.response.recordId;
};

visitasModel.getVisitaServicio = async (id) => {
  let idSlug = id.substring(0, 1) + "/" + id.substring(1);
  const query = {
    query: [{ NumeroServicio: idSlug }],
    sort: [
      {
        fieldName: "fecha",
        sortOrder: "descend",
      },
    ],
    limit: 15,
  };

  try {
    const list = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/_find`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          Authorization: `Bearer ${visitasModel.fmtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const properList = list.data.response.data;
    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};

visitasModel.getVisitaServicioByRecordId = async (id) => {
  try {
    const list = await axios.get(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasServiciosAPI/records/${id}`,
      {
        httpsAgent: httpsAgent,
        headers: {
          Authorization: `Bearer ${visitasModel.fmtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const properList = list.data.response.data;

    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};

visitasModel.getVisita = async (id) => {
  const query = {
    query: [{ NumeroServicio: id }],
    sort: [
      {
        fieldName: "Fecha",
        sortOrder: "descend",
      },
    ],
    limit: 15,
  };

  try {
    const list = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/_find`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          Authorization: `Bearer ${visitasModel.fmtoken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const properList = list.data.response.data;
    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};
visitasModel.crearRegistroDocumento = async (req) => {
  let IdVisita = req.formulario.IdVisita;
  let NumeroVisitaServicio = req.formulario.NumeroVisitaServicio;
  const query = {
    fieldData: {
      IdVisita: IdVisita,
    },
  };
  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/DocumentosVisitasAPI/records/`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );
    if (!respuesta) {
      console.log("Error al crear el nuevo registro");
      return false;
    }
    const nuevoRegistro = respuesta.data.response.recordId;
    return nuevoRegistro;
  } catch (error) {
    console.log("error en back", error);
    return;
  }
};

visitasModel.borrarDocumento = async (idVisita, id) => {
  let record = idVisita.IdVisita2;

  try {
    let respuesta = await axios.delete(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/DocumentosVisitasAPI/records/${record}/`,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );
    if (respuesta) {
      return true;
    }
  } catch (error) {
    console.log("error en back", error);
    return;
  }
};

visitasModel.insertarSeguimiento = async (formulario) => {
  if (formulario.linFecha.length === 0) return false;
  if (formulario.HoraInicio.length === 0) return false;
  if (formulario.linartcodref.length === 0) return false;
  if (formulario.DescripciónArt.length === 0) return false;

  const horaInicial = formulario.HoraInicio.split(":");
  const horaFinal = formulario.HoraFin.split(":");

  let segundosHoraInicial =
    +horaInicial[0] * 60 * 60 + +horaInicial[1] * 60 + +horaInicial[2];
  let segundosHoraFinal =
    +horaFinal[0] * 60 * 60 + +horaFinal[1] * 60 + +horaFinal[2];

  if (segundosHoraFinal < segundosHoraInicial) return false;
  if (segundosHoraInicial > segundosHoraFinal) return false;
  if (segundosHoraInicial === segundosHoraFinal) return false;

  const fechaPartida = formulario.linFecha.split("/");
  let fechaArray = fechaPartida[0];
  fechaArray = fechaArray.split("-");
  const fechaModificada =
    fechaArray[1] + "/" + fechaArray[2] + "/" + fechaArray[0];

  const query = {
    fieldData: {
      linFecha: fechaModificada,
      HoraInicioReal: formulario.HoraInicio,
      HoraFinReal: formulario.HoraFin,
      DescripciónArt: formulario.DescripciónArt,
      linartcodref: formulario.linartcodref,
      NumeroServicio: formulario.NumeroServicio,
      Tec: formulario.Tec,
      Tipo: formulario.Tipo,
    },
  };
  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/SeguimientoVisitasAPI/records`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );
    const response = respuesta.data.response;
    return response;
  } catch (error) {
    console.log("error back", error);
    return;
  }
};

visitasModel.insertarMaterial = async (formulario) => {
  if (formulario.Descripcion.length === 0) return false;

  const query = {
    fieldData: {
      NumeroServicio: formulario.NumeroServicio,
      Tec: formulario.Tec,
      DescripciónArt: formulario.Descripcion,
      Tipo: formulario.Tipo,
      linunidades: formulario.Unidades,
    },
  };


  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/SeguimientoVisitasAPI/records`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );
    const response = respuesta.data.response;
    return response;
  } catch (error) {
    console.log("error back", error);
    return;
  }
};

/**
 * @name        updateVisita
 * @description Actualiza una tarea en Filemaker
 * @param       {object} data       Los datos a modificar
 * @returns     {bool}
 */
visitasModel.updateVisita = async (req, recordId) => {


  // Primero, actualiza el estado de la visita
  const dataEstado = {
    fieldData: {
      EstadoServicio: "TERMINADO"
    }
  };

  try {
    const updateEstado = await axios.patch(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/records/${recordId}`,
      dataEstado,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );

    // Luego, sube la firma
    let documento = fs.createReadStream(req[0].destination + req[0].filename);
    const formdata = new FormData();
    formdata.append("upload", documento);

    const updateFirma = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/records/${recordId}/containers/FirmaCliente/1`,
      formdata,
      {
        httpsAgent: httpsAgent,
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${visitasModel.fmtoken}`,
          ...formdata.getHeaders(),
        },
      }
    );

    // Asegúrate de manejar correctamente las respuestas de las peticiones
    if (updateEstado.data && updateFirma.data) {
      return true; // Retorna true si ambas actualizaciones fueron exitosas
    }
  } catch (error) {
    console.error("Error al actualizar la visita y subir la firma:", error);
    return false;
  }
};
visitasModel.updatevisitas = async (id, req) => {



  const data = {
    fieldData: {
      "DescripciónArt": req.DescripciónArt,
      "linartcodref": req.linartcodref,
      "HoraFinReal": req.HoraFinReal,
      "HoraInicioReal": req.HoraInicioReal,
    }
  };
  try {

    let respuesta = await axios.patch(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/SeguimientoVisitasAPI/records/${id}`,
      data,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );

    return respuesta.data.response.modId;
  } catch (err) {
    console.log(err);
    return false;
  }

};

visitasModel.updateVisitaWork = async (req) => {

  recordId = req.idVisita;

  const data = {
    fieldData: {
      TareaInicial: req.TrabajoRealizado
    }
  };

  try {

    let respuesta = await axios.patch(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/VisitasAPI/records/${recordId}`,
      data,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );

    return respuesta.data.response.modId;
  } catch (err) {
    console.log(err);
    return false;
  }

};

visitasModel.getArticulos = async (req) => {

  try {
    const query = {
      query: [
        {
          CodigoEmpresa: "3",
          Tipo: "M.Obra",
        },
      ],
    };
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/${database}/layouts/ArtículosApi/_find`,
      query,
      {
        httpsAgent: httpsAgent,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${visitasModel.fmtoken}`,
        },
      }
    );

    const properList = respuesta.data.response.data;
    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = visitasModel;
