const meses2 = ['ene21', 'feb21', 'mar21', 'abr21', 'may21', 'jun21', 'jul21', 'ago21', 'sep21', 'oct21', 'nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22'];
const mes = localStorage.getItem('Mes');
console.log(mes);
let msi, mesAPagar;
const url = '../php/gushsbc.php';
const url2 = '../php/llevarextras.php';
const url3 = '../php/traerextras.php';
const url4 = '../php/traerIngreso.php';


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
    const indiceActual = meses2.indexOf(mes);
    for (let i = 0, j = 0; i < msi.length / 4; i++, j += 4) {
        const indiceCompra = meses2.indexOf(msi[3 + j]);
        if (indiceCompra==-1) {
            mesAPagar='1'
        }else{
            mesAPagar = indiceActual-indiceCompra;
        }

        const deboRestante = (msi[j + 1]/msi[j + 2])*(msi[j + 2]-(mesAPagar-1));
        console.log(deboRestante);
        const deboRestante1 = parseFloat(deboRestante).toFixed(2);
        const mensualidad = msi[j + 1]/msi[j + 2];
        const mensualidad1 = parseFloat(mensualidad).toFixed(2);
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
}






pedirHsbc()
    .then(() => pintarMsi())