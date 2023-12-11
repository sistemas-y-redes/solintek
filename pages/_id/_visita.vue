<template>
  <div class="nuxt-content">
    <!-- Imagen en caso de error -->
    <div v-if="error">
      <div v-if="!FormActive" class="boton-retorno mb-4">
        <NuxtLink :to="`../`">&lt; <span>VOLVER</span></NuxtLink>
      </div>
      <div class="mostrar-error">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 586.47858 659.29778"
          xmlns:xlink="http://www.w3.org/1999/xlink">
          <circle cx="332.47856" cy="254" r="254.00001" fill="#f2f2f2" />
          <path
            d="M498.46363,113.58835H33.17063c-.99774-.02133-1.78931-.84746-1.76797-1.84521,.02069-.96771,.80026-1.74727,1.76797-1.76796H498.46363c.99774,.02133,1.78931,.84746,1.76794,1.84521-.02069,.96771-.80023,1.74727-1.76794,1.76796Z"
            fill="#cacaca" />
          <rect x="193.77441" y="174.47256" width="163.61147" height="34.98639" rx="17.49318" ry="17.49318" fill="#fff" />
          <path
            d="M128.17493,244.44534H422.98542c9.66122,0,17.49316,7.83197,17.49316,17.49319h0c0,9.66122-7.83194,17.49319-17.49316,17.49319H128.17493c-9.66122,0-17.49318-7.83197-17.49318-17.49319h0c0-9.66122,7.83196-17.49319,17.49318-17.49319Z"
            fill="#fff" />
          <path
            d="M128.17493,314.41812H422.98542c9.66122,0,17.49316,7.83197,17.49316,17.49319h0c0,9.66122-7.83194,17.49319-17.49316,17.49319H128.17493c-9.66122,0-17.49318-7.83197-17.49318-17.49319h0c0-9.66122,7.83196-17.49319,17.49318-17.49319Z"
            fill="#fff" />
          <path
            d="M91.64085,657.75932l-.69385-.06793c-23.54068-2.42871-44.82135-15.08929-58.18845-34.61835-3.66138-5.44159-6.62299-11.32251-8.815-17.50409l-.21069-.58966,.62375-.05048c7.44699-.59924,15.09732-1.86292,18.49585-2.46417l-21.91473-7.42511-.1355-.65033c-1.29926-6.10406,1.24612-12.38458,6.4285-15.86176,5.19641-3.64447,12.08731-3.76111,17.40405-.29449,2.38599,1.52399,4.88162,3.03339,7.29489,4.49359,8.29321,5.01636,16.8688,10.20337,23.29828,17.30121,9.74951,10.97778,14.02298,25.76984,11.63,40.25562l4.7829,17.47595Z"
            fill="#f2f2f2" />
          <polygon
            points="171.30016 646.86102 182.10017 646.85999 187.23916 605.198 171.29716 605.19897 171.30016 646.86102"
            fill="#a0616a" />
          <path
            d="M170.9192,658.12816l33.21436-.00122v-.41998c-.00049-7.13965-5.78833-12.92737-12.92798-12.92773h-.00079l-6.06702-4.60278-11.3197,4.60345-2.89941,.00012,.00055,13.34814Z"
            fill="#2f2e41" />
          <polygon points="84.74116 616.94501 93.38016 623.42603 122.49316 593.185 109.74116 583.61902 84.74116 616.94501"
            fill="#a0616a" />
          <path
            d="M77.67448,625.72966l26.569,19.93188,.25208-.336c4.2843-5.71136,3.12799-13.81433-2.58279-18.09937l-.00064-.00049-2.09079-7.32275-11.81735-3.11102-2.31931-1.73993-8.01019,10.67767Z"
            fill="#2f2e41" />
          <path
            d="M120.64463,451.35271s.59625,16.26422,1.3483,29.30737c.12335,2.13916-4.88821,4.46301-4.75842,6.7901,.08609,1.54395,1.02808,3.04486,1.1156,4.65472,.09235,1.69897-1.20822,3.20282-1.1156,4.95984,.09052,1.71667,1.57422,3.6853,1.66373,5.44244,.96317,18.9093,4.45459,41.54633,.9584,47.87439-1.72299,3.11871-23.68533,46.32446-23.68533,46.32446,0,0,12.23666,18.35498,15.73285,12.23663,4.61771-8.08099,40.20615-45.88745,40.20615-53.10712,0-7.21088,8.23346-61.25323,8.23346-61.25323l5.74103,31.98169,2.63239,6.33655-.82715,3.71997,1.70117,5.02045,.09192,4.96838,1.65619,9.22614s-4.98199,71.88159-2.17633,73.88312c2.81439,2.01038,16.44086,5.62018,18.04901,2.01038,1.59955-3.6098,12.0108-75.01947,12.0108-75.01947,0,0,1.6781-32.72424,3.49622-63.14111,.1048-1.76556,1.34607-3.89825,1.4422-5.63763,.11365-2.01898-.67297-4.64111-.56818-6.599,.11365-2.24628,1.11005-3.82831,1.20618-5.97852,.74292-16.6156-3.42761-36.84912-4.7561-38.84192-4.01202-6.01343-7.62177-10.82074-7.62177-10.82074,0,0-54.03558-17.75403-68.47485,.28625l-3.30185,25.37585Z"
            fill="#2f2e41" />
          <path
            d="M174.53779,284.10378l-21.4209-4.28418-9.9964,13.56656h0c-18.65262,18.34058-18.93359,34.52753-15.60379,60.47382v36.41553l-2.41,24.41187s-8.53156,17.84521,.26788,22.00006,66.59857,3.80066,72.117,2.14209,.73517-3.69482-.71399-11.4245c-2.72211-14.51929-.90131-7.51562-.71399-12.13849,2.68585-66.31363-3.57013-93.5379-4.20544-100.69376l-10.89398-19.75858-6.42639-10.71042Z"
            fill="#3f3d56" />
          <path
            d="M287.43909,337.57097c-2.23248,4.23007-7.47144,5.84943-11.70148,3.61694-.45099-.23804-.88013-.51541-1.28229-.82895l-46.26044,29.37308,.13336-15.9924,44.93842-26.07846c3.20093-3.58887,8.70514-3.90332,12.29401-.70239,3.00305,2.67844,3.7796,7.0657,1.87842,10.61218Z"
            fill="#a0616a" />
          <path
            d="M157.62488,302.62425l-5.26666-.55807c-4.86633-.50473-9.64093,1.57941-12.57947,5.491-1.12549,1.48346-1.9339,3.18253-2.37491,4.99164l-.00317,.01447c-1.32108,5.44534,.75095,11.15201,5.25803,14.48117l18.19031,13.41101c12.76544,17.24899,36.75653,28.69272,64.89832,37.98978l43.74274-27.16666-15.47186-18.73843-30.00336,16.0798-44.59833-34.52374-.0257-.02075-16.97424-10.936-4.79169-.5152Z"
            fill="#3f3d56" />
          <circle cx="167.29993" cy="248.60526" r="24.9798" fill="#a0616a" />
          <path
            d="M167.8769,273.59047c-.20135,.00662-.4032,.01108-.6048,.01657-.0863,.22388-.17938,.44583-.2868,.66357l.8916-.68015Z"
            fill="#2f2e41" />
          <path
            d="M174.73243,249.29823c.03918,.24612,.09912,.48846,.17914,.72449-.03302-.24731-.09308-.49026-.17914-.72449Z"
            fill="#2f2e41" />
          <path
            d="M192.59852,224.6942c-1.0282,3.19272-1.94586-.85715-5.32825-.12869-4.06885,.87625-8.80377,.57532-12.13586-1.91879-4.96478-3.64273-11.39874-4.62335-17.22333-2.62509-5.70154,2.01706-15.25348,3.43933-16.73907,9.30179-.51642,2.03781-.7215,4.24933-1.97321,5.9382-1.09436,1.47662-2.82166,2.31854-4.26608,3.45499-4.87726,3.83743-1.14954,14.73981,1.15881,20.50046,2.30838,5.76065,7.60355,9.95721,13.42526,12.10678,5.63281,2.07977,11.7464,2.44662,17.75531,2.28317,1.04517-2.7106,.59363-5.84137-.26874-8.65134-.93359-3.04199-2.31592-5.97791-2.70593-9.13599s.46643-6.74527,3.11444-8.50986c2.4339-1.62192,6.39465-.63388,7.32062,1.98843-.54028-3.27841,2.7807-6.4509,6.20508-7.00882,3.67651-.599,7.35291,.72833,11.01886,1.38901s2.36475-14.77301,.64209-18.98425Z"
            fill="#2f2e41" />
          <circle cx="281.3585" cy="285.71051" r="51.12006" transform="translate(-26.58509 542.54478) rotate(-85.26884)"
            fill="#000000" />
          <path
            d="M294.78675,264.41051l-13.42828,13.42828-13.42828-13.42828c-2.17371-2.17374-5.69806-2.17374-7.87177,0s-2.17371,5.69803,0,7.87177l13.42828,13.42828-13.42828,13.42828c-2.17169,2.17575-2.1684,5.70007,.00739,7.87177,2.17285,2.16879,5.69153,2.16879,7.86438-.00003l13.42828-13.42828,13.42828,13.42828c2.17578,2.17169,5.70007,2.1684,7.87177-.00735,2.16882-2.17288,2.16882-5.6915,0-7.86438l-13.42828-13.42828,13.42828-13.42828c2.17371-2.17374,2.17371-5.69803,0-7.87177s-5.69806-2.17374-7.87177,0h0Z"
            fill="#fff" />
          <path
            d="M261.21387,242.74385c1.5069,4.53946-.95154,9.44101-5.49097,10.94791-.48401,.16064-.9812,.27823-1.4859,.35141l-10.83051,53.71692-11.44788-11.16785,12.29266-50.48209c-.37366-4.7944,3.21008-8.98395,8.00452-9.3576,4.01166-.31265,7.71509,2.16425,8.95807,5.9913Z"
            fill="#a0616a" />
          <path
            d="M146.12519,312.22478l-4.04883,3.41412c-3.73322,3.16214-5.53476,8.05035-4.74649,12.87888,.29129,1.83917,.95773,3.59879,1.95786,5.16949l.00824,.0123c3.01477,4.72311,8.5672,7.17865,14.08978,6.23117l22.27075-3.84171c21.28461,2.72995,46.15155-6.65967,72.34302-20.53055l10.67969-50.37274-24.23297-1.80811-9.16821,32.78271-55.78815,8.28149-.03278,.00415-19.64294,4.67767-3.68896,3.1011Z"
            fill="#3f3d56" />
          <path
            d="M272.93684,658.99046l-271.75,.30731c-.65759-.00214-1.18896-.53693-1.18683-1.19452,.00211-.6546,.53223-1.18469,1.18683-1.18683l271.75-.30731c.65759,.00214,1.18896,.53693,1.18683,1.19452-.00208,.6546-.53223,1.18469-1.18683,1.18683Z"
            fill="#cacaca" />
          <g>
            <ellipse cx="56.77685" cy="82.05834" rx="8.45661" ry="8.64507" fill="#3f3d56" />
            <ellipse cx="85.9906" cy="82.05834" rx="8.45661" ry="8.64507" fill="#3f3d56" />
            <ellipse cx="115.20435" cy="82.05834" rx="8.45661" ry="8.64507" fill="#3f3d56" />
            <path
              d="M148.51577,88.89113c-.25977,0-.51904-.10059-.71484-.30078l-5.70605-5.83301c-.38037-.38867-.38037-1.00977,0-1.39844l5.70605-5.83252c.38721-.39453,1.021-.40088,1.41406-.01562,.39502,.38623,.40186,1.01953,.01562,1.41406l-5.02197,5.1333,5.02197,5.13379c.38623,.39453,.37939,1.02783-.01562,1.41406-.19434,.19043-.44678,.28516-.69922,.28516Z"
              fill="#3f3d56" />
            <path
              d="M158.10415,88.89113c-.25244,0-.50488-.09473-.69922-.28516-.39502-.38623-.40186-1.01904-.01562-1.41406l5.02148-5.13379-5.02148-5.1333c-.38623-.39453-.37939-1.02783,.01562-1.41406,.39404-.38672,1.02783-.37939,1.41406,.01562l5.70557,5.83252c.38037,.38867,.38037,1.00977,0,1.39844l-5.70557,5.83301c-.1958,.2002-.45508,.30078-.71484,.30078Z"
              fill="#3f3d56" />
            <path
              d="M456.61398,74.41416h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19v10.62c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19v-10.62c0-1.21002-.98999-2.19-2.20001-2.19Z"
              fill="#3f3d56" />
            <path
              d="M430.61398,74.41416h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19v10.62c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19v-10.62c0-1.21002-.98999-2.19-2.20001-2.19Z"
              fill="#3f3d56" />
            <path
              d="M481.11398,74.91416h-10.60999c-1.21002,0-2.19,.97998-2.19,2.19v10.62c0,1.21002,.97998,2.19,2.19,2.19h10.60999c1.21002,0,2.20001-.97998,2.20001-2.19v-10.62c0-1.21002-.98999-2.19-2.20001-2.19Z"
              fill="#3f3d56" />
            <path
              d="M321.19229,78.95414h-84.81c-1.48004,0-2.67004,1.20001-2.67004,2.67004s1.19,2.66998,2.67004,2.66998h84.81c1.46997,0,2.66998-1.20001,2.66998-2.66998s-1.20001-2.67004-2.66998-2.67004Z"
              fill="#3f3d56" />
          </g>
        </svg>
        <p>
          No se han podido obtener los seguimientos, inténtelo de nuevo
          iniciando sesión.
        </p>
        <NuxtLink to="/login" class="enlace-login"><button>Iniciar sesión</button></NuxtLink>
      </div>
    </div>
    <!-- Contenido en caso de éxito -->
    <div v-else>
      <!-- Botón de retorno -->
      <div v-if="!FormActive" class="boton-retorno mb-4">
        <NuxtLink :to="`/${$route.params.id.replace('/', '%2F')}`">&lt; <span>VOLVER</span></NuxtLink>
      </div>
      <!-- Contenido ya cargado -->
      <div v-if="!this.loading">
        <!-- Contenido seguimiento ya cargado -->
        <div v-if="!FormActive && error != true">
          <div class="mb-2 tarea-parent">
            <div class="tarea-info my-1">
              <!-- Contenido de empresa -->
              <div class="mx-2 ml-3">
                <span class="nombre-empresa">{{
                  visita.visitaFieldata["Visitas::Cliente"]
                }}</span>

                <p class="historico-info mt-2">
                  {{ visita.visitaFieldata.NumeroServicio }}
                  <b>{{ visita.visitaFieldata["Visitas::Motivo Avería"] }} </b>
                </p>
              </div>
              <!-- Contenido de etiquetas -->
              <div class="etiquetas mx-3 my-4">
                <b-badge><b-icon icon="calendar4"></b-icon>
                  {{ convertirFecha(visita.visitaFieldata["FechaPrevista"]) }}
                </b-badge>
                <b-badge>Categoría: {{ visita.visitaFieldata["Origen"] }}</b-badge>
              </div>
            </div>
          </div>

          <div class="mb-2 tarea-parent" v-if="visita.visitaFieldata.TrabajoRealizado">
            <div class="realizado my-1">
              <span class="realizado-titulo">TRABAJO REALIZADO</span>
              <p class="realizado-texto">
                {{ visita.visitaFieldata.TrabajoRealizado }}
              </p>
            </div>
          </div>

          <div>
            <!-- Pestañas -->
            <div class="opciones-pestañas">
              <b-col class="pestaña" :class="this.pestañaActiva === 'Histórico' ? 'active' : 'inactive'
                " @click="cambiarPestaña('Histórico')"><b-icon icon="clock"></b-icon> Histórico</b-col>
              <b-col class="pestaña" :class="this.pestañaActiva === 'Adjuntos' ? 'active' : 'inactive'
                " @click="cambiarPestaña('Adjuntos')"><b-icon icon="file-earmark"></b-icon> Adjuntos</b-col>
              <b-col class="pestaña" :class="this.pestañaActiva === 'Materiales' ? 'active' : 'inactive'
                " @click="cambiarPestaña('Materiales')"><b-icon icon="file-earmark"></b-icon> Materiales</b-col>
            </div>

            <!-- Contenido de seguimientos -->
            <div class="div-pestaña" v-if="this.pestañaActiva == 'Histórico'">
              <b-row v-if="checkHistorico() || this.$store.state.Horas.length > 0" class="lista-historica">
                <!-- Las horas almacenadas en store -->
                <div v-for="(element, index) in this.$store.state.Horas" :key="index" class="store-loading historico">
                  <span>
                    Día:<b> {{ element.Fecha }}</b> de
                    <b>{{ corregirHoras(element.HoraInicio) }}h</b>
                    a
                    <b>{{ corregirHoras(element.HoraFin) }}h</b>
                  </span>
                  <p class="historico-texto">
                    {{ element.Descripcion }}
                  </p>
                </div>

                <!-- Contenido de seguimientos -->
                <div v-for="(Linea, index) in visita.VisitasLineas" :key="index" class="historico row" v-if="Linea['VisitasLineas::Tipo'] === 'M.Obra' ? true : false && Linea
                  ">
                  <div class="historico-texto col-7">
                    <b>
                      <p class="historico-tecnico">
                        {{ Linea["VisitasLineas::Tec"] }}
                        {{ Linea["VisitasLineas::TecNom"] }}
                      </p>
                    </b>
                    <span class="historico-descripcionArt">{{
                      Linea["VisitasLineas::DescripciónArt"]
                    }}</span>
                  </div>
                  <div class="historico-tiempo col text-right">
                    <p class="historico-hora">
                      <b-icon icon="clock"></b-icon>
                      {{
                        corregirHoras(Linea["VisitasLineas::HoraInicioReal"])
                      }}
                      -
                      {{ corregirHoras(Linea["VisitasLineas::HoraFinReal"]) }}
                    </p>

                    <span class="historico-fecha"><b-icon icon="calendar4"></b-icon>{{
                      " " + convertirFecha(Linea["VisitasLineas::Fecha"])
                    }}</span>
                  </div>
                  <div class="historico-editar col-auto">
                    <b-button variant="outline-primary" @click="editarHistorico(Linea)">
                      Editar
                    </b-button>
                  </div>
                </div>
                <b-modal id="modal-editar-historico" title="Editar Historico" @hide="resetModal">
                  <form @submit.prevent="handleEdit()">
                    <!-- Input de Fecha (desactivado en este caso porque la fecha viene del historial existente) -->

                    <!-- Seleccionar Técnico -->
                    <b-row class="form-option my-3">
                      <label>Técnico</label>
                      <b-form-select v-model="historialAEditar['VisitasLineas::Tec']" :options="tecnicos"
                        disabled></b-form-select>
                    </b-row>

                    <!-- Input de Hora Inicio -->
                    <b-row class="form-option my-3">
                      <label>Hora Inicio</label>
                      <input v-model="historialAEditar['VisitasLineas::HoraInicioReal']" class="form-input" type="time"
                        name="hora-inicio" required />
                    </b-row>

                    <!-- Input de Hora Final -->
                    <b-row class="form-option my-3">
                      <label>Hora Fin</label>
                      <input v-model="historialAEditar['VisitasLineas::HoraFinReal']" class="form-input" type="time"
                        name="hora-fin" required />
                    </b-row>

                    <!-- Input de Descripción -->
                    <b-row class="form-option my-3">
                      <label>Descripción</label>
                      <b-form-textarea v-model="historialAEditar['VisitasLineas::DescripciónArt']" class="textarea"
                        placeholder="Introduce la acción realizada" required></b-form-textarea>
                    </b-row>

                    <!-- Botón para guardar cambios -->
                    <b-row class="form-option my-4">
                      <b-button variant="outline-primary" type="submit" >
                        Guardar Cambios
                      </b-button>
                    </b-row>
                  </form>
                </b-modal>
                <div class="boton-carga-parent">
                  <button v-if="limite < visita.VisitasLineas.length" style="z-index: 9" class="boton-carga"
                    @click="limite += 5">
                    Cargar más
                  </button>

                  <span class="ml-1" v-if="limite >= visita.VisitasLineas.length">Límite {{ historicoLength() }} registros
                    alcanzado</span>

                  <button v-if="limite > 5" style="z-index: 9" class="boton-carga" @click="limite -= 5">
                    Ocultar
                  </button>
                </div>
              </b-row>
              <!-- No contenido -->
              <div class="no-data" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="200" height="200"
                  viewBox="0 0 647.63626 632.17383" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                    transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" />
                  <path
                    d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="20" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
                  <path
                    d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" />
                  <path
                    d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="20" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
                </svg>
                <p class="ml-2 text-center">No hay archivos a mostrar</p>
              </div>
            </div>
            <!-- Contenido de adjuntos -->
            <div class="div-pestaña" v-if="this.pestañaActiva === 'Adjuntos'">
              <b-row v-if="visita.VisitasFotos.length > 0" class="lista-adjuntos">
                <Gallery :images="visita.VisitasFotos" @deleteFile="getVisita()" />
                <div class="boton-carga-parent">
                  <span class="ml-1" v-if="limiteDocumentos >= visita.VisitasFotos.length">Límite {{
                    visita.VisitasFotos.length }} registros
                    alcanzado</span>
                </div>
              </b-row>

              <div class="no-data" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="200" height="200"
                  viewBox="0 0 647.63626 632.17383" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                    transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" />
                  <path
                    d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="20" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
                  <path
                    d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" />
                  <path
                    d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="20" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
                </svg>
                <p class="ml-2 text-center">No hay archivos a mostrar</p>
              </div>
            </div>
            <!-- Contenido de materiales-->
            <div class="div-pestaña" v-if="this.pestañaActiva === 'Materiales'">
              <b-row v-if="checkMateriales() || this.$store.state.Horas.length > 0" class="lista-historica">
                <div v-for="(Linea, index) in visita.VisitasLineas" :key="index" class="historico"
                  v-if="Linea['VisitasLineas::Tipo'] === '' ? true : false">
                  <div v-if="Linea['VisitasLineas::Tipo'] === ''">
                    <p class="historico-texto">
                      {{ Linea["VisitasLineas::Unidades"] }} x
                      {{ Linea["VisitasLineas::DescripciónArt"] }}
                    </p>
                  </div>
                </div>
                <div class="boton-carga-parent">
                  <button v-if="limite < visita.VisitasLineas.length" style="z-index: 9" class="boton-carga"
                    @click="limite += 5">
                    Cargar más
                  </button>

                  <span class="ml-1" v-if="limite >= visita.VisitasLineas.length">Límite {{ materialesLength() }}
                    registros alcanzado</span>

                  <button v-if="limite > 5" style="z-index: 9" class="boton-carga" @click="limite -= 5">
                    Ocultar
                  </button>
                </div>
              </b-row>

              <div class="no-data" v-else>
                <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="200" height="200"
                  viewBox="0 0 647.63626 632.17383" xmlns:xlink="http://www.w3.org/1999/xlink">
                  <path
                    d="M687.3279,276.08691H512.81813a15.01828,15.01828,0,0,0-15,15v387.85l-2,.61005-42.81006,13.11a8.00676,8.00676,0,0,1-9.98974-5.31L315.678,271.39691a8.00313,8.00313,0,0,1,5.31006-9.99l65.97022-20.2,191.25-58.54,65.96972-20.2a7.98927,7.98927,0,0,1,9.99024,5.3l32.5498,106.32Z"
                    transform="translate(-276.18187 -133.91309)" fill="#f2f2f2" />
                  <path
                    d="M725.408,274.08691l-39.23-128.14a16.99368,16.99368,0,0,0-21.23-11.28l-92.75,28.39L380.95827,221.60693l-92.75,28.4a17.0152,17.0152,0,0,0-11.28028,21.23l134.08008,437.93a17.02661,17.02661,0,0,0,16.26026,12.03,16.78926,16.78926,0,0,0,4.96972-.75l63.58008-19.46,2-.62v-2.09l-2,.61-64.16992,19.65a15.01489,15.01489,0,0,1-18.73-9.95l-134.06983-437.94a14.97935,14.97935,0,0,1,9.94971-18.73l92.75-28.4,191.24024-58.54,92.75-28.4a15.15551,15.15551,0,0,1,4.40966-.66,15.01461,15.01461,0,0,1,14.32032,10.61l39.0498,127.56.62012,2h2.08008Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M398.86279,261.73389a9.0157,9.0157,0,0,1-8.61133-6.3667l-12.88037-42.07178a8.99884,8.99884,0,0,1,5.9712-11.24023l175.939-53.86377a9.00867,9.00867,0,0,1,11.24072,5.9707l12.88037,42.07227a9.01029,9.01029,0,0,1-5.9707,11.24072L401.49219,261.33887A8.976,8.976,0,0,1,398.86279,261.73389Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="20" fill="#000000" />
                  <circle cx="190.15351" cy="24.95465" r="12.66462" fill="#fff" />
                  <path
                    d="M878.81836,716.08691h-338a8.50981,8.50981,0,0,1-8.5-8.5v-405a8.50951,8.50951,0,0,1,8.5-8.5h338a8.50982,8.50982,0,0,1,8.5,8.5v405A8.51013,8.51013,0,0,1,878.81836,716.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#e6e6e6" />
                  <path
                    d="M723.31813,274.08691h-210.5a17.02411,17.02411,0,0,0-17,17v407.8l2-.61v-407.19a15.01828,15.01828,0,0,1,15-15H723.93825Zm183.5,0h-394a17.02411,17.02411,0,0,0-17,17v458a17.0241,17.0241,0,0,0,17,17h394a17.0241,17.0241,0,0,0,17-17v-458A17.02411,17.02411,0,0,0,906.81813,274.08691Zm15,475a15.01828,15.01828,0,0,1-15,15h-394a15.01828,15.01828,0,0,1-15-15v-458a15.01828,15.01828,0,0,1,15-15h394a15.01828,15.01828,0,0,1,15,15Z"
                    transform="translate(-276.18187 -133.91309)" fill="#3f3d56" />
                  <path
                    d="M801.81836,318.08691h-184a9.01015,9.01015,0,0,1-9-9v-44a9.01016,9.01016,0,0,1,9-9h184a9.01016,9.01016,0,0,1,9,9v44A9.01015,9.01015,0,0,1,801.81836,318.08691Z"
                    transform="translate(-276.18187 -133.91309)" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="20" fill="#000000" />
                  <circle cx="433.63626" cy="105.17383" r="12.18187" fill="#fff" />
                </svg>
                <p class="ml-2 text-center">No hay archivos a mostrar</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Componente form activo -->
        <div v-if="FormActive && this.pestañaActiva === 'Histórico'">
          <div @click="
            FormActive = false;
          getVisita();
          loading = true;
          " class="boton-retorno mb-4">
            &lt;
            <span>VOLVER</span>
          </div>
          <!-- Formulario componente -->
          <Form :visita="visita" :pestañaActiva="pestañaActiva" />
        </div>

        <div v-if="FormActive && this.pestañaActiva === 'Materiales'">
          <div @click="
            FormActive = false;
          getVisita();
          loading = true;
          " class="boton-retorno mb-4">
            &lt;
            <span>VOLVER</span>
          </div>
          <!-- Formulario componente -->
          <FormMateriales :visita="visita" :pestañaActiva="pestañaActiva" />
        </div>
      </div>

      <!-- Cargando contenido spinner -->
      <div v-else class="spinner-parent">
        <div class="spinner-border ml-auto" role="status" aria-hidden="true"></div>
        <p>Cargando...</p>
      </div>

      <!-- Botón de añadir en Histórico -->
      <div v-if="!FormActive &&
        pestañaActiva == 'Histórico' &&
        this.loading === false &&
        visita.visitaFieldata.EstadoServicio == 'PENDIENTE'
        " class="añadir">
        <b-icon @click="FormActive = true" style="width: 60px; height: 60px" icon="plus-circle-fill"></b-icon>
      </div>

      <!-- Botón de añadir en Adjuntos -->
      <div v-if="!FormActive &&
        pestañaActiva === 'Adjuntos' &&
        this.loading === false &&
        visita.visitaFieldata.EstadoServicio == 'PENDIENTE'
        " class="añadir">
        <label>
          <b-icon style="width: 60px; height: 60px" icon="plus-circle-fill"></b-icon>
          <b-form-file style="display: none" :state="Boolean(archivoSubir)" accept=".jpg, .png, .pdf, .webp, .jpeg"
            id="archivo" type="file" name="archivo" v-model="archivoSubir" @change="crearDocumento" />
        </label>
      </div>

      <!-- Botón de añadir en Materiales -->

      <div v-if="!FormActive &&
        pestañaActiva === 'Materiales' &&
        this.loading === false &&
        visita.visitaFieldata.EstadoServicio == 'PENDIENTE'
        " class="añadir">
        <b-icon @click="FormActive = true" style="width: 60px; height: 60px" icon="plus-circle-fill"></b-icon>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Form from "../../components/Form.vue";
