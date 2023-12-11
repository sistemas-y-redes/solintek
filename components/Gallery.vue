<template>
    <div class="img-gallery">
        <div class="image-thumb-container" v-for="(image, index) in images" :key="index">
            <img v-if="image['VisitasFotosServicios::NombreDocumento'].toUpperCase().includes('PDF')" class="img-thumb" @click="openDocument(image)" src="/file.png" alt="file">
            <img v-else @click="openImage(image)" class="img-thumb" :src="`data:image/png; base64, ${image['VisitasFotosServicios::DocumentoBase64']}`" :alt="image['VisitasFotosServicios::NombreDocumento']">
            {{image['VisitasFotosServicios::NombreDocumento'].substring(0, 10)}}
        </div>
    </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
    props: ["images"],
    methods: {
        openImage(image) {
            Swal.fire({
                title: '',
                text: image['VisitasFotosServicios::NombreDocumento'],
                imageUrl: "data:image/png; base64, " + image['VisitasFotosServicios::DocumentoBase64'],
                imageWidth: 400,
                imageAlt: image['VisitasFotosServicios::NombreDocumento'],
                showDenyButton: true,
                showCloseButton: true,
                confirmButtonText: 'Ok',
                denyButtonText: "Eliminar"
            }).then(result => {
                if (result.isDenied) this.deleteFile(image.recordId)
            })
        },

        openDocument(doc) {
            Swal.fire({
                title: 'No se puede previsualizar el archivo',
                text: doc['VisitasFotosServicios::NombreDocumento'],
                imageUrl: "/file.png",
                imageWidth: 400,
                imageAlt: doc['VisitasFotosServicios::NombreDocumento'],
                showDenyButton: true,
                showCloseButton: true,
                confirmButtonText: 'Descargar',
                denyButtonText: "Eliminar"
            }).then(result => {
                if (result.isConfirmed) this.downloadFile(doc['VisitasFotosServicios::DocumentoBase64'])
                if (result.isDenied) this.deleteFile(doc.recordId)
            })
        },

        downloadFile(file) {
            // Simplemente creamos una variable que tenga incrustado un iframe y dentro el enlace a computar
            let pdfWindow = window.open("");
            pdfWindow.document.write(
                "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
                encodeURI(file) +
                "'></iframe>"
            );
        },

        async deleteFile(IdVisita) {
            try {
                let response = await this.$axios.$post(`api/visitas/documento`, {
                    IdVisita2: IdVisita,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
                    },
                });

                if (response) {
                    Swal.fire({
                        icon: "success",
                        text: "Documento eliminado",
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                this.$emit("deleteFile")
                return;
            } catch (error) {
                console.log("Error", error);
            }
        }

    }
}
</script>

<style scoped>
    .img-thumb {
        object-fit: cover;
        width: 120px;
        height: 120px;
    }
    .img-gallery {
        padding: 2% 0;
        width: 100%;
        display: flex;
        flex-flow: wrap;
        justify-content: flex-start;
    }
    .image-thumb-container {
        width: min-content;
        margin: 2px;
    }
</style>