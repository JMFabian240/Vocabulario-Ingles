# Verbos Regulares e Irregulares en Pasado - TEMA 5: Eventos pasados

## Definición y Propósito
* En el Pasado Simple (formas afirmativas), los verbos principales deben mutar su estado para indicar que el evento expiró. Esta mutación se divide en dos arquitecturas: Regulares (algorítmicos) e Irregulares (excepciones de hardware).
* A nivel lógico, el sistema de verbos irregulares requiere un mapeo uno a uno en memoria a largo plazo (memorización), mientras que los regulares se pueden procesar bajo una fórmula repetitiva.

## Implementación y Sintaxis

### Arquitectura de Verbos Regulares
Estos verbos siguen una función estricta de concatenación. Se agrega el sufijo `-ed` a la raíz del verbo.
* Si el verbo termina en `e`, solo se añade `d` (ej. *live* -> *lived*).
* Si termina en consonante + `y`, se reemplaza por `ied` (ej. *study* -> *studied*).
* Si es una sílaba CVC (Consonante-Vocal-Consonante), se duplica la última consonante (ej. *stop* -> *stopped*).

### Arquitectura de Verbos Irregulares
No responden a ningún algoritmo de sufijos. La cadena de texto del verbo sufre una sobrescritura completa, parcial, o nula.

| Verbo Base | Mutación en Pasado | Tipo de Modificación |
| :--- | :--- | :--- |
| **Go** | went | Sobrescritura completa |
| **Buy** | bought | Alteración fonética masiva |
| **Eat** | ate | Reordenamiento de caracteres |
| **Cut** | cut | Sin modificación (Estático) |

## Justificación de la Estructura
Los verbos irregulares corresponden estadísticamente a las acciones más primitivas y utilizadas del ser humano (ir, comer, beber, tener). Su mutación irregular es un legado (Legacy Code) del Inglés Antiguo. Obligar al estudiante a "instalar" esta base de datos en su cerebro es el principal obstáculo del Tema 5, pero es indispensable para evitar el clásico "NullPointerException" al querer narrar una biografía.
