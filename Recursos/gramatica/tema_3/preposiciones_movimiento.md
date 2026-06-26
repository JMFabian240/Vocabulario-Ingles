# Preposiciones de Movimiento - TEMA 3: Dirección de lugares

## Definición y Propósito
* Las preposiciones de movimiento actúan como vectores direccionales que dictan el flujo y la trayectoria de una entidad en un espacio físico tridimensional o plano de coordenadas.
* A diferencia de las preposiciones de lugar (que declaran estados estáticos), estas exigen siempre un verbo de acción dinámica que procese desplazamiento (ej. *go*, *walk*, *drive*).

## Implementación y Sintaxis
Para que una preposición sea catalogada "de movimiento", debe inyectarse inmediatamente después del verbo de desplazamiento, vinculando la acción con el nodo destino.

### Matriz de Vectores Direccionales

| Preposición (Vector) | Trayectoria Ejecutada | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **To** | Apunta al nodo final o destino. | *Walk **to** the bank.* |
| **Into** | Penetra el volumen (entrar) de un espacio cerrado. | *Go **into** the building.* |
| **Out of** | Eyecta o extrae del volumen interior hacia el exterior. | *Drive **out of** the parking lot.* |
| **Across** | Cruza perpendicularmente una superficie (calle/puente). | *Walk **across** the street.* |
| **Along** | Se desplaza paralelamente a una línea o borde (calle/río). | *Go **along** the avenue.* |
| **Past** | Supera un nodo de referencia (pasar de largo) sin detenerse. | *Walk **past** the hospital.* |

### Estructura Gramatical de Navegación

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Dirección Estándar** | Verbo de Mov. + Preposición + Punto de Ref. | *Go across the bridge.* |

## Justificación de la Estructura
El uso estricto de preposiciones de movimiento garantiza que los algoritmos de navegación sean precisos. Si el hablante omitiese estas preposiciones o utilizara preposiciones estáticas (como `in` o `on`), el intérprete (oyente) no recibiría la confirmación de desplazamiento, generando un error semántico de posicionamiento (ej. *Walk on the street* significa "camina sobre la calle", no "cruza la calle"). Esta separación de responsabilidades entre el Verbo (motor) y la Preposición (vector) permite construir instrucciones de ruteo perfectas.
