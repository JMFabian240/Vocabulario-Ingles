# Presente Simple - TEMA 1: Estilos de vida

## Definición y Propósito
* El Presente Simple es la estructura base utilizada para describir la rutina diaria y hablar sobre hábitos alimenticios y de salud.
* A nivel lógico, funciona como el motor principal para declarar hechos que son permanentes o acciones que se iteran con cierta periodicidad.
* El programa oficial estipula como requisito estricto el dominio del Presente simple (en sus tres formas), así como la correcta ejecución de respuestas cortas con Preguntas en Presente Simple.

## Implementación y Sintaxis
Para construir sentencias libres de errores, la sintaxis exige la manipulación del verbo principal o la inyección de operadores auxiliares (`do` / `does`), dependiendo del tipo de declaración y del sujeto que la ejecuta. 

### Reglas de Conjugación (Tercera Persona)
Cuando el sujeto es la tercera persona del singular (He, She, It), el verbo de acción sufre una mutación sintáctica exclusiva en oraciones afirmativas, requiriendo la adición del sufijo `-s` o `-es` al final de la palabra (ej. *teaches*).

### Estructura Gramatical de Oraciones
A continuación se detallan los patrones de diseño sintáctico estandarizados para compilar oraciones en este tiempo verbal:

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Afirmativo** | Sujeto + Verbo(s/es) + Complemento | *He teaches all day.* |
| **Negativo** | Sujeto + do/does + not + Verbo(base) + Comp. | *I do not eat meat.* |
| **Interrogativo** | (Wh-) + do/does + Sujeto + Verbo(base) + Comp. | *Where do you work?* |

### Matriz de Operadores Auxiliares y Respuestas Cortas
Los auxiliares se mapean estrictamente según el pronombre para procesar interrogaciones y manejar retornos booleanos (Yes/No):

| Pronombre | Auxiliar (Positivo / Negativo) | Respuesta Corta (Afirmativa / Negativa) |
| :--- | :--- | :--- |
| **I / You / We / They** | do / do not (don't) | Yes, I do. / No, I don't. |
| **He / She / It** | does / does not (doesn't) | Yes, he does. / No, he doesn't. |

## Justificación de la Estructura
El diseño gramatical del Presente Simple implementa un patrón de delegación mediante los auxiliares `do` y `does`. A diferencia del español, donde la negación se logra simplemente anteponiendo un "no", el motor gramatical del inglés exige invocar este operador auxiliar para aislar y procesar los estados negativos e interrogativos. 

Es crítico observar la aplicación de un principio gramatical equivalente a **DRY (Don't Repeat Yourself)**: en las formas negativa e interrogativa, la carga de procesar la tercera persona recae enteramente sobre el auxiliar (`does`). Por consiguiente, el verbo principal debe instanciarse estrictamente en su estado natural (`Verbo(base)`), evitando la redundancia y el error crítico de conjugar dos veces en la misma cadena de texto. Esta separación de responsabilidades (SoC) asegura la generación de sentencias lingüísticas limpias, escalables y sin deuda técnica.