import FormMateriales from "../../components/FormMateriales.vue";
export default {
  layout: "default",
  data() {
    return {
      FormActive: false,
      pestañaActiva: "Histórico",
      visita: {
        fieldData: {},
        VisitasLineas: {},
        VisitasFotos: {},
      },
      error: false,
      limite: 5,
      limiteDocumentos: 5,
      archivoSubir: null,
      loading: true,
      extensionesPermitidas: [
        "jpg",
        "jpeg",
        "png",
        "webp",
        "pdf",
        "JPG",
        "JPEG",
        "PNG",
        "WEBP",
        "PDF",
      ],
      historialAEditar: {
        'VisitasLineas::Fecha': '',
        'VisitasLineas::Tec': '',
        'VisitasLineas::TecNom': '',
        'VisitasLineas::HoraInicioReal': '',
        'VisitasLineas::HoraFinReal': '',
        'VisitasLineas::DescripciónArt': '',
        'recordId': ''
        // Asegúrate de incluir todas las propiedades que necesites
      },
      tecnicos: [],
    };
  },
  methods: {
    cambiarPestaña(PestañaSeleccionada) {
      this.pestañaActiva = PestañaSeleccionada;
    },
    async crearDocumento(event) {
      let fichero = event.target.files[0];
      if (fichero === undefined) {
        Swal.fire({
          icon: "error",
          title: "Sin documentos",
          text: "Pruebe a insertar un documento con extensión permitida",
        });
        return;
      }
      let ficheroComprobado = this.validacionDocmento(fichero);
      if (!ficheroComprobado) {
        Swal.fire({
          icon: "error",
          title: "Documento no válido",
          text: "Pruebe a insertar un documento con extensión permitida",
        });
        return;
      }
      let IdVisita = this.visita.visitaFieldata.NumeroServicio;
      let IdVisita2 = this.visita.visitaFieldata.Numero;
      let NumeroVisitaServicio = this.visita.visitaFieldata.NumeroVisita;
      let documento = event.target.files[0];
      let formulario = {
        IdVisita: NumeroVisitaServicio,
        IdVisita2: IdVisita2,
        NumeroVisitaServicio: IdVisita,
      };
      this.loading = true;
      try {
        this.nuevoDocumento = await this.$axios.$post(
          `api/visitas/documento/new`,
          {
            formulario,
            headers: {
              Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
            },
          }
        );
        if (this.nuevoDocumento) {
          let subidaArchivo = await this.subirArchivo(
            documento,
            this.nuevoDocumento
          );
          if (subidaArchivo) {
            Swal.fire({
              icon: "success",
              text: "Nuevo documento creado",
              showConfirmButton: false,
              timer: 1500,
            });
            this.getVisita();
          }
        }
      } catch (error) {
        console.log(error);
        return;
      }
      this.loading = false;
    },
    validacionDocmento(file) {
      let extensionArchivo = file.name.split(".").pop();
      return this.extensionesPermitidas.some(function (extensionPermitida) {
        if (extensionPermitida === extensionArchivo) {
          return true;
        } else {
          return false;
        }
      });
    },
    async subirArchivo(documento, recordId) {
      let formdata = new FormData();
      formdata.append("documento", documento);
      formdata.append("recordId", recordId);
      try {
        let respuesta = await this.$axios.$post(
          `api/images/documento/upload`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
            },
          }
        );
        if (respuesta) {
          return true;
        }
      } catch (error) {
        return;
      }
    },
    async getVisita() {
      let token = this.$cookies.get("TOKEN");
      try {
        const visitaid = this.$route.params.visita.replace("/", "");
        this.visita = await this.$axios.$get(
          `api/visitas/servicio/${visitaid}`,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
            },
          }
        );
        this.visita.visitaFieldata = this.visita[0].fieldData;
        this.visita.VisitasLineas = this.visita[0].portalData.VisitasLineas;
        this.visita.VisitasFotos = this.visita[0].portalData.VisitasFotosServicios;

        if (this.loading === true) {
          this.loading = false;
        }
        return;
      } catch (error) {
        this.error = true;
        console.log("Error", error);
      }
    },
    corregirHoras(Hora) {
      if (Hora == "") return "-";
      let horaFinal = Hora.slice(0, -3);
      return horaFinal;
    },
    convertirFecha(fecha) {
      const fechaArray = fecha.split("/");
      const fechaModificada =
        fechaArray[1] + "/" + fechaArray[0] + "/" + fechaArray[2];
      return fechaModificada;
    },
    checkHistorico() {
      return this.visita.VisitasLineas.some(
        (linea) => linea["VisitasLineas::Tipo"] === "M.Obra"
      );
    },
    checkMateriales() {
      return this.visita.VisitasLineas.some(
        (linea) => linea["VisitasLineas::Tipo"] === ""
      );
    },
    historicoLength() {
      const count = this.visita.VisitasLineas.filter((linea) => {
        return linea["VisitasLineas::Tipo"] === "M.Obra" ? true : false;
      }).length;
      return count;
    },
    materialesLength() {
      const count = this.visita.VisitasLineas.filter((linea) => {
        return linea["VisitasLineas::Tipo"] === "" ? true : false;
      }).length;
      return count;
    },
    editarHistorico(historial) {
      console.log(historial);
      if (historial) {
        this.historialAEditar = historial;
        this.historialAEditar.recordId = historial.recordId;
        this.tecnicos = [{ value: this.historialAEditar['VisitasLineas::Tec'], text: this.historialAEditar['VisitasLineas::TecNom'] }];
        this.$bvModal.show('modal-editar-historico'); // Abre el modal
      }

    },
    resetModal() {
      // Restablece la línea editable cuando el modal se cierra
      this.historialAEditar = {
        'VisitasLineas::Fecha': '',
        'VisitasLineas::Tec': '',
        'VisitasLineas::TecNom': '',
        'VisitasLineas::HoraInicioReal': '',
        'VisitasLineas::HoraFinReal': '',
        'VisitasLineas::DescripciónArt': '',
        'recordId': ''
        // Asegúrate de incluir todas las propiedades que necesites
      };
    },
    handleEdit() {

      if (!this.historialAEditar) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#000",
          text: `No se a podido actualizar la solicitud. `,
        });
      }

      let data = {
        DescripciónArt: this.historialAEditar['VisitasLineas::DescripciónArt'],
        HoraInicioReal: this.historialAEditar['VisitasLineas::HoraInicioReal'],
        HoraFinReal: this.historialAEditar['VisitasLineas::HoraFinReal'],

      };
      console.log(data);
      try {
        let response = this.$axios.$patch(
          `/api/visitas/edit/${this.historialAEditar.recordId}`, data,
          {
            headers: {
              Authorization: `Bearer ${this.$cookies.get("TOKEN")}`,
            },
          }
        );
        if (response) {
          Swal.fire({
            icon: "success",
            title: "Enviado a Filemaker",
            confirmButtonColor: "#000",
            text: `Se ha enviado a Filemaker y será actualizado en breves`,
          });
          window.location.href = window.location.href
        }
      } catch (e) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          confirmButtonColor: "#000",
          text: `No se ha podido actualizar la solicitud. `,
        });
        this.error = true;
        console.log(e);
      }

    }
  },
  async mounted() {
    if (this.$cookies.get("TOKEN") === "") this.$router.push("/login");
    if (!this.$cookies.get("TOKEN")) this.$router.push("/login");

    await this.getVisita();
    this.loading = false;
  },
  components: { FormMateriales, Form },
};
</script>

