/*
 * action types
 */
const PANTALLA_NOTICIAS = 'PANTALLA_NOTICIAS';
const PANTALLA_CREENCIAS = 'PANTALLA_CREENCIAS';
const PANTALLA_NOSOTROS = 'PANTALLA_NOSOTROS';
const PANTALLA_BIBLIA = 'PANTALLA_BIBLIA';
const PANTALLA_VERSICULOS = 'PANTALLA_VERSICULOS';
const PANTALLA_ORACION = 'PANTALLA_ORACION';
const PANTALLA_CALENDARIO = 'PANTALLA_CALENDARIO';

const PANTALLA_SAMPLE = 'PANTALLA_SAMPLE';

/***********************/
/**     PANTALLAS     **/
/***********************/
function toNoticias() {
  return {
    type: PANTALLA_NOTICIAS
  }
}

function toCreencias() {
  return {
    type: PANTALLA_CREENCIAS
  }
}

function toNosotros() {
  return {
    type: PANTALLA_NOSOTROS
  }
}

function toBiblia() {
  return {
    type: PANTALLA_BIBLIA
  }
}

function toVersiculos() {
  return {
    type: PANTALLA_VERSICULOS
  }
}

function toOracion() {
  return {
    type: PANTALLA_ORACION
  }
}

function toCalendario() {
  return {
    type: PANTALLA_CALENDARIO
  }
}

function toSamplePage() {
  return {
    type: PANTALLA_SAMPLE
  }
}

module.exports = {toNoticias, toCreencias, toNosotros, toBiblia, toVersiculos, toOracion, toCalendario, toSamplePage}
