# Preguntas con How, Who y Which - TEMA 2: Comparaciones

## Definición y Propósito
* Las interrogaciones que combinan palabras Wh- (`How`, `Who`, `Which`) con estructuras comparativas se diseñan para solicitar al usuario final que evalúe y seleccione entre opciones definidas.
* A nivel lógico, `Who` consulta por instancias de personas, `Which` por objetos/animales (opciones), y `How` consulta por propiedades mensurables combinadas con adjetivos.

## Implementación y Sintaxis
Para construir sentencias interrogativas orientadas a la evaluación comparativa, el operador interrogativo se posiciona en el index 0 de la oración, seguido de la estructura comparativa base.

### Matrices de Interrogación y Filtro

| Operador | Aplicación (Filtro) | Ejemplo de Uso (Comparativo) |
| :--- | :--- | :--- |
| **Who** | Se utiliza para instanciar comparaciones entre sujetos humanos. | *Who is taller, John or Mary?* |
| **Which** | Se utiliza para obligar a una elección (Array de opciones) entre objetos, animales o ideas. | *Which car is faster, the red one or the blue one?* |
| **How** | Se enlaza fuertemente (bind) con un adjetivo para consultar una métrica específica. | *How fast is your new car compared to the old one?* |

### Estructura Gramatical de Oraciones

| Tipo de Consulta | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Elección Directa** | Wh-Word + to be + Adj(comparativo) + , + Opción A + or + Opción B ? | *Which is better, pizza or sushi?* |
| **Consulta Métrica** | How + Adjetivo + to be + Sujeto + ? | *How heavy is that box?* |

## Justificación de la Estructura
Este diseño permite ejecutar consultas (queries) altamente específicas. Al encadenar una palabra Wh- con un operador comparativo y proveer explícitamente los parámetros A y B (separados por `or`), se restringe la entrada de datos del usuario (input) únicamente a las opciones proveídas. Funciona como un menú desplegable (Select) donde el usuario se ve forzado a devolver la opción con el valor más alto según el adjetivo solicitado.
