<template>
   <div class="canvas-container">
    <canvas id="signaturePadCanvas" ref="signaturePadCanvas" style="border: 1px solid #000;"></canvas>
  </div>
</template>

<script>
import SignaturePad from 'signature_pad';

export default {
  mounted() {
    const canvas = this.$refs.signaturePadCanvas;
    this.signaturePad = new SignaturePad(canvas);

    // Ajusta el tamaño del canva
    canvas.width= 300;
    canvas.height = 300;
  },
  methods: {
    saveSignature() {
      return new Promise((resolve, reject) => {
        if (!this.signaturePad.isEmpty()) {
          const imageData = this.signaturePad.toDataURL();
          resolve(imageData); // Retorna la imagen en base64 si la firma no está vacía
        } else {
          reject('La firma está vacía.'); // Maneja el caso en que la firma esté vacía
        }
      });
    },
    clearSignature() {
      this.signaturePad.clear();
    }
  }
};
</script>
<style>
.canvas-container {
  display: flex; /* Activa Flexbox */
  justify-content: center; /* Centra horizontalmente */
  align-items: center; /* Centra verticalmente */
}
</style>
