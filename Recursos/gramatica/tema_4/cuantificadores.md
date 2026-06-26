# Cuantificadores - TEMA 4: Tiendas y restaurantes

## Definición y Propósito
* Los cuantificadores son operadores matemáticos gramaticales que indican la cantidad o volumen de un sustantivo sin necesidad de especificar un número exacto.
* A nivel lógico, sirven para retornar cantidades relativas (mucho, poco, algo, nada) dependiendo de si el dato es contable (Countable) o incontable (Uncountable).
* En el contexto de tiendas y restaurantes, son esenciales para gestionar pedidos o inventario de comida y objetos.

## Implementación y Sintaxis
Para construir sentencias válidas, el desarrollador debe mapear el cuantificador correcto según el tipo de sustantivo y la polaridad (Afirmativo, Negativo o Interrogativo) de la oración.

### Matriz de Cuantificadores Básicos

| Operador | Aplicación (Filtro) | Ejemplo de Uso |
| :--- | :--- | :--- |
| **Some** | Sentencias afirmativas (Contables plurales e incontables). Significa "algo de" o "unos". | *I have **some** apples.* |
| **Any** | Sentencias negativas e interrogativas (Contables e incontables). Significa "ningún" o "algo de". | *Do you have **any** milk?* / *I don't have **any** money.* |
| **A few** | Exclusivo para contables plurales. Significa "unos pocos". | *There are **a few** chairs.* |
| **A little** | Exclusivo para incontables. Significa "un poco de". | *I need **a little** sugar.* |
| **A lot of** | Universal (Contables e incontables) en oraciones afirmativas. Significa "mucho/a". | *She has **a lot of** friends.* |

### Estructura Gramatical de Oraciones

| Tipo de Declaración | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Petición/Afirmación** | Sujeto + Verbo + Cuantificador + Sustantivo | *We need some bread.* |
| **Consulta (Stock)** | Do/Does + Sujeto + have + any + Sustantivo ? | *Do you have any tables available?* |

## Justificación de la Estructura
Este tipado fuerte previene colisiones semánticas. Intentar usar `a few` con un incontable (ej. *a few water*) generará un error sintáctico severo. La existencia de `some` y `any` optimiza la legibilidad del código lingüístico: `some` establece un estado positivo de existencia, mientras que `any` evalúa dinámicamente un estado de duda o negación absoluta.
