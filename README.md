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
5. **Decisiones de diseño:** Quise que la aplicación sea fácil de usar y atractiva, condiseño no tan invasivo. Para eso, usé el **CDN de Tailwind**, así pude aplicar estilos modernos sin escribir mucho código.\
Agregué un **navbar** que muestra quién está conectado y un **botón de desconectar** para salir rápido. Todo está pensado para que cualquier persona pueda entender al instante cómo usar la App Notas.\
La idea fue mantener todo **intuitivo y claro**: formularios simples, botones visibles y un filtro de notas que funcione directamente desde la pantalla.

---

### Pruebas básicas

Para asegurarse de que la aplicación funciona correctamente, se pueden realizar estas pruebas:

1. **Registro de usuario:**  
   - Ir a la página de registro.  
   - Crear un usuario con correo y contraseña.  
   - Verificar que después de registrarse se redirige a la lista de notas.

2. **Login:**  
   - Ir a la página de inicio de sesión.  
   - Ingresar un usuario existente.  
   - Confirmar que permite acceder a las notas.  
   - Intentar ingresar con datos incorrectos y verificar que aparece un mensaje de error.

3. **Agregar nota:**  
   - En la página de notas, escribir un título y contenido.  
   - Hacer clic en “Agregar Nota”.  
   - Comprobar que la nota aparece en la lista.

4. **Editar nota:**  
   - Seleccionar una nota y hacer clic en “Editar”.  
   - Cambiar título o contenido y guardar.  
   - Verificar que los cambios se reflejan correctamente.

5. **Eliminar nota:**  
   - Seleccionar una nota y hacer clic en “Eliminar”.  
   - Confirmar que la nota desaparece de la lista.

6. **Filtrado de notas:**  
   - Escribir palabras clave en la barra de búsqueda.  
   - Verificar que solo aparecen las notas que coinciden con la búsqueda.

7. **Ver detalle de nota:**  
   - Hacer clic en “Ver Nota”.  
   - Confirmar que se muestra el título y contenido completo.  
   - Regresar a la lista de notas.

8. **Cerrar sesión:**  
   - Hacer clic en “Desconectar”.  
   - Comprobar que redirige al login y no permite acceder a notas sin iniciar sesión.
