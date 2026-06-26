# Verbo modal WOULD para ofrecimientos - TEMA 4: Tiendas y restaurantes

## Definición y Propósito
* El verbo modal `Would` opera como un condicional de cortesía. En el contexto del Tema 4, se utiliza específicamente para instanciar ofrecimientos o peticiones formales (ej. ofrecer el menú o pedir comida en un restaurante).
* A nivel lógico, `Would like` es la versión encriptada y diplomática del verbo primitivo `Want`. En lugar de exigir ("Quiero"), solicita ("Me gustaría").

## Implementación y Sintaxis
Al ser un modal, `Would` asume el rol de verbo auxiliar principal, desplazando a `Do`/`Does` en las consultas interrogativas.

### Reglas de Ejecución
* **Afirmativo:** Se coloca después del sujeto y antes del verbo principal `like`.
* **Interrogativo:** Se inicializa en el index 0 para invocar la pregunta.

### Estructura Gramatical de Oraciones

| Forma | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Ofrecimiento** | Would + Sujeto + like + (some) + Objeto ? | *Would you like some coffee?* |
| **Petición (Order)** | Sujeto + would + like + Objeto + , please | *I would like a salad, please.* |

## Justificación de la Estructura
La implementación de verbos modales en el inglés garantiza la seguridad de tipos en interacciones sociales (Social Protocol). Utilizar el verbo primitivo `Want` en un restaurante (ej. *I want a coffee*) se compila como un string agresivo. Invocar el método `Would like` aplica un middleware de cortesía que retorna la misma instrucción pero con los permisos sociales adecuados.
