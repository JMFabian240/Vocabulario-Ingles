# Uso de CAN y HAVE TO para Rechazar - TEMA 9: Invitaciones y proyectos

## Definición y Propósito
* Al recibir un payload (invitación) que el usuario no puede aceptar, el idioma inglés despliega un protocolo de manejo de excepciones (Exception Handling) utilizando `Can` (o `Can't`) y `Have to`.
* A nivel lógico, rechazar de manera seca ("No, I don't want to") es considerado una falla crítica de cortesía. En su lugar, se invoca `I can't` para excusarse y `I have to` para justificar el bloqueo con una tarea superpuesta.

## Implementación y Sintaxis

### Arquitectura de un Rechazo Formal
El algoritmo de rechazo formal requiere dos bloques de código combinados mediante el conector `because` o `but`.
1. **Bloque 1 (Incapacidad):** "I can't go" / "I'm sorry, I can't."
2. **Bloque 2 (Obligación Justificante):** "I have to [Action]."

### Estructura Gramatical de Respuesta

| Situación | Fórmula Sintáctica Estándar | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Rechazo Completo** | I can't + (go) + because + I have to + Verbo. | *I can't go because I have to study.* |
| **Declinar Suave** | I'd love to, but I have to + Verbo. | *I'd love to, but I have to work.* |

## Justificación de la Estructura
Este flujo de control gramatical mitiga el daño social. Usar `Have to` le informa a la base de datos (el emisor de la invitación) que el rechazo no se debe a una falta de deseo, sino a un "Constraint" externo (una obligación de sistema). Esto permite cerrar la conversación de manera segura y sin errores.
