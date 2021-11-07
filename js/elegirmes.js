let mes;
const select = document.querySelector('#meses');
const traerMes = () => {
    mes = select.value
    localStorage.setItem('Mes', mes);
    window.document.location.href = '../html/gusgastos.html';
}




const boton = document.querySelector('#traermes');
boton.addEventListener('click', traerMes);