<style scoped>
.archivo-datos {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
  gap: 0.6rem;
}

.tarea-info {
  background-color: var(--color);
  max-width: 100%;
  border-bottom: 1px solid rgb(218, 218, 218);
  border-radius: 4px;
}

.tarea-info>div {
  margin-top: 18px !important;
}

.realizado {
  background-color: var(--color);
  max-width: 100%;
  border-bottom: 1px solid rgb(218, 218, 218);
  border-radius: 4px;
  padding: 10px 20px 10px 20px;
}

.realizado-titulo {
  display: inline-block;
  margin-top: 5px;
  font-size: 15px;
}

.realizado-texto {
  margin: 5px 0 10px 0 !important;
}

.nombre-empresa {
  display: inline-block;
  margin-top: 10px;
}

.opciones-pestañas {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  font-weight: bolder;
  max-width: 400px;
  margin-left: auto;
}

.opciones-pestañas>* {
  text-align: center;
  width: 128px;
  padding: 0.4rem;
  border-radius: 0.1rem;
  font-size: 14px;
}

.opciones-pestañas .active {
  background-color: black;
  color: var(--color);
}

.opciones-pestañas .inactive {
  background-color: rgb(211, 211, 211);
  color: black;
}

.div-pestaña {
  background-color: var(--color);
  min-width: 100%;
}

