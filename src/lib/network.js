const dotted = n => [24,16,8,0].map(shift => (n >>> shift) & 255).join('.');

export function calculate(ip, prefix) {
  const octets = ip.trim().split('.');
  if (octets.length !== 4 || octets.some(o => !/^\d{1,3}$/.test(o) || Number(o) > 255)) {
    throw new Error('Escribe cuatro números del 0 al 255 separados por puntos.');
  }
  if (!Number.isInteger(prefix) || prefix < 0 || prefix > 32) throw new Error('Selecciona un prefijo del 0 al 32.');
  const [a,b] = octets.map(Number);
  const address = octets.reduce((n,o) => n * 256 + Number(o), 0);
  const size = 2 ** (32 - prefix);
  const start = Math.floor(address / size) * size;
  const end = start + size - 1;
  const offset = prefix < 31 ? 1 : 0;
  const privateIP = a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168);
  return {
    network: dotted(start), broadcast: prefix < 31 ? dotted(end) : 'No aplica',
    first: dotted(start + offset), last: dotted(end - offset), hosts: String(size - 2 * offset),
    mask: dotted(2 ** 32 - size), cidr: dotted(start) + '/' + prefix,
    scope: privateIP ? 'Privada' : 'Fuera de RFC 1918',
    group: a < 128 ? 'A' : a < 192 ? 'B' : a < 224 ? 'C' : a < 240 ? 'D' : 'E',
    bits: address.toString(2).padStart(32,'0')
  };
}
