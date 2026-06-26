# Palabras Interrogativas (Wh- Questions) - TEMA 1: Estilos de vida

## Definición y Propósito
* Las palabras interrogativas (conocidas como *Wh- questions*) actúan como parámetros de consulta específicos (query parameters) diseñados para extraer un dato exacto, en lugar de un simple retorno booleano (Yes/No).
* En el contexto del TEMA 1, son las herramientas principales para solicitar información detallada sobre las rutinas diarias, ubicaciones, horarios y frecuencias de los hábitos alimenticios y de salud.
* El programa oficial exige su integración fluida con la estructura del Presente Simple y el verbo To Be para compilar solicitudes de información precisas.

## Implementación y Sintaxis
Para ejecutar una consulta válida, la palabra interrogativa debe instanciarse en la posición cero (índice 0) de la cadena sintáctica, precediendo a cualquier operador auxiliar o verbo.

### Matriz de Parámetros de Consulta (Wh- Words)
A continuación se mapean las palabras interrogativas fundamentales para este módulo, junto con el tipo de dato que buscan recuperar:

| Parámetro (Wh- Word) | Tipo de Dato Solicitado (Traducción) | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **What** | Objeto / Acción (Qué / Cuál) | *What do you usually do on weekends?* |
| **Where** | Ubicación (Dónde / A dónde) | *Where do you work?* |
| **When** | Tiempo general (Cuándo / A qué hora) | *When do you get home?* |
| **What time** | Tiempo específico (A qué hora) | *What time do you go to school?* |
| **How** | Modo / Método (Cómo) | *How do you get to work?* |
| **How often** | Tasa de repetición (Qué tan frecuentemente) | *How often do you do exercise?* |

### Estructura Gramatical de Oraciones
La arquitectura de una pregunta informativa envuelve (wraps) la estructura interrogativa base del Presente Simple o del verbo To Be. 

| Contexto | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Con Verbos de Acción** | (Wh- Word) + do/does + Sujeto + Verbo(base) + Comp.? | *Where do you have lunch?* |
| **Con Verbo TO BE** | (Wh- Word) + am/is/are + Sujeto + Comp.? | *Where are you?* |

## Justificación de la Estructura
A nivel arquitectónico, las oraciones interrogativas en inglés implementan un estricto principio de *Separation of Concerns* (Separación de Responsabilidades). Al construir la sentencia `Where do you work?`, cada componente tiene una función aislada y específica:
1. **Where** define la naturaleza del dato esperado (un string de ubicación).
2. **do** actúa como el motor que inicializa el modo interrogativo y procesa la gramática (indicando que es presente y corresponde a 'you').
3. **you** es el sujeto u objeto de la consulta.
4. **work** es el verbo base o la acción sobre la que se consulta.

Es vital entender que inyectar una palabra interrogativa anula (overrides) la expectativa de una respuesta corta (Yes/No). El compilador gramatical espera que la respuesta devuelva exactamente el tipo de variable solicitada por el parámetro (por ejemplo, si la consulta inicia con *When*, el output debe contener una expresión de tiempo).