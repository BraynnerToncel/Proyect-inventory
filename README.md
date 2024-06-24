

Requisitos Previos
Antes de comenzar, asegúrate de tener instalado lo siguiente:

Node.js (versión X o superior)
npm o Yarn
Instalación
Sigue estos pasos para instalar las dependencias y configurar el proyecto:

Clona el repositorio

bash
Copiar código
git clone https://github.com/BraynnerToncel/Proyect-inventory
cd proyect-inventory
Instala las dependencias

Utiliza npm:

bash
Copiar código
npm install
O usa Yarn:

bash
Copiar código
yarn
Configuración
Antes de ejecutar el proyecto, asegúrate de configurar adecuadamente las variables de entorno. Copia el archivo .env.example a .env y configura las variables según sea necesario:

bash
Copiar código
cp .env.example .env
Edita .env con tus configuraciones:

# SERVER SETTINGS
PORT=1598
SERVER_IP=192.168.0.10

SERVER_PROTOCOL=http


#SECURE_PORT=8443

STORE_FILES_PATH=documents\files
#DATABASE SETTINGS (F)
DATABASE_TYPE= postgres
DATABASE_HOST= localhost
DATABASE_PORT= 5432
DATABASE_NAME= inventario
DATABASE_USERNAME= postgres
DATABASE_PASSWORD= 123456789
DATABASE_SYNC=false

Ejecución
Para ejecutar el proyecto, sigue estos pasos:

Compilar el código TypeScript

bash
Copiar código
npm run build
Este comando compilará el código TypeScript ubicado en src/ y lo transpilará a JavaScript en dist/.

Ejecutar la aplicación

bash
Copiar código
npm start
O si prefieres ejecutar en modo de desarrollo con soporte para recarga automática:

bash
Copiar código
npm run start:dev
Este comando iniciará el servidor NestJS en el puerto especificado en el archivo .env.

Uso
Describe cómo usar y probar tu aplicación una vez que esté en funcionamiento. Incluye ejemplos de endpoints, comandos de CLI, etc.

Documentación
Proporciona enlaces o instrucciones para acceder a la documentación generada automáticamente, como Swagger u OpenAPI.

Contribución
Si deseas contribuir al proyecto, sigue estos pasos:

Haz un fork del repositorio.
Crea una nueva rama (git checkout -b feature/fooBar).
Realiza tus cambios y haz commits (git commit -am 'Add some fooBar').
Haz push a la rama (git push origin feature/fooBar).
Crea un nuevo Pull Request.
Licencia
Describe la licencia bajo la cual se distribuye el proyecto.