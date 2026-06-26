# Tiempo Pasado Simple - TEMA 5: Eventos pasados

## Definición y Propósito
* El Pasado Simple es el motor narrativo del idioma inglés. Se utiliza para ejecutar y describir eventos de acción dinámica que iniciaron y finalizaron por completo en un punto exacto del pasado.
* A nivel lógico, aísla un evento en la línea de tiempo sin relación con el presente (TimeStamp ya finalizado).

## Implementación y Sintaxis
El motor gramatical del Pasado Simple depende críticamente de un auxiliar universal (`Did`) para oraciones negativas e interrogativas, independientemente de si el sujeto es primera o tercera persona.

### Reglas de Procesamiento de Auxiliares
* **Afirmativas:** El verbo principal muta físicamente a su forma pasada. No hay auxiliar visible.
* **Negativas / Interrogativas:** Se inyecta el operador `Did`. Por el principio **DRY**, al usar `Did`, el verbo principal *debe* instanciarse en su forma base.

### Estructura Gramatical de Oraciones

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Afirmativo** | Sujeto + Verbo(pasado) + Complemento | *I played tennis yesterday.* |
| **Negativo** | Sujeto + did + not (didn't) + Verbo(base) + Comp. | *He didn't play tennis.* |
| **Interrogativo** | Did + Sujeto + Verbo(base) + Complemento ? | *Did you play tennis?* |

## Justificación de la Estructura
A diferencia del presente simple que tiene múltiples auxiliares (`do/does`) dependiendo del pronombre, el pasado simple unifica la lógica en un solo operador global: `Did`. Esta simplificación algorítmica acelera el procesamiento de sentencias. Sin embargo, el error de sintaxis más severo ocurre cuando el usuario conjuga el verbo principal estando el `Did` presente (ej. *Did he played?*). El sistema interpreta esto como un doble casting del tiempo pasado y aborta la comunicación.
