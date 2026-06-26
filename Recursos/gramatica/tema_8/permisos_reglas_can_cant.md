# Permisos y Reglas con CAN / CAN'T - TEMA 8: Obligaciones y reglas

## Definición y Propósito
* En el módulo de reglamentos, el operador `Can` asume el rol de autorizador de sistema, determinando si un usuario tiene o no permisos para ejecutar una acción en un entorno específico (escuela, museo, hospital).
* A nivel lógico, `Can` retorna `True` (Allow / Permitido) y `Can't` retorna `False` (Deny / Prohibido).

## Implementación y Sintaxis
Como todo verbo modal, se ubica directamente entre el sujeto y el verbo de acción, anulando cualquier conjugación adicional.

### Estructura Gramatical de Reglas

| Nivel de Acceso | Fórmula Sintáctica | Ejemplo de Referencia |
| :--- | :--- | :--- |
| **Acceso Permitido** | Sujeto + can + Verbo(base) + Entorno | *You can park here.* |
| **Acceso Denegado** | Sujeto + cannot (can't) + Verbo(base) | *You can't smoke in the hospital.* |

## Justificación de la Estructura
El uso de `Can't` es el estándar global para programar carteles y manuales de conducta. A diferencia de `Don't` (que es un imperativo/comando agresivo), `Can't` describe que la acción es imposible de ejecutar porque el sistema legal o normativo del lugar ha revocado los privilegios.
