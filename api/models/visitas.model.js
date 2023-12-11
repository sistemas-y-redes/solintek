const visitasModel = {};

const axios = require("axios");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const serverName = process.env.FM_SERVER;

visitasModel.fmtoken = "";
visitasModel.usuario = "";

visitasModel.findVisitas = async (req) => {
  console.log("req", req);
  const query = {
    query: [
      {
        Tec: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec2: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec2: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec3: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec3: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec4: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec4: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec5: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec5: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec6: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec6: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec7: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec7: req.user,
        EstadoServicio: "EMPEZADO",
      },
      {
        Tec8: req.user,
        EstadoServicio: "PENDIENTE",
      },
      {
        Tec8: req.user,
        EstadoServicio: "EMPEZADO",
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
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasAPI/_find`,
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
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasServiciosAPI/records/`,
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
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/UbicaciónApi/records`,
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
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasServiciosAPI/_find`,
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
    console.log("PROPERLIST:" + JSON.stringify(properList))
    return properList;
  } catch (err) {
    console.log(err);
    return false;
  }
};

visitasModel.getVisitaServicioByRecordId = async (id) => {
  try {
    const list = await axios.get(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasServiciosAPI/records/${id}`,
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
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasAPI/_find`,
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
    console.log("properList", properList);
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
      NumeroVisitaServicio: NumeroVisitaServicio,
    },
  };
  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/DocumentosVisitasAPI/records/`,
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
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/DocumentosVisitasAPI/records/${record}/`,
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
  if (formulario.Fecha.length === 0) return false;
  if (formulario.HoraInicio.length === 0) return false;
  // if (formulario.HoraFin.length === 0) return false;
  if (formulario.Descripcion.length === 0) return false;

  const horaInicial = formulario.HoraInicio.split(":");
  const horaFinal = formulario.HoraFin.split(":");

  let segundosHoraInicial =
    +horaInicial[0] * 60 * 60 + +horaInicial[1] * 60 + +horaInicial[2];
  let segundosHoraFinal =
    +horaFinal[0] * 60 * 60 + +horaFinal[1] * 60 + +horaFinal[2];

  if (segundosHoraFinal < segundosHoraInicial) return false;
  if (segundosHoraInicial > segundosHoraFinal) return false;
  if (segundosHoraInicial === segundosHoraFinal) return false;

  const fechaPartida = formulario.Fecha.split("/");
  let fechaArray = fechaPartida[0];
  fechaArray = fechaArray.split("-");
  const fechaModificada =
    fechaArray[1] + "/" + fechaArray[2] + "/" + fechaArray[0];

  const query = {
    fieldData: {
      Fecha: fechaModificada,
      HoraInicioReal: formulario.HoraInicio,
      HoraFinReal: formulario.HoraFin,
      NumeroServicioVisita: formulario.NumeroServicio,
      NumeroServicio: formulario.NumeroServicioVisita,
      Tec: formulario.Tec,
      Tipo: formulario.Tipo,
      Referencia: formulario.referencia,
      "VisitasServicios::TrabajoRealizado": formulario.Descripcion,
      'DescripciónArt' : formulario.Descripcion,
    },
  };

  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SeguimientoVisitasAPI/records`,
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
      NumeroServicioVisita: formulario.NumeroServicio,
      NumeroServicio: formulario.NumeroServicioVisita,
      Tec: formulario.Tec,
      DescripciónArt: formulario.Descripcion,
      Tipo: formulario.Tipo,
      Unidades: formulario.Unidades,
    },
  };

  try {
    let respuesta = await axios.post(
      `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SeguimientoVisitasAPI/records`,
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
 * @param       {string} id         El RecordId de la tarea de FM a modificar
 * @param       {object} data       Los datos a modificar
 * @returns     {bool}
 */
visitasModel.updateVisita = async (id,body) => {
  const data = {
    fieldData: {
      EstadoServicio: "TERMINADO"
    }
  }

  const update = await axios.patch(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/VisitasServiciosAPI/records/${id}`,
    data,
    {
      httpsAgent: httpsAgent,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${visitasModel.fmtoken}`,
      },
    }
  );

  const dataUbicacion = {
    fieldData: {
      ClienteAccion: "VISITA TERMINADA",
      Direccion: "",
      fecha: body.fecha,
      FechaHora: body.fecha + " " + body.horaEntrada,
      IdLineaVisita: "",
      idSat: "",
      Notas: "",
      Tecnico: body.tec,
      Ubicacion: body.UserLocation
    },
  };

  let respuestaUbi = await axios.post(
    `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/UbicaciónApi/records`,
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

  return update ? true : false;
};
visitasModel.updatevisitas = async (id, req) => {

  

  const data = {
      fieldData: {
        "DescripciónArt": req.DescripciónArt,
        "HoraFinReal": req.HoraFinReal,
        "HoraInicioReal": req.HoraInicioReal,
      }
  };
  console.log(data);
  try {
    
      let respuesta = await axios.patch(
          `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SeguimientoVisitasAPI/records/${id}`,
          data,
          {
              httpsAgent: httpsAgent,
              headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${visitasModel.fmtoken}`,
              },
          }
      );
      console.log(respuesta);

      return respuesta.data.response.modId;
  } catch (err) {
      console.log(err);
      return false;
  }

};

module.exports = visitasModel;