@media (min-height: 600px) and (max-height: 720px) {
  .div-pestaña {
    height: 400px;
  }
}

@media (min-height: 721px) and (max-height: 800px) {
  .div-pestaña {
    height: 435px;
  }
}

@media (min-height: 801px) and (max-height: 910px) {
  .div-pestaña {
    height: 520px;
  }
}

@media (min-height: 911px) {
  .div-pestaña {
    height: 550px;
  }
}

@media (max-width: 320px) {

  .lista-historica,
  .lista-adjuntos {
    max-width: 310px;
  }
}

@media (min-width: 321px) and (max-width: 375px) {
  .lista-historica {
    max-width: 400px;
  }

  .lista-adjuntos {
    max-width: 366px;
  }
}

@media (min-width: 375px) and (max-width: 425px) {
  .lista-historica {
    max-width: 415px;
  }

  .lista-adjuntos {
    max-width: 414px;
  }
}

.pestaña svg {
  margin-right: 8px;
}

.lista-historica,
.lista-adjuntos {
  background-color: var(--color);
  margin-left: 6px;
  margin-right: 0px;
  width: 100%;
}

.historico,
.adjunto {
  border-bottom: 2px solid rgb(211, 211, 211);
}

.historico {
  min-height: 80px;
  min-width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
}

