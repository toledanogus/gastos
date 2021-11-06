const mes = localStorage.getItem('Mes');
console.log(mes);
let suma1, suma2, suma3, gastosP, extrasBase, extrasBase2, tipomes;
const url = '../php/traergastos.php';
const url2 = '../php/llevarextras.php';
const url3 = '../php/traerextras.php';
const url4 = '../php/traerIngreso.php';

const meses = ['nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22']

switch (mes) {
    case meses[0]:
        tipomes = 'compartido';
        break;
    case meses[1]:
        tipomes = 'compartido';
        break;
    case meses[2]:
        tipomes = 'malo';
        break;
    case meses[3]:
        tipomes = 'bueno';
        break;
    case meses[4]:
        tipomes = 'malo';
        break;
    case meses[5]:
        tipomes = 'bueno';
        break;
    case meses[6]:
        tipomes = 'malo';
        break;
    case meses[7]:
        tipomes = 'solo';
        break;
    case meses[8]:
        tipomes = 'solo';
        break;
    case meses[9]:
        tipomes = 'solo';
        break;
    case meses[10]:
        tipomes = 'solo';
        break;
    case meses[11]:
        tipomes = 'solo';
        break;
    case meses[12]:
        tipomes = 'solo';
        break;
    case meses[13]:
        tipomes = 'solo';
        break;
    default:
        break;
}
const jsonMes = new Object();
jsonMes['mes'] = mes;
jsonMes['tipo'] = tipomes;

const enviarMes = async () => {
    const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(jsonMes),
        headers: {
            'content-type': 'application/json'
        }
    });
    gastosP = await resp.json();
    console.log(gastosP);
};

const pintarGP = () => {
    const tabla1 = document.querySelectorAll('#permanentes > tbody > tr > td');
    const total1 = document.querySelector('#total1');
    const elementos = Array.from(tabla1);
    console.log(elementos);

    for (let i = 0, j = 0; i < 9; i++, j += 3) {
        elementos[j].nextElementSibling.textContent = `$ ${Object.values(gastosP)[i]}`;
    }
    const reducer = (a, b) => a + b;
    const cantidades = Object.values(gastosP);
    const suma = cantidades.reduce(reducer);
    suma1 = suma;
    const moneda = new Intl.NumberFormat().format(suma)
    total1.textContent = `$ ${moneda}`;
};

const pintarCasillas = () => {
    const tabla1 = document.querySelectorAll('td:nth-child(3):not(.hsbc)').forEach((x) => {
        const input = document.createElement('input');
        const conceptos = Object.keys(gastosP);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', conceptos[0]);
        input.setAttribute('value', conceptos[0]);
        x.append(input);
    });
}

const ingresarGasto = async () => {
    let concepto = document.querySelector('#concepto').value;
    let cantidad = document.querySelector('#cantidad').value;
    console.log(concepto, cantidad);
    document.querySelector('#concepto').value = '';
    document.querySelector('#cantidad').value = '';

    let extrasJson = new Object();
    extrasJson['concepto'] = concepto;
    extrasJson['cantidad'] = cantidad;
    extrasJson['id_mes'] = mes;

    const enviarExtras = async () => {
        const peticion2 = await fetch(url2, {
            method: 'POST',
            body: JSON.stringify(extrasJson),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        extrasBase2 = await peticion2.json();
        console.log(extrasBase2);
    }
    enviarExtras()
        .then(() => pintarExtras())
}


const leerExtras = async () => {
    let extrasJson = new Object();
    extrasJson['id_mes'] = mes;
    const peticion3 = await fetch(url3, {
        method: 'POST',
        body: JSON.stringify(extrasJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    extrasBase2 = await peticion3.json();
    console.log(extrasBase2);

}



const pintarExtras = () => {
    if (extrasBase2.length >= 1) {
        const creados = document.querySelectorAll('#extras >tbody> tr > td');
        creados.forEach((x) => {
            x.parentNode.remove();
        })
    }

    for (let i = 0; i < extrasBase2.length; i++) {
        console.log(extrasBase2[i]);
        const tr = document.createElement('tr');
        const t1 = document.createElement('td');
        const con = document.createTextNode(extrasBase2[i][0]);
        t1.append(con);
        const t2 = document.createElement('td');
        const can = document.createTextNode(`$ ${extrasBase2[i][1]}`);
        t2.append(can);
        const t3 = document.createElement('td');
        //const pag = document.createTextNode(extrasBase2[i][2]);//voy a cambiarlo por las casillas
        //t3.append(pag);
        tr.append(t1, t2, t3);
        const concepto2 = document.querySelector('#total2');
        /* "afterbegin"
        "afterend"
        "beforebegin"
        "beforeend" */
        concepto2.insertAdjacentElement('beforebegin', tr);
    }
    const totalExtras = extrasBase2.map((x) => {
        x = x[1];
        return x;
    })
    console.log(totalExtras);
    const reducer = (a, b) => a + b;
    if (totalExtras.length==0) {
        totalExtras.push(0);
    }
    const suma = totalExtras.reduce(reducer);
    suma2 = suma;
    const moneda = new Intl.NumberFormat().format(suma)
    const total3 = document.querySelector('#totalextras');
    total3.textContent = `$ ${moneda}`;

    const gMes = document.querySelector('#gastosDelMes');
    const resultadoTotal = suma1 + suma2;
    const resultadoTotal2 = new Intl.NumberFormat().format(resultadoTotal);
    gMes.textContent = `$ ${resultadoTotal2}`;       
}

const traerIngreso = async () => {
    let ingresoJson = new Object();
    ingresoJson['id_mes'] = mes;
    const resp4 = await fetch(url4, {
        method: 'POST',
        body: JSON.stringify(ingresoJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const ingreso = await resp4.json();
    console.log(ingreso);
    const seleccionarIngreso = document.querySelector('#ingreso');
    const ingresoMoneda = new Intl.NumberFormat().format(ingreso.percepcion);
    seleccionarIngreso.textContent = `$ ${ingresoMoneda}`;
}

const irHsbc= () => {
    window.location.href='../html/gushsbc.html';
}





enviarMes()
    .then(() => pintarGP())
    .then(() => leerExtras())
    .then(() => pintarExtras())
    .then(() => traerIngreso())
//.then(()=> pintarCasillas())

const botonReg = document.querySelector('#registrar');
botonReg.addEventListener('click', ingresarGasto);
const botonHsbc = document.querySelector('#hsbc');
botonHsbc.addEventListener('click', irHsbc);