# Uso de WANT TO para Deseos e Invitaciones - TEMA 9: Invitaciones y proyectos

## Definición y Propósito
* El verbo `Want` (querer) es el operador primitivo para expresar deseo directo o instanciar una propuesta casual. A diferencia de `Would like` (que es formal y encubierto), `Want to` es asíncrono, directo y se ejecuta en entornos de confianza.
* A nivel lógico, es la función cruda (Raw function) de una petición.

## Implementación y Sintaxis
`Want` es un verbo de acción estándar, por lo tanto hereda toda la lógica del Presente Simple (incluyendo el uso de `Do/Does` y la regla de la tercera persona `-s`).

### Regla del Infinitivo ("To")
Para enlazar el deseo con la acción a ejecutar, es imperativo interponer la partícula `to`. 

### Estructura Gramatical de Oraciones

| Situación | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Declarar Deseo** | Sujeto + want/wants + to + Verbo(base) | *I want to watch a movie.* |
| **Proponer/Invitar** | Do/Does + Sujeto + want + to + Verbo? | *Do you want to go out tonight?* |

## Justificación de la Estructura
En una arquitectura de software social, usar `Do you want to...?` se reserva para amigos o contextos muy informales (P2P). Omitir el conector `to` cuando sigue un verbo (ej. *I want watch a movie*) genera un error crítico de sintaxis conocido como choque de verbos. El conector `to` aísla ambos verbos en sus respectivos scopes.
