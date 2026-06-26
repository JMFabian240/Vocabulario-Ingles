# Adverbios de Frecuencia - TEMA 1: Estilos de vida

## Definición y Propósito
* Los adverbios de frecuencia actúan como indicadores que determinan la periodicidad o tasa de repetición con la que se ejecuta una acción o rutina.
* En el contexto del nivel básico, son componentes esenciales para describir hábitos alimenticios, de salud y el flujo de las rutinas diarias.
* El temario oficial exige el dominio de estos adverbios como regla gramatical obligatoria para acoplarse e iterar sobre el Presente Simple.

## Implementación y Sintaxis
Para construir oraciones precisas, el adverbio debe instanciarse en la posición correcta dentro de la cadena sintáctica. Hemos estructurado el vocabulario oficial en una matriz, ordenada lógicamente por su nivel de frecuencia (de mayor a menor iteración) para facilitar su consumo.

### Matriz de Adverbios de Frecuencia
A continuación se detalla el conjunto de datos de expresiones de frecuencia establecidas para este módulo:

| Adverbio (Inglés) | Traducción | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Always** | Siempre | *I always take a shower.* |
| **Almost always** | Casi siempre | *The door is almost always open.* |
| **Very often** | Muy a menudo | *I read English books very often.* |
| **Usually** | Generalmente/normalmente | *I usually do my homework at home.* |
| **Frequently** | Frecuentemente | *Paul frequently visits his grandmother.* |
| **Often** | A menudo | *I often read in my free time.* |
| **Sometimes** | Algunas veces | *I sometimes speak in Spanish in my class.* |
| **Seldom** | Raramente/pocas veces | *I seldom eat junk food.* |
| **Very rarely** | Muy raramente | *They very rarely go to the gym.* |
| **Almost never** | Casi nunca | *I almost never eat ice-cream.* |
| **Never** | Nunca | *I never study at night.* |
| **Ever** | Alguna vez | *Have you ever studied French?* |

### Estructura Gramatical de Oraciones
La inyección del adverbio varía dependiendo del verbo principal. Para evitar "bugs" de sintaxis, aplicamos dos patrones estandarizados:

| Contexto / Tipo de Verbo | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Con Verbos de Acción** | Sujeto + Adverbio de Frecuencia + Verbo + Comp. | *I always take a shower.* |
| **Con Verbo TO BE** | Sujeto + am/is/are + Adverbio de Frecuencia + Comp. | *She is always late.* |

## Justificación de la Estructura
En la arquitectura del idioma inglés, la posición del adverbio de frecuencia obedece a una regla estricta de ordenamiento espacial (Separation of Concerns posicional). Cuando operamos con verbos de acción regulares (como *eat*, *study*, *work*), el adverbio debe inyectarse **antes** del verbo principal para modificar directamente su comportamiento (ej. `I always study`). 

Sin embargo, cuando el núcleo de la oración es el Verbo *To Be* (am/is/are), la regla sintáctica se invierte y el adverbio debe ubicarse obligatoriamente **después** del verbo (ej. `She is always late`). Dominar esta dualidad estructural es crucial para mantener la consistencia gramatical, respetar el estándar de tipado del idioma y evitar la generación de sentencias lingüísticas defectuosas al describir nuestro estilo de vida.