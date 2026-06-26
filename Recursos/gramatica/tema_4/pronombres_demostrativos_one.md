# Pronombres demostrativos con ONE - TEMA 4: Tiendas y restaurantes

## Definición y Propósito
* La palabra `One` (y su plural `Ones`) se utiliza como una variable temporal (Placeholder) para reemplazar un sustantivo previamente instanciado en la conversación.
* A nivel lógico, su objetivo es evitar la repetición de código (redundancia léxica) y mantener el principio DRY (Don't Repeat Yourself) de la gramática.

## Implementación y Sintaxis
Cuando combinamos los punteros demostrativos (`This/That/Which`) con un adjetivo, inyectamos la variable `One` para suplir la ausencia del sustantivo original.

### Reglas de Reemplazo
* **Singular:** Sustituye el objeto por `one`.
* **Plural:** Sustituye los objetos por `ones`.

### Estructura Gramatical de Oraciones

| Situación | Sentencia Redundante (Evitar) | Refactorización con ONE (Recomendado) |
| :--- | :--- | :--- |
| **Singular** | I like the red shirt, not the blue shirt. | *I like the red **one**, not the blue **one**.* |
| **Plural** | These apples are better than those apples. | *These apples are better than those **ones**.* |
| **Interrogativa** | Which car is yours? The fast car? | *Which **one** is yours? The fast **one**?* |

## Justificación de la Estructura
En una transacción en una tienda, se asume que ambos clientes y vendedores ya inicializaron el objeto (ej. zapatos). Repetir "zapatos" en cada oración colapsa el flujo comunicativo. `One` funciona como un alias genérico que hereda las propiedades del último sustantivo declarado en memoria, asegurando que el código lingüístico sea limpio y altamente eficiente.
