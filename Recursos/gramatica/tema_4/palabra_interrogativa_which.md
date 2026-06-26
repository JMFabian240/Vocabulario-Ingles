# Palabra interrogativa WHICH - TEMA 4: Tiendas y restaurantes

## Definición y Propósito
* La palabra `Which` es un operador de consulta excluyente. A diferencia de `What` (que tiene un rango de respuesta infinito o global), `Which` obliga al sistema (oyente) a seleccionar una respuesta de un array de opciones predefinido y finito.
* A nivel lógico, funciona exactamente como un menú de selección múltiple (Dropdown List).

## Implementación y Sintaxis
Para compilar sentencias de elección, `Which` se sitúa en el index 0 de la cadena interrogativa, seguido del sustantivo que se está filtrando, o directamente conectado al puntero.

### Estructura Gramatical de Consultas

| Tipo de Filtro | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Filtro Explícito** | Which + Sustantivo + do/does + Suj. + Verbo ? | *Which dress do you prefer?* |
| **Filtro Implícito** | Which + to be + (the) + Adj. ? | *Which is cheaper, the blue or the red?* |

## Justificación de la Estructura
El operador `Which` es fundamental en entornos comerciales (tiendas/restaurantes) porque encapsula las opciones disponibles. Si le preguntas a un vendedor "What shirt do you like?", asumes que puede elegir cualquier camisa del universo. Si dices "Which shirt do you like?", restringes su memoria a las opciones que le estás mostrando físicamente. Esta restricción optimiza el tiempo de procesamiento de la respuesta.
