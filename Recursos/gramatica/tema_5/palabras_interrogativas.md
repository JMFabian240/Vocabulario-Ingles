# Palabras interrogativas (WH-Questions) - TEMA 5: Eventos pasados

## Definición y Propósito
* Las `WH-Questions` (Who, What, Where, When, Why, How) son operadores de extracción de datos masivos. Mientras que una pregunta con `Did` (Yes/No) retorna un valor booleano, una pregunta `WH-` exige la extracción de variables complejas (Tiempo, Lugar, Razones, Entidades).
* A nivel lógico, se utilizan para interrogar a la base de datos (oyente) y obtener un string, objeto o array como respuesta.

## Implementación y Sintaxis
Para construir una consulta extractiva, el operador `WH-` exige la posición Index 0 absoluta en el encabezado de la oración. Acto seguido, se debe inyectar el protocolo estándar de pregunta (ej. el auxiliar `Did` o `Was/Were`).

### Mapeo de Variables y Operadores

| Operador | Tipo de Variable Solicitada | Ejemplo de Consulta (Query) |
| :--- | :--- | :--- |
| **Where** | Coordenadas / Location | *Where did you go on vacation?* |
| **When** | Timestamp / Date | *When did they arrive?* |
| **Who** | Subject ID / Person | *Who did you see at the party?* |
| **What** | Object / Event Data | *What did you eat for dinner?* |

### Estructura Gramatical de Consultas

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Con verbo TO BE** | WH-Word + was / were + Sujeto + ? | *Where were you yesterday?* |
| **Con Pasado Simple** | WH-Word + did + Sujeto + Verbo(base) + ? | *Why did she cry?* |

## Justificación de la Estructura
Las palabras interrogativas anulan el tipo de retorno booleano (Yes/No). Cuando el intérprete detecta el operador en el index 0, se prepara para buscar y emitir el valor exacto de la variable solicitada. Si el operador se omitiera y quedara solo `Did she cry?`, la base de datos simplemente regresaría un "True/False" en lugar de proveer el motivo.
