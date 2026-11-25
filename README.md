# Calculadora IPv4

Herramienta web para explorar el direccionamiento IPv4 a partir de una dirección y la longitud de su prefijo de red. Los cálculos se ejecutan en el navegador con JavaScript.

## Prueba la calculadora

[Abre la calculadora en GitHub Pages](https://danniel0663.github.io/CalculadoraIPV4/) o descarga el proyecto y abre `index.html` en tu navegador.

1. Escribe una dirección en formato decimal, por ejemplo `192.168.1.10`.
2. Introduce la longitud del prefijo, por ejemplo `24` para una máscara de `255.255.255.0`.
3. Pulsa **Calcular**. Cambia el prefijo a `25` y compara los resultados para la misma dirección.

## Código

El [formulario](index.html) recoge la dirección y el prefijo. La [lógica de cálculo](script.js) procesa los valores y la [hoja de estilos](styles.css) define la presentación.
