/**
 * @file api/models/images.models.js
 * @description Modelo con los métodos que manejan las imágenes
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

 const imagesModel = {}
 const serverName = process.env.FM_SERVER;
 // Importamos los módulos necesarios para el funcionamiento del modelo
 const axios = require("axios");
 const https = require("https");
 const httpsAgent = new https.Agent({ rejectUnauthorized: false });
 const fs = require('fs')
 const FormData  = require('form-data')

 imagesModel.fmtoken = "";
/**
 * @name subirDocumento
 * @description Sube los documentos al recordId
 */
 imagesModel.subirDocumento = async (req, recordId) => {
    let documento = fs.createReadStream(req[0].destination + req[0].filename); 
    let formdata = new FormData();
    formdata.append("upload", documento)
    try {
        let respuesta = await axios.post(`https://${serverName}/fmi/data/v1/databases/Acceso/layouts/DocumentosVisitasAPI/records/${recordId}/containers/Foto/1`,
        formdata,
        {
            httpsAgent: httpsAgent,
            headers: {'Content-Type': 'multipart/form-data', 
            'Authorization': `Bearer ${imagesModel.fmtoken}`,
            ...formdata.getHeaders(),},
        })

        if(!respuesta) {
            console.log("Error al crear el nuevo registro"); 
            return false;
        };
        return true;
    } catch (error) {
        console.log("error en back", error);
        return;
    }
}

module.exports = imagesModel