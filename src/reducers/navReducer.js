'use strict';

//Declaramos el type State
export type State = {
  pantalla: ?string;
};

const initialState = {
  pantalla: 'noticias',
};

function navigation(state: State = initialState, action): State {
  if (action.type === 'PANTALLA_NOTICIAS') {
    return {
      pantalla: 'noticias',
    }
  } else if (action.type === 'PANTALLA_CREENCIAS') {
    return {
      pantalla: 'creencias',
    }
  } else if (action.type === 'PANTALLA_NOSOTROS') {
    return {
      pantalla: 'nosotros',
    }
  } else if (action.type === 'PANTALLA_BIBLIA') {
    return {
      pantalla: 'biblia',
    }
  } else if (action.type === 'PANTALLA_VERSICULOS') {
    return {
      pantalla: 'versiculos',
    }
  } else if (action.type === 'PANTALLA_ORACION') {
    return {
      pantalla: 'oracion',
    }
  } else if (action.type === 'PANTALLA_CALENDARIO') {
    return {
      pantalla: 'calendario',
    }
  } else if (action.type === 'PANTALLA_SAMPLE') {
    return {
      pantalla: 'sample',
    }
  }

  return state;
}

module.exports = navigation;