.historico>div {
  margin-left: 0.4rem;
  margin-top: 0.6rem;
  margin-bottom: 0.6rem;
}

.historico-texto {
  margin-right: 10px;
  overflow: hidden;
  font-size: 14px;
  min-width: 65vw;
  max-width: 75vw;
  padding-right: 15px;
  padding-left: 20px;
}

.historico-info {
  overflow: hidden;
  font-size: 14px;
}

.historico-tecnico {
  font-size: 16px;
  margin: 0 0 0 0 !important;
}


.historico-tiempo {
  max-width: 30vw;
  padding: 0 !important;
  margin: 0 !important;
}

.historico-hora {
  font-size: 15px;
  margin: 0 0 0 0 !important;
  font-weight: bold;
}

.historico-fecha {
  font-size: 12px;
}

.icono-archivo {
  width: 18px;
}

.boton-descargar {
  background-color: black;
  color: var(--color);
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  width: 90%;
  border: none;
  border-radius: 10px;
  font-size: 13px;
}

.icono-descargar {
  -webkit-filter: invert(100%);
  /* safari 6.0 - 9.0 */
  filter: invert(100%);
  width: 16px !important;
  margin-right: 6px;
}

.adjunto {
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: var(--color);
  justify-items: center;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100%;
}

@media (min-width: 331px) {
  .adjunto-botones {
    display: grid;
    grid-template-columns: 60% 20% 10%;
    width: -webkit-fill-available;
    margin: 0;
    justify-content: end;
  }
}

@media (max-width: 330px) {
  .boton-descargar {
    height: auto;
  }

  .adjunto-botones {
    margin-top: 0;
    display: flex;
  }

  .archivo-datos {
    margin-left: 1.2rem !important;
  }

  .remove-button {
    width: 32px !important;
  }
}

.adjunto-botones>button {
  border: none;
  margin: 0.2rem;
}

.remove-button {
  border-radius: 10px;
  margin-right: 10px;
  width: 42px;
  background-color: rgb(218, 218, 218);
}

.remove-button svg {
  color: red;
}

.añadir {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 10px;
  position: sticky;
  bottom: 0;
  padding-left: 40px;
  padding-bottom: 42px;
  font-size: 20px;
}

.añadir a,
.añadir svg {
  color: black;
}

.añadir svg {
  width: 74px !important;
  height: 74px !important;
}

.no-documents-icon g {
  width: 80px;
}

.NombreDocumento {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0;
  max-width: 100px;
}

.mostrar-error {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.mostrar-error p {
  margin-left: 1.2rem;
}

.enlace-login button {
  border: none;
  background-color: black;
  color: white;
  padding: 0.4rem;
  border-radius: 0.2rem;
}

.historico-editar {
  margin-left: auto;
}
</style>
