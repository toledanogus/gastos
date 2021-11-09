const mes = localStorage.getItem('Mes');
//console.log(mes);
const enviarMes1 = document.querySelector('h1');

let suma1, suma2, suma3, suma4, sumaPagos, checados, sobrante, ingresoMes, conceptosPagados, pendiente, pagosActuales, gastosP, extrasBase, extrasBase2, tipomes, primera, segunda, resultadoFinal, totalTotal;

const url = '../php/traergastos.php';
const url2 = '../php/llevarextras.php';
const url3 = '../php/traerextras.php';
const url4 = '../php/traerIngreso.php';
const url5 = '../php/traerHsbc.php';
const url6 = '../php/registrarPagos.php';
const url7 = '../php/checados.php';


const meses = ['nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22']
const mesesCompletos = ['Noviembre 2021', 'Diciembre 2021', 'Enero 2022', 'Febrero 2022', 'Marzo 2022', 'Abril 2022', 'Mayo 2022', 'Junio 2022', 'Julio 2022', 'Agosto 2022', 'Septiembre 2022', 'Octubre 2022', 'Noviembre 2022', 'Diciembre 2022']

const seleccionar1 = document.querySelector('#quincena1');
const seleccionar2 = document.querySelector('#quincena2');
const element = meses.indexOf(mes);
const mesCompleto = mesesCompletos[element];
enviarMes1.textContent = mesCompleto;


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
    //Agregar quincenas hsbc:
    //gastosP.push({quincena1: primera}, {quincena2: segunda});
};

const pintarGP = () => {
    const tabla1 = document.querySelectorAll('#permanentes > tbody > tr > td');
    const total1 = document.querySelector('#total1');
    const elementos = Array.from(tabla1);
    //console.log(elementos);

    for (let i = 0, j = 0; i < 9; i++, j += 4) {
        elementos[j].nextElementSibling.textContent = `$ ${Object.values(gastosP)[i]}`;
    }
    const reducer = (a, b) => a + b;
    const cantidades = Object.values(gastosP);
    suma1 = cantidades.reduce(reducer);
    resultadoFinal = suma1;
    const moneda = new Intl.NumberFormat().format(resultadoFinal);
    total1.textContent = `$ ${moneda}`;
    /* if (suma3 == undefined || 0) {
        const resultadoFinal = suma1;
        const moneda = new Intl.NumberFormat().format(resultadoFinal);
        total1.textContent = `$ ${moneda}`;
    } else {
        const resultadoFinal = suma1 + suma3;
        const moneda = new Intl.NumberFormat().format(resultadoFinal);
        total1.textContent = `$ ${moneda}`;
    } */
};

const pintarCasillas = () => {
    document.querySelectorAll('td:nth-child(3):not(.hsbc)').forEach((x, y) => {
        const input = document.createElement('input');
        const conceptos = Object.keys(gastosP);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', conceptos[y]);
        input.setAttribute('value', conceptos[y]);
        console.log(conceptos);
        x.append(input);
    });

    document.querySelectorAll('td:nth-child(4):not(.hsbc)').forEach((x, y) => {
        const input = document.createElement('input');
        const conceptos = Object.keys(gastosP);
        input.setAttribute('type', 'checkbox');
        input.setAttribute('name', `parcial${conceptos[y]}`);
        input.setAttribute('value', `parcial${conceptos[y]}`);
        //input.setAttribute('checked', 'checked');
        x.append(input);
    });
}

const ingresarGasto = async () => {
    let conceptox = document.querySelector('#concepto').value;
    let concepto = conceptox.replace(/\s+/g, '_');
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
        //extrasBase2 Trae concepto, cantidad y mes de los extras que metí
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
    };

    for (let i = 0; i < extrasBase2.length; i++) {
        //console.log(extrasBase2[i]);
        const tr = document.createElement('tr');
        const t1 = document.createElement('td');
        let conx = document.createTextNode(extrasBase2[i][0]);
        //Obtengo un string de un textNode:
        const cony = conx.wholeText;
        console.log(cony);
        let con = cony.replace(/_+/g, ' ');
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
        //Agregar los extras al array de conceptos para sumarlos
        gastosP[`${extrasBase2[i][0]}`] = extrasBase2[i][1];
    }

    const totalExtras = extrasBase2.map((x) => {
        x = x[1];
        return x;
    })
    console.log(totalExtras);
    const reducer = (a, b) => a + b;
    if (totalExtras.length == 0) {
        totalExtras.push(0);
    }
    const suma = totalExtras.reduce(reducer);
    suma2 = suma;
    //Suma2 es la suma de todos los extras
    console.log(suma2);
    const moneda = new Intl.NumberFormat().format(suma)
    const total3 = document.querySelector('#totalextras');
    total3.textContent = `$ ${moneda}`;



    const gMes = document.querySelector('#gastosDelMes');
    //Se asigna la suma del total más los extras
    totalTotal = resultadoFinal + suma2;
    const moneda2 = new Intl.NumberFormat().format(totalTotal);
    gMes.textContent = `$ ${moneda2}`;

    const select = document.querySelector('#pendiente');
    pendiente = totalTotal - sumaPagos;
    const pendienteM = new Intl.NumberFormat().format(pendiente);
    select.textContent = `$ ${pendienteM}`;

    const select2 = document.querySelector('#sobrante');
    sobrante = ingresoMes - totalTotal;
    const sobranteM = new Intl.NumberFormat().format(sobrante);
    select2.textContent = `$ ${sobranteM}`;
    /* if (suma3 == undefined) {
        const resultadoTotal = suma1 + suma2;
        const resultadoTotal2 = new Intl.NumberFormat().format(resultadoTotal);
        gMes.textContent = `$ ${resultadoTotal2}`;
    } else {
        const resultadoTotal = suma1 + suma2 + suma3;
        const resultadoTotal2 = new Intl.NumberFormat().format(resultadoTotal);
        gMes.textContent = `$ ${resultadoTotal2}`;
    } */
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
    //console.log(ingreso);
    ingresoMes = ingreso.percepcion;
    const seleccionarIngreso = document.querySelector('#ingreso');
    const ingresoMoneda = new Intl.NumberFormat().format(ingreso.percepcion);
    seleccionarIngreso.textContent = `$ ${ingresoMoneda}`;
}

