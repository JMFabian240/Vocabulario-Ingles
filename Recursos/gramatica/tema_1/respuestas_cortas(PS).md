# Respuestas Cortas en Presente Simple - TEMA 1: Estilos de vida

## Definición y Propósito
* Las respuestas cortas (*short answers*) son el mecanismo estándar para manejar retornos booleanos (Verdadero/Falso o Yes/No) ante consultas cerradas en Presente Simple.
* A nivel de diseño, su propósito es optimizar la comunicación evitando la redundancia; en lugar de reimprimir toda la cadena de texto de la pregunta original, se devuelve una confirmación o negación concisa.
* En el contexto del nivel básico, se utilizan constantemente para validar o refutar información sobre hábitos, rutinas o preferencias alimenticias (ej. ¿Comes carne? Sí).

## Implementación y Sintaxis
Para compilar una respuesta corta válida, la regla de sintaxis prohíbe el uso del verbo principal (ej. *eat*, *work*, *study*). En su lugar, el operador auxiliar (`do` o `does`) actúa como un puntero (pointer) que encapsula y representa la acción completa consultada.

### Matriz de Retornos (Respuestas Cortas)
La respuesta se mapea estrictamente basándose en el pronombre (sujeto) que responde, seleccionando el auxiliar correspondiente a su polaridad (positiva o negativa):

| Pronombre de Respuesta | Auxiliar Afirmativo (True) | Auxiliar Negativo (False) | Ejemplo de Consulta (Input) -> Retorno (Output) |
| :--- | :--- | :--- | :--- |
| **I / We / You / They** | do | do not (don't) | *Do you eat vegetables?* -> **Yes, I do.** / **No, I don't.** |
| **He / She / It** | does | does not (doesn't) | *Does she work here?* -> **Yes, she does.** / **No, she doesn't.** |

### Estructura Gramatical Estándar
El bloque de código de una respuesta corta siempre sigue uno de estos dos patrones de diseño:

| Tipo de Retorno | Fórmula Sintáctica |
| :--- | :--- |
| **Positivo (Yes)** | Yes + [,] + Sujeto (Pronombre) + do/does[.] |
| **Negativo (No)** | No + [,] + Sujeto (Pronombre) + don't/doesn't[.] |

*Nota de Formateo:* La coma `,` después del Yes/No y el punto final `.` son delimitadores sintácticos obligatorios en la escritura formal.

## Justificación de la Estructura
La arquitectura de las respuestas cortas es la implementación lingüística perfecta del principio **DRY (Don't Repeat Yourself)**. Si el "Input" es `Do you play soccer on weekends?`, un retorno ineficiente (aunque gramaticalmente correcto) sería reimprimir toda la cadena: `Yes, I play soccer on weekends`. 

El idioma inglés resuelve esta ineficiencia utilizando el auxiliar `do`/`does` como un token de validación. Al devolver `Yes, I do`, el hablante está indicando que el bloque de código de la pregunta ha sido procesado afirmativamente sin necesidad de malgastar recursos (tiempo/saliva) repitiendo la acción. Es crucial recordar que nunca se debe mezclar el verbo *To Be* en una respuesta corta que fue inicializada con *Do/Does* (ej. `Do you work? -> Yes, I am` es un error crítico de tipo incompatible o *Type Mismatch*).