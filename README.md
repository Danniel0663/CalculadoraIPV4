# Calculadora IPv4

[Usar la calculadora](https://danniel0663.github.io/CalculadoraIPV4/)

Introduce una IPv4 y un prefijo CIDR para consultar la dirección de red, la máscara, el broadcast y el rango de hosts. La vista binaria distingue los bits de red y host por octeto. Los cálculos se realizan en el navegador. Para /31 se consideran enlaces punto a punto y para /32 una dirección individual.

## Desarrollo

Con Node.js 24, ejecuta `npm ci` y `npm run dev`. La página y los estilos están en `src/`. Usa `npm run build` para compilar con Astro y Tailwind CSS y `npm run preview` para revisar el resultado.

GitHub Pages sirve los archivos estáticos desde la raíz. Al publicar una nueva compilación, sincroniza `dist/index.html` y `dist/assets/` con sus equivalentes en la raíz.
