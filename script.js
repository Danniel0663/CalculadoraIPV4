function calcularIP() {
    const ip = document.getElementById('ip').value;
    const mascara = document.getElementById('mascara').value;

    // Validación básica
    if (!validarIP(ip) || !validarMascara(mascara)) {
        alert('Por favor, ingresa una IP y una máscara válidas.');
        return;
    }

    // Convierte la IP y máscara a binario
    const ipBin = ipADecimalABinario(ip);
    const mascaraBin = generarMascaraBinaria(mascara);

    // Cálculos
    const redBin = calcularRed(ipBin, mascaraBin);
    const broadcastBin = calcularBroadcast(ipBin, mascaraBin);
    const ipRed = binarioADecimal(redBin);
    const ipBroadcast = binarioADecimal(broadcastBin);
    const cantidadIPsUtiles = Math.pow(2, 32 - parseInt(mascara)) - 2;
    const rangoInicio = sumarABinario(redBin, 1);
    const rangoFin = sumarABinario(broadcastBin, -1);

    // Determina clase de IP
    const clase = determinarClaseIP(ip);

    // Determina si es privada o pública
    const tipoIP = esIPPrivada(ip) ? 'Privada' : 'Pública';

    // Mostrar resultados
    const resultados = document.getElementById('resultados');
    resultados.innerHTML = `
        <p><strong>IP de red:</strong> ${ipRed}</p>
        <p><strong>IP de Broadcast:</strong> ${ipBroadcast}</p>
        <p><strong>IP útiles:</strong> ${binarioADecimal(rangoInicio)} - ${binarioADecimal(rangoFin)}</p>
        <p><strong>Cantidad de IPs útiles:</strong> ${cantidadIPsUtiles}</p>
        <p><strong>Clase:</strong> ${clase}</p>
        <p><strong>IP pública/privada:</strong> ${tipoIP}</p>
        <div class="binario">
            <span class="red">${redBin.slice(0, mascara)}</span>
            <span class="subred">${redBin.slice(mascara, 32)}</span>
            <span class="host">${ipBin.slice(mascara)}</span>
        </div>
    `;
}

function validarIP(ip) {
    const regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return regex.test(ip) && ip.split('.').every(oct => oct >= 0 && oct <= 255);
}

function validarMascara(mascara) {
    return mascara >= 0 && mascara <= 32;
}

function ipADecimalABinario(ip) {
    return ip.split('.').map(oct => ('00000000' + parseInt(oct).toString(2)).slice(-8)).join('');
}

function generarMascaraBinaria(mascara) {
    return '1'.repeat(mascara) + '0'.repeat(32 - mascara);
}

function calcularRed(ipBin, mascaraBin) {
    let red = '';
    for (let i = 0; i < 32; i++) {
        red += ipBin[i] & mascaraBin[i];
    }
    return red;
}

function calcularBroadcast(ipBin, mascaraBin) {
    let broadcast = '';
    for (let i = 0; i < 32; i++) {
        broadcast += ipBin[i] | (1 - mascaraBin[i]);
    }
    return broadcast;
}

function binarioADecimal(binario) {
    const octetos = binario.match(/.{1,8}/g);
    return octetos.map(oct => parseInt(oct, 2)).join('.');
}

function sumarABinario(binario, cantidad) {
    const decimal = parseInt(binario, 2) + cantidad;
    return ('00000000000000000000000000000000' + decimal.toString(2)).slice(-32);
}

function determinarClaseIP(ip) {
    const primerOcteto = parseInt(ip.split('.')[0]);
    if (primerOcteto >= 1 && primerOcteto <= 126) return 'A';
    if (primerOcteto >= 128 && primerOcteto <= 191) return 'B';
    if (primerOcteto >= 192 && primerOcteto <= 223) return 'C';
    if (primerOcteto >= 224 && primerOcteto <= 239) return 'D';
    return 'E';
}

function esIPPrivada(ip) {
    const [o1, o2] = ip.split('.').map(Number);
    return (o1 === 10) || (o1 === 172 && o2 >= 16 && o2 <= 31) || (o1 === 192 && o2 === 168);
}
