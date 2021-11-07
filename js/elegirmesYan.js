let mes;
const select = document.querySelector('#meses');
const traerMesYan = () => {
    mes = select.value
    localStorage.setItem('Mes', mes);
    window.document.location.href = '../html/yangastos.html';
}
const boton2 = document.querySelector('#traermesyan');
boton2.addEventListener('click', traerMesYan);