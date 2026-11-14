# BookApp 

Aplicación web full-stack de libros. El sistema implementa un CRUD completo para la gestión de una biblioteca digital, utilizando una arquitectura MVC.


## Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos & ORM:** MySQL, Sequelize ORM
* **Motor de Plantillas:** Handlebars (`express-handlebars`)
* **Estilos & UI:** Bootstrap, Bootstrap Icons, CSS Personalizado (Dark Green Theme)
* **Control de Versiones:** Git / GitHub


## Arquitectura del Proyecto

El proyecto sigue estrictamente el patrón **MVC**:
- **Models (`src/models/`):** Definición de entidades con Sequelize (Libro, Autor, Categoría, Editorial) y sus respectivas asociaciones relacionales.
- **Views (`src/views/`):** Vistas dinámicas en Handlebars organizadas por módulos (`libros`, `autores`, `categorias`, `editoriales` y layout principal).
- **Controllers (`src/controllers/`):** Lógica de negocio y manejo de peticiones HTTP para cada entidad.
- **Routes (`src/routes/`):** Enrutamiento modular de la aplicación.


## Módulos del Sistema

1. **Catálogo Principal (Home):** Vista general con tarjetas interactivas de libros, buscador avanzado y detalles de cada publicación.
2. **Mantenimiento de Libros:** Gestión completa (Crear, Editar, Eliminar y Listar) asociando autor, categoría, editorial, año y portada.
3. **Mantenimiento de Autores:** Registro de autores con conteo dinámico de libros asociados.
4. **Mantenimiento de Categorías:** Administración de géneros literarios y descripciones.
5. **Mantenimiento de Editoriales:** Control de casas editoriales con datos de contacto y país de origen.



## Guía de Instalación y Ejecución Local

Sigue estos pasos para levantar el proyecto en tu máquina local:

1. **Clonar el repositorio**

2. **Instalar las dependencias:**
   npm install

3. **Configurar las variables de entorno:**
   Crea un archivo .env en la raíz del proyecto basándote en la siguiente estructura:

    PORT=3000
    DB_NAME=bookapp_db
    DB_USER=root
    DB_PASSWORD=tu_contraseña_de_mysql
    DB_HOST=localhost
    DB_DIALECT=mysql

4. **Configurar la Base de Datos:**
   Asegúrate de tener MySQL corriendo y crea una base de datos vacía con el nombre bookapp_db (Sequelize se encargará de sincronizar las tablas automáticamente).

5. **Ejecutar la aplicación en modo desarrollo:**
    npm run dev

6. **Abrir en el navegador:**
    Entra a http://localhost:3000