const irHsbc = () => {
    window.location.href = '../html/gushsbc.html';
}

const traerHsbc = async () => {

    //Aquí va lo que esté en la base de datos
    let ingresoJson = new Object();
    ingresoJson['id_mes'] = mes;
    const resp6 = await fetch(url5, {
        method: 'POST',
        body: JSON.stringify(ingresoJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const hsbc = await resp6.json();
    console.log(hsbc);
    if (hsbc.length > 0) {
        suma3 = hsbc[0][0];
        suma4 = hsbc[1][0];
        primera = suma3 / 2;
        segunda = suma4 / 2;
        gastosP['quincena1'] = primera;
        gastosP['quincena2'] = segunda;
        console.log(gastosP);
        console.log(primera, segunda);

    }
    const totalHsbc = document.querySelector('#totalhsbc');
    const ingresoMoneda = new Intl.NumberFormat().format(hsbc[0][0]);
    totalHsbc.textContent = `$ ${ingresoMoneda}`;
    const moneda1 = new Intl.NumberFormat().format(primera);
    seleccionar1.textContent = `$ ${moneda1}`;
    const moneda2 = new Intl.NumberFormat().format(segunda);
    seleccionar2.textContent = `$ ${moneda2}`;
}

const pagoCompleto = () => {
    let pagos = [0];
    conceptosPagados = [];
    document.querySelectorAll("input:checked:not([name^='parcial'])").forEach((x) => {
        x = x.value;
        pagos.push(gastosP[x]);
        conceptosPagados.push(x);
    });
    document.querySelectorAll("[name^='parcial']:checked").forEach((x) => {
        x = x.value;
        let z = x.replace(/parcial+/g, '');
        pagos.push(gastosP[z] / 2);
        conceptosPagados.push(x);
    });

    console.log(pagos);
    const reducer = (a, b) => a + b;
    sumaPagos = pagos.reduce(reducer);
    console.log(sumaPagos);
    console.log(conceptosPagados);
    console.log(gastosP);
}

const leerBase = async () => {
    let checarJson = new Object();
    checarJson['id_mes'] = mes;
    const resp8 = await fetch(url7, {
        method: 'POST',
        body: JSON.stringify(checarJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    checados = await resp8.json();
    //console.log(checados);
}

const registrarBase = async () => {
    const pagosJson = new Array();
    pagosJson.push(mes);
    for (let i = 0; i < conceptosPagados.length; i++) {
        pagosJson.push(conceptosPagados[i]);
    }
    const peticion7 = await fetch(url6, {
        method: 'POST',
        body: JSON.stringify(pagosJson),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    pagosActuales = await peticion7.json();
    console.log(pagosActuales);
}

const checar = () => {
    checados.forEach((x) => {
        const sel = document.querySelector(`input[name=${x[0]}]`);
        sel.setAttribute('checked', 'checked');
        sel.parentElement.previousElementSibling.setAttribute('class', 'tache');
    });
}

const checarInicial = () => {
    pagosActuales.forEach((x) => {
        const sel = document.querySelector(`input[name=${x[0]}]`);
        sel.setAttribute('checked', 'checked');
        sel.parentElement.previousElementSibling.setAttribute('class', 'tache');
        //sel.previousSibling.setAttribute('type', 'hidden');
        //console.log(sel);
    })
}

const calcularPago = () => {
    const select = document.querySelector('#pendiente');
    pendiente = totalTotal - sumaPagos;
    const pendienteM = new Intl.NumberFormat().format(pendiente);
    select.textContent = `$ ${pendienteM}`;

    const select2 = document.querySelector('#sobrante');
    sobrante = ingresoMes - totalTotal;
    const sobranteM = new Intl.NumberFormat().format(sobrante);
    select2.textContent = `$ ${sobranteM}`;

}

const removerCasillas = () => {
    document.querySelectorAll('input[type=checkbox]').forEach((x, y) => {
        if (x) {
            console.log('Sí hay inputs dibujados');
            const input2 = document.querySelector('td>input');
            console.log(input2);
            input2.remove();
        }
    });
}

enviarMes()
    .then(() => traerHsbc())
    .then(() => pintarGP())
    .then(() => leerExtras())
    .then(() => pintarExtras())
    .then(() => traerIngreso())
    .then(() => pintarCasillas())
    .then(() => leerBase())
    .then(() => checar())
    .then(() => pagoCompleto())
    .then(() => calcularPago())

const botonReg = document.querySelector('#registrar');
botonReg.addEventListener('click', () => {
    removerCasillas();
    ingresarGasto()
        .then(() => leerExtras())
        .then(() => traerIngreso())
        .then(() => pintarCasillas())
        .then(() => leerBase())
        .then(() => checar())
        .then(() => pagoCompleto())
        .then(() => calcularPago())
});
const botonHsbc = document.querySelector('#hsbc');
botonHsbc.addEventListener('click', irHsbc);

const botonPagado = document.querySelector('#pagado');
botonPagado.addEventListener('click', () => {
    pagoCompleto();
    registrarBase()
        .then(() => checarInicial())
        .then(() => calcularPago())
});