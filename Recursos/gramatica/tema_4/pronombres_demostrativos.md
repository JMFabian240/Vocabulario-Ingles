# Pronombres demostrativos - TEMA 4: Tiendas y restaurantes

## Definición y Propósito
* Los pronombres demostrativos actúan como punteros (pointers) gramaticales. Su función es señalar la dirección en memoria y la proximidad física (cerca/lejos) de un objeto o grupo de objetos.
* A nivel lógico, cruzan dos variables booleanas: Pluralidad (Singular vs. Plural) y Distancia (Cerca vs. Lejos).

## Implementación y Sintaxis
El desarrollador debe inyectar el demostrativo exacto basado en la tabla de verdad de proximidad y cantidad.

### Matriz de Punteros Demostrativos

| Distancia (Input 1) | Cantidad (Input 2) | Puntero a Retornar | Ejemplo de Uso (Traducción) |
| :--- | :--- | :--- | :--- |
| **Cerca** (Here) | Singular | **This** | *This apple* (Esta manzana) |
| **Cerca** (Here) | Plural | **These** | *These apples* (Estas manzanas) |
| **Lejos** (There) | Singular | **That** | *That apple* (Esa manzana) |
| **Lejos** (There) | Plural | **Those** | *Those apples* (Esas manzanas) |

### Estructura Gramatical de Oraciones

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Declaración** | Puntero + Sustantivo + to be + Adj. | *This shirt is expensive.* |
| **Consulta** | How much + to be + Puntero + Sustantivo? | *How much are these pants?* |

## Justificación de la Estructura
En una tienda, el contexto visual es crítico. El uso de estos punteros evita redundancias (no necesitas repetir el nombre del objeto continuamente). La arquitectura gramatical provee un sistema de coordenadas espaciales: `This` renderiza el objeto en la mano del hablante, mientras que `That` lo renderiza en un estante distante. Error de compilación: Usar `This` con sustantivos plurales (ej. *This shoes*) corrompe la estructura.
