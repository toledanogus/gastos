const meses2 = ['ene21', 'feb21', 'mar21', 'abr21', 'may21', 'jun21', 'jul21', 'ago21', 'sep21', 'oct21', 'nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22'];
const mes = localStorage.getItem('Mes');
console.log(mes);
let msi, mesAPagar, extrasBase, sumax, sumay, moneda1, moneda2;
let totalx = [];
let totaly = [];
let totalz = [];
const url = '../php/gushsbc.php';
const url2 = '../php/llevarUna.php';
const url3 = '../php/llevarMsi.php';
const url4 = '../php/traerYansen.php';
const url5 = '../php/leerUna.php';
const concepto3 = document.querySelector('#filaTotalx');
const total3 = document.querySelector('#total1');
const concepto1 = document.querySelector('#concepto1');
const cantidad1 = document.querySelector('#cantidad1');
const reg2 = document.querySelector('#registrarmsi');
const reg1 = document.querySelector('#registrar1');
const totalx1 = document.querySelector('#cantidadmsi');
const totaly1 = document.querySelector('#debomsi');
const totalz1 = document.querySelector('#apagarmsi');
const totalDelMes = document.querySelector('#gastosDelMes');


let hsbcJson = new Object();
hsbcJson['mes'] = mes;

const pedirHsbc = async () => {
    const resp1 = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(hsbcJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    msi = await resp1.json();
    console.log(msi);
}



const pintarMsi = () => {
    if (msi.length >= 1) {
        const creados = document.querySelectorAll('#primeramsi >tbody> tr > td');
        creados.forEach((x) => {
            x.parentNode.remove();
        })
    }
    totalx = [];
    totaly = [];
    totalz = [];
    const indiceActual = meses2.indexOf(mes);
    for (let i = 0, j = 0; i < msi.length / 4; i++, j += 4) {
        const indiceCompra = meses2.indexOf(msi[3 + j]);
        if (indiceCompra == -1) {
            mesAPagar = '1'
        } else {
            mesAPagar = indiceActual - indiceCompra;
        }
        let deboRestante, mensualidad, deboRestante1, mensualidad1;
        if (mesAPagar == 0) {
            deboRestante = msi[j + 1];
            deboRestante1 = parseFloat(deboRestante).toFixed(2);
            mensualidad = 0;
            mensualidad1 = parseFloat(mensualidad).toFixed(2);
        } else {
            deboRestante = (msi[j + 1] / msi[j + 2]) * (msi[j + 2] - (mesAPagar - 1));
            deboRestante1 = parseFloat(deboRestante).toFixed(2);
            mensualidad = msi[j + 1] / msi[j + 2];
            mensualidad1 = parseFloat(mensualidad).toFixed(2);
        }
        totalx.push(msi[j + 1]);
        totaly.push(deboRestante);
        totalz.push(mensualidad);
        const tr = document.createElement('tr');
        const t1 = document.createElement('td');
        const t2 = document.createElement('td');
        const t3 = document.createElement('td');
        const t4 = document.createElement('td');
        const t5 = document.createElement('td');
        const t6 = document.createElement('td');
        const con = document.createTextNode(msi[j]);
        const can = document.createTextNode(`$ ${msi[j + 1]}`);
        const meses = document.createTextNode(`${msi[j + 2]}`);
        const mAP = document.createTextNode(`${mesAPagar}º`);
        const debo = document.createTextNode(`$ ${deboRestante1}`);
        const aP = document.createTextNode(`$ ${mensualidad1}`);
        t1.append(con);
        t2.append(can);
        t3.append(meses);
        t4.append(mAP);
        t5.append(debo);
        t6.append(aP);
        tr.append(t1, t2, t3, t4, t5, t6);
        const concepto2 = document.querySelector('#totalmsi');
        concepto2.insertAdjacentElement('beforebegin', tr);

    }
    const reducer = (a, b) => a + b;
    const selectores = [totalx1, totaly1, totalz1];
    const valores = [totalx, totaly, totalz];
    for (let i = 0; i < 3; i++) {
        sumax = valores[i].reduce(reducer);
        const monedax = parseFloat(sumax).toFixed(1);
        const moneda = new Intl.NumberFormat().format(monedax);
        selectores[i].textContent = `$ ${moneda}`;

    }
}



const llevarUna = async () => {
    let extrasJson = new Object();
    extrasJson['id_mes'] = mes;
    extrasJson['concepto'] = concepto1.value;
    extrasJson['cantidad'] = cantidad1.value;
    const resp2 = await fetch(url2, {
        method: 'POST',
        body: JSON.stringify(extrasJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    extrasBase = await resp2.json();
    console.log(extrasBase);
    concepto1.value = '';
    cantidad1.value = '';

    pintarUna();
    calcularTotal();
}

const pintarUna = () => {
    if (extrasBase.length >= 1) {
        const creados = document.querySelectorAll('#extras >tbody> tr > td');
        creados.forEach((x) => {
            x.parentNode.remove();
        })
    }
    for (let i = 0; i < extrasBase.length; i++) {
        console.log(extrasBase[i]);
        const tr = document.createElement('tr');
        const t1 = document.createElement('td');
        const con = document.createTextNode(extrasBase[i][0]);
        t1.append(con);
        const t2 = document.createElement('td');
        const can = document.createTextNode(`$ ${extrasBase[i][1]}`);
        t2.append(can);
        const t3 = document.createElement('td');
        //const pag = document.createTextNode(extrasBase2[i][2]);//voy a cambiarlo por las casillas
        //t3.append(pag);
        tr.append(t1, t2, t3);
        /* "afterbegin"
        "afterend"
        "beforebegin"
        "beforeend" */
        concepto3.insertAdjacentElement('beforebegin', tr);
    }

    const totalExtras = extrasBase.map((x) => {
        x = x[1];
        return x;
    })
    console.log(totalExtras);
    const reducer = (a, b) => a + b;
    if (totalExtras.length == 0) {
        totalExtras.push(0);
    }
    sumay = totalExtras.reduce(reducer);
    const moneda = new Intl.NumberFormat().format(sumay)
    total3.textContent = `$ ${moneda}`;
}

const leerExtras = async () => {

    let extrasJson = new Object();
    extrasJson['id_mes'] = mes;

    const peticion3 = await fetch(url5, {
        method: 'POST',
        body: JSON.stringify(extrasJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    extrasBase = await peticion3.json();
    console.log(extrasBase);
}

const llevarMsi = async () => {
    const conceptoMsi = document.querySelector('#conceptomsi');
    const cantidadMsi2 = document.querySelector('#cantidadmsi2');
    const msiMsi = document.querySelector('#msimsi');
    let extrasJson = new Object();
    console.log(conceptoMsi.value);
    extrasJson['id_mes'] = mes;
    extrasJson['conceptoMsi'] = conceptoMsi.value;
    extrasJson['cantidadMsi'] = cantidadMsi2.value;
    extrasJson['msiMsi'] = msiMsi.value;
    const peticion4 = await fetch(url3, {
        method: 'POST',
        body: JSON.stringify(extrasJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    conceptoMsi.value = '';
    cantidadMsi2.value = '';
    msiMsi.value = '';
    pedirHsbc()
        .then(() => pintarMsi());
}

const calcularTotal = () => {
    const totalDelMesValor = sumax +sumay;
    const decimal1 = parseFloat(totalDelMesValor).toFixed(2);
    const decimalMoneda = new Intl.NumberFormat().format(decimal1);
    totalDelMes.textContent=decimalMoneda;

}





reg2.addEventListener('click', llevarMsi);


reg1.addEventListener('click', llevarUna);

pedirHsbc()
    .then(() => pintarMsi())
    .then(() => leerExtras())
    .then(() => pintarUna())
    .then(()=> calcularTotal())