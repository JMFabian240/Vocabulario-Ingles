# Comparativos y Superlativos (Cortos y Largos) - TEMA 2: Comparaciones

## Definición y Propósito
* Las estructuras comparativas y superlativas funcionan como operadores relacionales diseñados para evaluar y jerarquizar dos o más entidades en función de sus propiedades (adjetivos).
* A nivel lógico, el **comparativo** evalúa la diferencia entre *exactamente dos* elementos (A > B), mientras que el **superlativo** extrae el elemento con el valor máximo o mínimo dentro de un array o conjunto mayor (A > Todos).
* El programa oficial exige la correcta concatenación de sufijos o la inyección de palabras clave (`more` / `most`), dependiendo estrictamente de la longitud silábica del adjetivo base.

## Implementación y Sintaxis
Para compilar sentencias comparativas y superlativas de forma segura, el motor gramatical divide los adjetivos en dos categorías de longitud: **cortos** (1 o 2 sílabas) y **largos** (3 o más sílabas). 

### Reglas de Conjugación (Adjetivos Cortos)
Cuando el adjetivo es corto, la mutación sintáctica ocurre agregando un sufijo al final de la palabra:
* **Comparativo:** Se añade `-er` al adjetivo base, seguido del operador relacional `than` (que). Ej. *fast* -> *faster than*.
* **Superlativo:** Se inyecta el artículo `the` antes del adjetivo y se añade el sufijo `-est`. Ej. *fast* -> *the fastest*.

### Reglas de Conjugación (Adjetivos Largos)
Los adjetivos largos no soportan la concatenación de sufijos. En su lugar, requieren la instanciación de una palabra auxiliar antes del adjetivo base:
* **Comparativo:** Se utiliza el operador `more` antes del adjetivo. Ej. *expensive* -> *more expensive than*.
* **Superlativo:** Se utiliza el operador `the most` antes del adjetivo. Ej. *expensive* -> *the most expensive*.

### Estructura Gramatical de Oraciones
A continuación se detallan los patrones de diseño sintáctico estandarizados:

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Comparativo Corto** | Sujeto + to be + Adj(er) + than + Objeto | *A car is faster than a bike.* |
| **Comparativo Largo** | Sujeto + to be + more + Adj + than + Objeto | *Gold is more expensive than silver.* |
| **Superlativo Corto** | Sujeto + to be + the + Adj(est) + Complemento | *He is the tallest in the class.* |
| **Superlativo Largo** | Sujeto + to be + the most + Adj + Complemento | *This is the most beautiful city.* |

## Justificación de la Estructura
El diseño de esta regla implementa un sistema de validación condicional basado en la fonética de la palabra. Si un adjetivo ya es largo (como *intelligent*), agregarle una sílaba extra rompería el flujo del lenguaje y generaría una "sintaxis pesada". Por ello, el idioma emplea el principio de composición (usando `more`/`the most`) para adjetivos complejos, y herencia simple (sufijos `-er`/`-est`) para adjetivos primitivos. La omisión del conector `than` en comparativos resulta en un error de compilación semántica.
