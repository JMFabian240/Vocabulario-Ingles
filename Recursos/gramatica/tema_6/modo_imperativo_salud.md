# Modo Imperativo (Salud) - TEMA 6: Salud, malestares y recomendaciones

## Definición y Propósito
* El Modo Imperativo, reinstanciado en el contexto de la salud, se utiliza para emitir recetas médicas, instrucciones de cuidado o comandos de emergencia ("Take your pills", "Don't eat sugar").
* A nivel lógico, funciona exactamente igual que en el Tema 3 (Direcciones): suprime la declaración del sujeto `[You]`, pasando el comando directamente al paciente.

## Implementación y Sintaxis
Se invoca el verbo principal en el index 0.

### Reglas de Ejecución Directa
* **Comando Afirmativo (Recomendación Fuerte):** Verbo(base) + Tratamiento.
* **Comando Negativo (Prohibición Médica):** Don't + Verbo(base) + Objeto Perjudicial.

### Estructura Gramatical de Comandos

| Estado | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Afirmativo** | Verbo(base) + Complemento | *Take this medicine.* |
| **Negativo** | Don't + Verbo(base) + Complemento | *Don't drink cold water.* |

## Justificación de la Estructura
En urgencias médicas o prescripciones, la claridad y velocidad del comando es prioritaria. Este modo despoja a la oración de cualquier decoración gramatical, reduciéndola a una función pura (`executeTreatment()`).
