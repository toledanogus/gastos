let mes;
const select = document.querySelector('#meses');
const traerMes = () => {
    mes = select.value
    localStorage.setItem('Mes', mes);
    window.document.location.href='../html/gusgastos.html';
}

export {
    traerMes,
}