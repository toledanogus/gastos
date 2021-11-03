import {redirigirY, redirigirG} from './js/componentes.js';

const iniciarG = document.querySelector('#inicioG');
iniciarG.addEventListener('click', redirigirG, false);

const iniciarY = document.querySelector('#inicioY');
iniciarY.addEventListener('click', redirigirY, false);