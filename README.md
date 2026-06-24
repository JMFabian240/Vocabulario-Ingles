# App Repaso de Inglés II

## Descripción General
Esta es una aplicación de escritorio (LMS local) desarrollada para facilitar el repaso y aprendizaje de Inglés II. Construida con tecnologías web modernas y empaquetada mediante Electron, ofrece una experiencia de usuario fluida, rápida y reactiva. La aplicación permite a los usuarios repasar vocabulario, estudiar reglas gramaticales y poner a prueba sus conocimientos a través de ejercicios interactivos, almacenando todo el progreso y contenido localmente.

## Funcionalidades Principales

1. **Gestión Estructurada de Contenido**: 
   - Organización del material de estudio por **Niveles** y **Temas**, lo que facilita un aprendizaje progresivo y ordenado.

2. **Glosario Interactivo**: 
   - Un módulo dedicado para explorar, aprender y repasar vocabulario específico de cada tema.

3. **Lecciones de Gramática**: 
   - Sección para estudiar la estructura del idioma, con soporte para explicaciones detalladas y ejemplos (renderizado con Markdown).

4. **Ejercicios Prácticos**: 
   - Actividades interactivas diseñadas para poner a prueba y reforzar la retención del vocabulario y la comprensión de las reglas gramaticales.

5. **Panel de Configuración y Administración**:
   - Herramientas integradas para gestionar la aplicación, permitiendo añadir, editar o configurar los niveles y temas disponibles.

6. **Almacenamiento Local (Offline)**:
   - Funciona completamente sin conexión a internet. Utiliza una base de datos local (SQLite) para guardar la información, el glosario, las lecciones y el progreso del usuario de manera segura.

## Tecnologías Utilizadas
- **Frontend**: React, Vite, React Router DOM, React Markdown.
- **Iconografía**: Lucide React.
- **Escritorio**: Electron.
- **Base de Datos**: SQLite3.

## Instalación y Ejecución en Desarrollo

Para ejecutar este proyecto en tu entorno local:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/JMFabian240/Vocabulario-Ingles.git
   cd Vocabulario-Ingles
   ```

2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

3. Inicia la aplicación en modo desarrollo:
   ```bash
   npm run dev
   ```

## Autor y Licencia
Desarrollado por **José Manuel Fabian Hernández**.
Distribuido bajo la licencia **MIT**.
