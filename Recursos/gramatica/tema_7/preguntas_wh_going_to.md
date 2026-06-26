# Preguntas con Going y WH-Questions - TEMA 7: Futuro para planes y proyectos

## Definición y Propósito
* La conjunción del futuro `Going to` con las palabras `WH-` (Where, When, What, Who) permite extraer información altamente detallada sobre la planificación futura de un proyecto o evento.
* A nivel lógico, cambia el retorno de la función de un booleano (Yes/No) a una variable de contexto (Lugar, Fecha, Detalles, Responsable).

## Implementación y Sintaxis
El operador `WH-` asume la jerarquía máxima y se posiciona en el Index 0, empujando al verbo `to be` (am/is/are) a la posición número 2, y al sujeto a la posición número 3.

### Estructura Gramatical de Consultas de Proyecto

| Tipo de Query | Fórmula Sintáctica (Query Engine) | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Locación Futura** | Where + am/is/are + Sujeto + going to + Verbo? | *Where are you going to stay?* |
| **Timestamp (Fecha)** | When + am/is/are + Sujeto + going to + Verbo? | *When is she going to arrive?* |
| **Acción Específica** | What + am/is/are + Sujeto + going to + do? | *What are we going to do?* |

## Justificación de la Estructura
Esta sintaxis es la base de la gestión de proyectos en inglés. Permite mapear toda la arquitectura de un plan. Un error común es olvidar el verbo `to be` tras la palabra `WH-` (ej. *Where you going to stay?*), lo cual es una sintaxis malformada que los analizadores estrictos de gramática no compilarán.
