const mes = localStorage.getItem('Mes');
console.log(mes);
let gastosP;
const url = '../php/traergastos.php'

const meses = ['nov21', 'dic21', 'ene22', 'feb22', 'mar22', 'abr22', 'may22', 'jun22', 'jul22', 'ago22', 'sep22', 'oct22', 'nov22', 'dic22']

let tipomes;

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
enviarMes()
    .then(() => pintarGP());

const pintarGP = () => {
    const tabla1 = document.querySelectorAll('#permanentes > tbody > tr > td');
    const total1 = document.querySelector('#total1');
    const elementos = Array.from(tabla1);
    console.log(elementos);

    for (let i = 0, j = 0; i < 9; i++, j += 3) {
        elementos[j].nextSibling.textContent = `$ ${Object.values(gastosP)[i]}`;
    }
    const reducer = (a, b) => a + b;
    const cantidades = Object.values(gastosP);
    const suma = cantidades.reduce(reducer);
    const moneda = new Intl.NumberFormat().format(suma)
    total1.textContent = `$ ${moneda}`;
};

const pintarCasillas = () => {

}