# Sustantivos Contables e Incontables (Countable/Uncountable Nouns) - TEMA 1: Estilos de vida

## Definición y Propósito
* En la gramática del inglés, los sustantivos (nouns) funcionan como variables que almacenan información sobre objetos, lugares o conceptos. Estas variables se dividen estrictamente en dos "tipos de datos" fundamentales: Contables e Incontables.
* En el contexto del TEMA 1 (hábitos alimenticios), clasificar correctamente los alimentos y bebidas es esencial para asignar las porciones adecuadas y construir oraciones de consumo o compra.
* El dominio de este sistema de tipado evita errores críticos al momento de utilizar cuantificadores y modificadores gramaticales (como `a/an`, plurales o `How much/many`).

## Implementación y Sintaxis
Para manipular estas variables sin generar excepciones gramaticales, debemos respetar las propiedades intrínsecas de cada tipo de dato.

### 1. Tipado de Datos Fuerte: Contables vs. Incontables
| Tipo de Dato | Propiedades | Ejemplos (Alimentos y Hábitos) |
| :--- | :--- | :--- |
| **Contables (Countables)** | Son elementos discretos. Tienen forma singular y plural (ej. agregando `-s` o `-es`). Aceptan los artículos `a/an` (un/una) y números directos. | *Apple(s), banana(s), carrot(s), cookie(s), egg(s), meal(s).* |
| **Incontables (Uncountables)** | Son masas, líquidos o conceptos indivisibles. **NO** tienen plural ni aceptan números directos. Tampoco aceptan los artículos `a/an`. | *Water, milk, coffee, meat, chicken, cheese, sugar, sleep.* |

### 2. Casteo de Tipos (Type Casting): Transformando Incontables
En programación, cuando necesitamos que un tipo de dato se comporte como otro, utilizamos métodos de "casteo" (Type Casting) o clases "Wrapper". En inglés, aplicamos este mismo principio para cuantificar líquidos y masas: usamos **Recipientes o Porciones (Containers/Portions)** para envolver el sustantivo incontable y volverlo contable.

| Sustantivo Incontable (Dato Crudo) | Recipiente / Porción (Wrapper) | Sustantivo Contable Resultante (Casteado) |
| :--- | :--- | :--- |
| **Water** (Agua) | A glass of / A bottle of / A litre of | *A bottle of water* (Una botella de agua) |
| **Coffee** (Café) | A cup of | *A cup of coffee* (Una taza de café) |
| **Milk** (Leche) | A carton of / A glass of | *A carton of milk* (Un cartón de leche) |
| **Cake / Bread** (Pastel / Pan) | A slice of / A piece of | *A slice of cake* (Una rebanada de pastel) |

*Nota Sintáctica:* Una vez aplicado el contenedor, el que sufre la pluralización es el contenedor, no el sustantivo base (ej. `Two cups of coffee`, NUNCA `Two cups of coffees`).

## Justificación de la Estructura
El idioma inglés impone un sistema de tipado fuerte (Strong Typing) sobre los sustantivos para mantener la consistencia lógica de las cantidades. Intentar instanciar un número directo o el artículo pluralizador a un elemento incontable (ej. `I want a milk` o `I drink two waters`) genera un error de "Type Mismatch" para un hablante nativo, ya que el compilador mental asume que el agua es un flujo continuo, no una unidad discreta.

Al implementar el principio de los contenedores o modificadores de porción, logramos una Separación de Responsabilidades (SoC): delegamos la responsabilidad de la cuantificación al envase (`bottle`, `piece`, `glass`), permitiendo que el sustantivo base (`water`, `cake`, `milk`) conserve su naturaleza intacta. Dominar estas reglas previene la introducción de "bugs" o deuda técnica al hablar, garantizando sentencias semánticamente perfectas e inequívocas en el entorno de restaurantes, tiendas o clínicas médicas.