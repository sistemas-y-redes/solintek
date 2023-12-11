/**
 * @file api/controllers/images.controller.js
 * @description Controlador de rutas para las llamadas a la API relacionadas con info de usuarios
 * @author Sistemas y Redes <departamentoweb@syr.es>
 */

 const { Router } = require('express')

 const auth = require("../auth.js");
 
 // Importar modelos necesarios para el controlador
 const imagesModel = require('../models/images.model.js')
 
 // Importamos los módulos necesarios para el funcionamiento del controlador
 const router = Router()
 const bodyParser = require('body-parser')
 router.use(bodyParser.json())
 router.use(bodyParser.urlencoded({ extended: true }))
 const multer = require('multer');
 const path = require('path')
 const fs = require('fs')

//  const fileUpload = require('express-fileupload');

const storage = multer.diskStorage({
    // Especificamos la ruta de destino de la imagen
    destination: function (req, file, callback) {
        callback(null, `${path.join(__dirname, '../')}/images/`);
    },

    // Calculamos el nombre del archivo
    filename: function (req, file, callback) {
        let name = file.originalname.replace(/ /g,"_")
        let nombreOriginal = name;
        let extensionArchivo = nombreOriginal.split('.').pop();
        let nombreArchivo = nombreOriginal.substring(0, nombreOriginal.indexOf(extensionArchivo))
        extensionArchivo = extensionArchivo.toLowerCase();
        name = nombreArchivo + extensionArchivo;

        let exists = fs.existsSync(`${path.join(__dirname, '../')}/images/${name}`) 
        let counter = 1

        while (exists) {
            name = counter + "_" + file.originalname.replace(/ /g,"_")
            let nombreOriginal = name;
            let extensionArchivo = nombreOriginal.split('.').pop();
            let nombreArchivo = nombreOriginal.substring(0, nombreOriginal.indexOf(extensionArchivo))
            extensionArchivo = extensionArchivo.toLowerCase();
            name = nombreArchivo + extensionArchivo;
            exists = fs.existsSync(`${path.join(__dirname, '../')}/images/${name}`)
            counter++ 
        }

        callback(null, name);
    }
});
const upload = multer({ storage: storage });
/**
 * @url /documento/upload
 * @method  POST
 * @description Llamada para insertar documento de una visita
 * @return {JSON}
 */
 router.post('/documento/upload', [auth.validateAccess, upload.array("documento")] ,async (req, res) => {
    imagesModel.fmtoken = req.user.fmtoken;
    const respuesta = await imagesModel.subirDocumento(req.files, req.body.recordId);

    // Si no ha devuelto una visita devuelve error
    if (!respuesta) {
        res.writeHead(400)
        res.end()
        return
    }
    res.end(JSON.stringify(respuesta))
})

module.exports = router