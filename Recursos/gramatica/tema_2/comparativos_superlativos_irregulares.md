# Comparativos y Superlativos Irregulares - TEMA 2: Comparaciones

## Definición y Propósito
* Los adjetivos irregulares son casos excepcionales (excepciones de sintaxis) que escapan al algoritmo estándar de sufijos (`-er`/`-est`) y operadores (`more`/`most`).
* Su propósito lógico es el mismo: evaluar diferencias o extraer el extremo superior de una propiedad.
* El programa oficial requiere memorizar explícitamente estas mutaciones de estado, ya que no siguen un patrón deducible.

## Implementación y Sintaxis
Al ser irregulares, la palabra base se sobrescribe por completo (hardcoded data) en lugar de ser concatenada. No existe un sufijo; la palabra entera cambia.

### Matriz de Transformación (Hardcoded)
A continuación se listan las excepciones más comunes que el motor del idioma espera que manejes manualmente:

| Adjetivo Base (Valor Inicial) | Comparativo (A > B) | Superlativo (Max Value) |
| :--- | :--- | :--- |
| **Good** (Bueno) | better than | the best |
| **Bad** (Malo) | worse than | the worst |
| **Far** (Lejos) | farther / further than | the farthest / the furthest |

### Estructura Gramatical de Oraciones
El despliegue en la oración sigue los mismos patrones que los adjetivos regulares:

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Comparativo** | Sujeto + to be + IrregularComp + than + Objeto | *This pizza is better than yours.* |
| **Superlativo** | Sujeto + to be + IrregularSup + Complemento | *That was the worst movie ever.* |

## Justificación de la Estructura
En programación lingüística, estas irregularidades son vestigios de versiones antiguas del idioma (Inglés Antiguo). Al no haber sido refactorizados con el paso de los siglos, obligan al usuario a tratarlos como "constantes globales". Intentar aplicar la regla general sobre ellos (ej. *gooder* o *badest*) causará un fallo crítico en la validación del lenguaje (Exception: InvalidSyntax).
