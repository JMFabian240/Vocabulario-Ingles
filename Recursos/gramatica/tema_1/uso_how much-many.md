# Uso de HOW MUCH y HOW MANY - TEMA 1: Estilos de vida

## Definición y Propósito
* Los operadores `How much` y `How many` funcionan como parámetros de consulta cuantitativos, diseñados para extraer el valor numérico o la cantidad exacta de un elemento.
* En el entorno del nivel básico (hábitos alimenticios y de salud), son imprescindibles para auditar porciones, calcular ingestas (como litros de agua o piezas de pan) y medir tiempos (horas de sueño).
* La selección entre uno u otro depende estrictamente del tipo de dato que estemos evaluando: sustantivos contables (elementos discretos) o sustantivos incontables (masas, líquidos o conceptos abstractos).

## Implementación y Sintaxis
Para evitar errores de compilación gramatical, el sustantivo sobre el cual recae la consulta debe instanciarse inmediatamente después del operador `How much/many`, antes de invocar el motor del Presente Simple (`do/does`).

### Tipado Fuerte: Contables vs. Incontables
El idioma exige una validación de tipo (Type Checking) estricta antes de asignar el operador:

| Operador | Tipo de Dato Compatible | Concepto Lógico | Ejemplos de Vocabulario |
| :--- | :--- | :--- | :--- |
| **How many** | Sustantivos Contables (Countable Nouns) | Elementos discretos que se pueden iterar o pluralizar directamente. | *Meals, apples, carrots, hours, glasses.* |
| **How much** | Sustantivos Incontables (Uncountable Nouns) | Elementos continuos, líquidos o masas que no tienen forma plural natural. | *Water, sleep, time, bread, meat, cheese.* |

### Estructura Gramatical de Oraciones
El patrón de diseño para estas consultas envuelve al sustantivo objetivo y luego reutiliza la lógica estándar interrogativa.

| Tipo de Consulta | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Para Contables** | How many + Sustantivo(plural) + do/does + Sujeto + Verbo(base)? | *How many meals do you have in a day?* |
| **Para Incontables** | How much + Sustantivo(singular) + do/does + Sujeto + Verbo(base)? | *How much water do you drink?* |

## Justificación de la Estructura
A nivel lógico, la separación entre `How much` y `How many` obedece a un principio de consistencia de tipos. Tratar de usar *How many* con un elemento incontable (como el agua) generaría un error crítico (*Type Mismatch*), ya que no podemos cuantificar un líquido de forma discreta sin antes "castearlo" o envolverlo en un contenedor. 

Si necesitamos contar un elemento incontable, la arquitectura gramatical nos obliga a utilizar sustantivos de partición (contenedores) para transformarlo en contable. Por ejemplo, el "agua" (*water*) usa `How much`, pero si encapsulamos el agua en "vasos" (*glasses*), la propiedad a contar pasa a ser el vaso, permitiendo el uso de `How many` (ej. `How many glasses of water do you drink?`). Dominar este tipado fuerte es esencial para levantar perfiles de salud y dieta con precisión, evitando deudas técnicas en la fluidez conversacional.