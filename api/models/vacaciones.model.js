const vacacionesModel = {};

const axios = require("axios");
const { response } = require("express");
const https = require("https");
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const serverName = process.env.FM_SERVER;

vacacionesModel.fmtoken = "";
vacacionesModel.usuario = "";

function extraerFecha(fecha) {
    // Asegúrate de que la fecha sea un string
    if (typeof fecha !== 'string') {
        throw new Error('La fecha debe ser un string.');
    }

    // Divide la fecha en partes usando el separador (asumiendo que es '/' o '-')
    let partes = fecha.split(/\/|-/);
    if (partes.length !== 3) {
        throw new Error('Formato de fecha no válido.');
    }

    // Extrae día, mes y año
    let dia = parseInt(partes[0], 10);
    let mes = parseInt(partes[1], 10);
    let ano = parseInt(partes[2], 10);

    return { dia, mes, ano };
}

function seSolapan(fechaInicio1, fechaFin1, fechaInicio2, fechaFin2) {
    // Convertir las fechas en objetos Date de JavaScript
    let inicio1 = new Date(fechaInicio1);
    let fin1 = new Date(fechaFin1);
    let inicio2 = new Date(fechaInicio2);
    let fin2 = new Date(fechaFin2);
    // Verificar solapamiento
    return inicio1 <= fin2 && inicio2 <= fin1;
}

async function consultaVacacionesExistentes(id) {
    if (id) {
        try {
            // Llamada correcta a getvacacionesByCuentaFM con await
            const response = await vacacionesModel.getvacacionesByCuentaFM(id);
            return response;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

}

vacacionesModel.findvacaciones = async (req) => {

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

    try {
        let respuesta = await axios.post(
            `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SolicitudVacacionesApi/_find`,
            query,
            {
                httpsAgent: httpsAgent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${vacacionesModel.fmtoken}`,
                },
            }
        );
        const vacaciones = respuesta.data.response.data;
        return vacaciones;
    } catch (error) {
        console.log("Error en encontrar vacaciones: " + error);
        return false;
    }
};

/**
 * @name        newVacaciones
 * @description Crea un vacaciones en Filemaker
 * @param       {object} req        Los datos para crear un registro en el FM
 * @param       {object} data       Los datos a crear
 * @returns     {bool}
 */

vacacionesModel.newVacaciones = async (req) => {

    req.FechaIni = extraerFecha(req.FechaIni);
    req.FechaFin = extraerFecha(req.FechaFin);

    fechaDesde = req.FechaIni.mes + "/" + req.FechaIni.dia + "/" + req.FechaIni.ano;
    fechaFin = req.FechaFin.mes + "/" + req.FechaFin.dia + "/" + req.FechaFin.ano;

    let tipo = "";
    if (req.motivo && req.motivo == "Vacaciones") {
        tipo = "VACACIONES";
    } else if (req.motivo && req.motivo != "Vacaciones") {
        tipo = "AUSENCIAS";
    }


    const data = {
        "fieldData": {
            "CuentaFM": req.Tec,
            "FechaDesde": fechaDesde,
            "FechaHasta": fechaFin,
            "Motivo": req.motivo,
            "Acceso": req.Tec,
            "Notas": req.Notas._value,
            "Estado": "SOLICITADAS",
            "Tipo": tipo
        }
    };

    try {
        const vacacionesExistentes = await consultaVacacionesExistentes(req.Tec);
        if (vacacionesExistentes.length > 0) {
            for (let vacacion of vacacionesExistentes) {
                if (seSolapan(fechaDesde, fechaFin, vacacion.fieldData.FechaDesde, vacacion.fieldData.FechaHasta)) {
                    return false;
                }
            }
        }

        let respuesta = await axios.post(
            `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SolicitudVacacionesApi/records`,
            data,
            {
                httpsAgent: httpsAgent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${vacacionesModel.fmtoken}`,
                },
            }
        );

        return respuesta.data.response.recordId;
    } catch (err) {
        console.log(err);
        return false;
    }
}
/**
 * @name        getvacacionesByCuentaFM
 * @description Obtiene el vacaciones según la ID
 * @param       {object} id        El CuentaFM  
 * @returns     {object}      
 */

vacacionesModel.getvacacionesByCuentaFM = async (id) => {
    const query = {
        query: [{ CuentaFM: id }],
        sort: [
            {
                fieldName: "FechaDesde",
                sortOrder: "descend",
            },
        ],
        limit: 15,
    };
    try {
        const vacaciones = await axios.post(
            `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SolicitudVacacionesApi/_find`, query,
            {
                httpsAgent: httpsAgent,
                headers: {
                    Authorization: `Bearer ${vacacionesModel.fmtoken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const properList = vacaciones.data.response.data;

        return properList;
    } catch (err) {
        console.log(err);
        return false;
    }
};



vacacionesModel.updatevacaciones = async (id, req) => {

    req.FechaIni = extraerFecha(req.FechaIni);
    req.FechaFin = extraerFecha(req.FechaFin);

    fechaDesde = req.FechaIni.mes + "/" + req.FechaIni.dia + "/" + req.FechaIni.ano;
    fechaFin = req.FechaFin.mes + "/" + req.FechaFin.dia + "/" + req.FechaFin.ano;

    let tipo = "";
    if (req.motivo && req.motivo == "Vacaciones") {
        tipo = "VACACIONES";
    } else if (req.motivo && req.motivo != "Vacaciones") {
        tipo = "AUSENCIAS";
    }

    const data = {
        "fieldData": {
            "FechaDesde": fechaDesde,
            "FechaHasta": fechaFin,
            "Motivo": req.motivo,
            "Notas": req.Notas,
            "Tipo": tipo,
        }
    };
    try {
        const vacacionesExistentes = await consultaVacacionesExistentes(req.Tec);
        if (vacacionesExistentes.length > 0) {
            for (let vacacion of vacacionesExistentes) {
                if (vacacion.recordId === id) {
                    continue;
                }
                if (seSolapan(fechaDesde, fechaFin, vacacion.fieldData.FechaDesde, vacacion.fieldData.FechaHasta)) {
                    console.log("se solapan las fechas");
                    return false;
                }
            }
        }

        let respuesta = await axios.patch(
            `https://${serverName}/fmi/data/v1/databases/Acceso/layouts/SolicitudVacacionesApi/records/${id}`,
            data,
            {
                httpsAgent: httpsAgent,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${vacacionesModel.fmtoken}`,
                },
            }
        );

        return respuesta.data.response.modId;
    } catch (err) {
        console.log(err);
        return false;
    }

};

module.exports = vacacionesModel;
