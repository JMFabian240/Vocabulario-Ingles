# Verbo Modal CAN para Citas - TEMA 6: Salud, malestares y recomendaciones

## Definición y Propósito
* En este módulo, el operador `Can` cambia su semántica tradicional de "habilidad física" para comportarse como un **gestor de permisos y disponibilidad**.
* A nivel lógico, se utiliza para realizar un "ping" a la agenda de un profesional (médico, dentista) y validar si existen ranuras de tiempo abiertas (Time Slots).

## Implementación y Sintaxis
Para concertar una cita formal, `Can` se invoca principalmente en formato interrogativo para abrir la negociación del permiso o la consulta de disponibilidad.

### Estructura Gramatical de Consultas

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Petición (Permiso)** | Can + I + Verbo(base) + Complemento? | *Can I make an appointment?* |
| **Validación de Agenda** | Can + Sujeto + Verbo(base) + TimeStamp? | *Can the doctor see me today?* |

## Justificación de la Estructura
Agendar una cita requiere validar concurrencia. Preguntar `Can I make an appointment?` es el protocolo estándar de Handshake (Apretón de manos) telefónico en inglés para iniciar la transferencia de datos (hora, fecha, síntomas) con la recepcionista.
