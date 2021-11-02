import {redirigirY, redirigirG} from './js/componentes';
import './styles.css';
import './css/componentes.css';

const iniciarG = document.querySelector('#inicioG');
iniciarG.addEventListener('click', redirigirG, false);

const iniciarY = document.querySelector('#inicioY');
iniciarY.addEventListener('click', redirigirY, false);
