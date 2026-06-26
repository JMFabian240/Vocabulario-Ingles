# Pasado del Verbo TO BE - TEMA 5: Eventos pasados

## Definición y Propósito
* El verbo To Be en pasado se utiliza para instanciar el estado, identidad o ubicación espacial de un objeto/sujeto en un bloque de tiempo (Time Frame) que ya ha concluido.
* A nivel lógico, es el motor principal para declarar hechos históricos o estados emocionales/físicos que ya no son verdaderos en el presente.

## Implementación y Sintaxis
El verbo To Be en pasado requiere una mutación binaria dependiendo de la singularidad o pluralidad del sujeto instanciado.

### Matriz de Conjugación (Variables de Estado)
* **Was**: Se compila exclusivamente cuando el sujeto es `I`, `He`, `She` o `It` (1ra y 3ra persona del singular).
* **Were**: Se compila exclusivamente cuando el sujeto es `You`, `We` o `They` (Plurales y 2da persona).

### Estructura Gramatical de Oraciones

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Afirmativo** | Sujeto + Was / Were + Complemento | *She was in Paris yesterday.* |
| **Negativo** | Sujeto + Was not / Were not + Complemento | *They were not happy.* |
| **Interrogativo** | Was / Were + Sujeto + Complemento ? | *Was he your teacher?* |

## Justificación de la Estructura
A diferencia de los verbos regulares, el To Be no hereda el uso de auxiliares externos (como `did`) para formar negaciones o interrogaciones en pasado. Tiene privilegios de "Root", por lo que es autónomo: él mismo se posiciona al inicio de una pregunta y él mismo asume el operador negativo (`not`). Intentar usar `did` con el verbo To Be (ej. *Did you be in Paris?*) corrompe la sintaxis y lanza un error semántico.
