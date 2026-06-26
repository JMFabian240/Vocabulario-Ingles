# Modo Imperativo - TEMA 3: Dirección de lugares

## Definición y Propósito
* El Modo Imperativo es la estructura lingüística utilizada para emitir comandos directos, instrucciones, advertencias o directrices de navegación.
* A nivel lógico, suprime por completo la declaración del sujeto (el `Subject` es nulo o implícito `[You]`), ya que el motor gramatical asume que la orden se dirige directamente al intérprete (receptor).
* En el contexto del Tema 3, es la base para ejecutar algoritmos de dirección (dar indicaciones para llegar a un lugar).

## Implementación y Sintaxis
Para invocar una sentencia imperativa, el desarrollador (hablante) inicializa la oración directamente llamando al verbo de acción en su estado base.

### Reglas de Ejecución Directa
* **Afirmativo:** Se invoca el verbo principal en el index 0, sin conjugar.
* **Negativo:** Se debe inyectar el auxiliar `Do not` (o `Don't`) estrictamente antes del verbo de acción para anular la instrucción. 

### Estructura Gramatical de Comandos

| Estado | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Comando Afirmativo** | Verbo(base) + Complemento / Dirección | *Turn left at the next corner.* |
| **Comando Negativo** | Don't + Verbo(base) + Complemento | *Don't go straight.* |

## Justificación de la Estructura
La optimización del Imperativo radica en su minimalismo. Dado que dar direcciones requiere transmisión de datos rápida y sin latencia, el protocolo omite el pronombre "You". Al igual que en la ejecución de scripts o comandos en una terminal de consola, el sistema operativo (receptor) sabe que el comando va dirigido a él. Agregar el sujeto (ej. *You turn left*) transformaría el comando en una simple declaración de Presente Simple (descriptiva), perdiendo así los permisos de orden directa.
