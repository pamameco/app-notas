# Aplicación de Notas con Autenticación y Filtrado

## Instalación de la App Notas

### 1. Clonar o descargar el proyecto

Primero tener el proyecto descargado en el computador. Por ejemplo:

```
C:\app-notas
```

### 2. Instalar dependencias

Abrir una terminal (cmd) en la carpeta donde esta el proyecto y ejecutar:

```
npm install
```

Esto instalará las dependencias para que la aplicación funcione.

### 3. Iniciar la base de datos con JSON Server

La aplicación usa **JSON Server** para guardar usuarios y notas.\
En otra terminal (diferente a la de `npm install`), ejecuta:

```
json-server --watch db.json --port 3001
```

Esto levantará la base de datos en [http://localhost:3001](http://localhost:3001).

### 4. Iniciar la aplicación

Luego, en la terminal del proyecto (si se descargo en `C:/app-notas` por ejemplo), ejecutar:

```
npm start
```

Esto abrirá la aplicación en el navegador en [http://localhost:3000](http://localhost:3000).

---

## Uso de la aplicación

- Ingresa a la app desde [http://localhost:3000](http://localhost:3000) o donde indique el terminal.
- Puedes iniciar sesión con un usuario de prueba que ya existe en la base de datos:

**Correo:** `pablo@medel.com`\
**Clave:** `123465`

Desde allí podrás agregar, editar, eliminar y filtrar tus notas.\
Si prefieres crear una cuenta presionar el boton `Registrar`

---

## Flujo de la aplicación y componentes principales

La aplicación funciona de manera sencilla:

1. **Login/Register:** Permite iniciar sesión o registrarse. Los datos se guardan en **JSON Server**.
2. **Notas:** Página principal donde se pueden ver todas las notas del usuario, filtrarlas por título o contenido, agregar nuevas notas, editar o eliminar las existentes.
3. **Detalle de nota:** Permite ver el contenido completo de una nota específica.
4. **Gestión del estado:** El estado de usuario y notas se maneja con React Context, lo que mantiene la sesión activa y permite actualizar las notas en tiempo real.
5. **Decisiones de diseño:** Para que la aplicación tenga una apariencia atractiva y sin tanto codigo, se uso el CDN de Tailwind, así aprovechamos sus estilos directamente desde la web.


