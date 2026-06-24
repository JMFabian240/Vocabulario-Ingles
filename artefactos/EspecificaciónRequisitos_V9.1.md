# **Documento de Especificación de Requisitos y Arquitectura (V9.1)**

**Proyecto:** App de Repaso de Inglés (Plataforma Multi-nivel)

**Autor:** José Manuel Fabian Hernández

**Arquitectura:** Electron \+ SQLite (IPC Communication)

## **1\. Requisitos Funcionales (RF)**

| ID | Módulo | Descripción del Requisito |
| :---- | :---- | :---- |
| **RF-01** | **Inicio \- Selección de Nivel** | Al iniciar la aplicación, el sistema mostrará una pantalla principal listando los niveles disponibles en la base de datos (ej. Inglés 1, Inglés 2). Al seleccionar un nivel, el usuario ingresará a los módulos específicos de dicho nivel. |
| **RF-02** | **Glosario \- Vista** | El sistema proveerá una vista "Glosario" con la lista de temas pertenecientes exclusivamente al nivel seleccionado. |
| **RF-03** | **Glosario \- Progreso** | El sistema calculará dinámicamente y mostrará el porcentaje completado de cada tema, basado en la cantidad de palabras/ejercicios dominados en ese tema. |
| **RF-04** | **Glosario \- Submódulos** | Al seleccionar un tema, el sistema permitirá navegar a subsecciones: Vocabulario, Expresiones Comunes, Reglas Gramaticales y Reglas de Oraciones. |
| **RF-05** | **Glosario \- Motor de Flashcards y Audio** | El estudio se realizará mediante Flashcards interactivas (inglés al frente, español/metadatos al reverso). Cada tarjeta contará con un botón de Audio que utilizará síntesis de voz nativa (TTS) para pronunciar el término en inglés. |
| **RF-06** | **Glosario \- Ciclo de Estudio (Bucle)** | El usuario evaluará cada tarjeta. Si se marca como "Correcto", no volverá a aparecer en la sesión actual. Si se marca como "Incorrecto", la tarjeta se enviará al final del mazo. El bucle continuará hasta que no queden tarjetas. Al iniciar una nueva sesión en el futuro, el mazo se reiniciará completo. |
| **RF-07** | **Gramática \- Vista** | El sistema proveerá una vista "Gramática" enfocada en teoría, listando los temas disponibles del nivel actual. |
| **RF-08** | **Gramática \- Lector** | Al ingresar a un tema, el sistema desplegará el texto enriquecido (Markdown/HTML) con las explicaciones gramaticales detalladas. |
| **RF-09** | **Ejercicios \- Vista Principal** | El sistema proveerá una vista "Práctica/Ejercicios", mostrando la lista de temas del nivel actual disponibles para evaluar. |
| **RF-10** | **Ejercicios \- Configuración de Sesión** | Al iniciar la práctica, el usuario elegirá con qué categoría empezar (Completar, Ordenar, Escribir) o si desea un "Modo Aleatorio" (mezclado). La sesión constará de un máximo de 15 ejercicios por ronda. |
| **RF-11** | **Ejercicios \- Completar** | El sistema presentará oraciones incompletas y requerirá que el usuario ingrese la forma verbal/palabra correcta para su validación. |
| **RF-12** | **Ejercicios \- Ordenar** | El sistema presentará fragmentos de una oración desordenados; el usuario deberá reorganizarlos (Drag & Drop o clics) para estructurar la oración. |
| **RF-13** | **Ejercicios \- Escribir** | El sistema proveerá un indicador (traducción/contexto) y un campo de texto donde el usuario redactará la oración completa. |
| **RF-14** | **Validación y Sanitización** | El sistema validará la entrada de texto (RF-11 y RF-13) aplicando sanitización (*trim*, *toLowerCase*) para evitar falsos negativos por espacios o mayúsculas. |
| **RF-15** | **Feedback de Error** | Al fallar un ejercicio, el sistema mostrará la respuesta correcta y un botón/enlace rápido para revisar la teoría en el módulo de Gramática correspondiente. |
| **RF-16** | **Ejercicios \- Puntuación** | El sistema evaluará la sesión y guardará el puntaje final (ej. aciertos sobre 15\) en SQLite, actualizando el progreso visual. |
| **RF-17** | **Persistencia de Datos** | Todo avance (flashcards marcadas como correctas, puntajes de ejercicios) se persistirá automáticamente en tiempo real en la base de datos local SQLite. |
| **RF-18** | **Configuración \- Gestor de Niveles** | El sistema contará con un gestor que permitirá crear, editar o eliminar "Niveles" completos. El Nivel actuará como la entidad raíz. |
| **RF-19** | **Configuración \- CRUD de Temas** | Dentro del gestor de un Nivel, el sistema permitirá crear, editar o eliminar 'Temas' completos vinculados a dicho Nivel, así como asignarles un orden de visualización secuencial. |
| **RF-20** | **Configuración \- Banco de Palabras** | Dentro del gestor de un Tema, se permitirá agregar palabras/expresiones (frente, reverso, tipo de palabra) al Glosario. |
| **RF-21** | **Configuración \- Reglas de Gramática** | Dentro del gestor de un Tema, se permitirá agregar o editar el contenido teórico asociado. |
| **RF-22** | **Configuración \- Banco de Ejercicios** | Dentro del gestor de un Tema, se permitirá crear nuevos ejercicios asignándoles un tipo y definiendo la respuesta esperada. |
| **RF-23** | **Configuración \- Importar/Exportar Cursos y Datos** | **NUEVO:** El sistema permitirá exportar un Nivel o Tema completo (empaquetado) a un archivo local, y de igual forma, permitirá la importación masiva de datos (JSON, CSV, MD) para poblar el contenido de un tema. |
| **RF-24** | **Tiempos Gramaticales** | El módulo de Vocabulario soportará metadatos gramaticales. Si la palabra es un "Verbo", el reverso mostrará automáticamente sus conjugaciones (Pasado, Participio). |
| **RF-25** | **Navegación \- Retroceso** | El sistema debe incluir un control visual (botón "Atrás") que mantenga el historial de navegación. |
| **RF-26** | **Navegación \- Inicio (Home)** | El sistema debe proveer un acceso directo (Home) para volver a la pantalla de "Selección de Nivel" desde cualquier vista de la aplicación. |

## **2\. Requisitos No Funcionales (RNF)**

| ID | Categoría | Descripción del Requisito |
| :---- | :---- | :---- |
| **RNF-01** | **Portabilidad** | El empaquetado final de la aplicación Electron debe ser ejecutable sin dependencias externas (standalone). |
| **RNF-02** | **Asincronía (Rendimiento)** | Las consultas a la base de datos SQLite deben realizarse mediante IPC de forma asíncrona para no bloquear el Hilo Principal de la interfaz. |
| **RNF-03** | **Almacenamiento Local** | El archivo .sqlite residirá en el directorio app.getPath('userData') del sistema operativo. |
| **RNF-04** | **Separación de Responsabilidades** | Se aplicará el patrón DAO (Data Access Object) en Node.js (Main Process) para abstraer la jerarquía relacional de la interfaz web (Renderer Process). |
| **RNF-05** | **Persistencia de Configuración** | El sistema contará con un repositorio de metadatos genéricos (clave-valor) para almacenar y persistir las configuraciones globales de la aplicación de forma centralizada. |

