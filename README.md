Task Manager
============

Aplicación web para gestionar una lista de tareas, desarrollada con **React**, **React Router**, **Context API**, **useRef**, **useState**, **Express** y **MongoDB**.

Demo
----

* **Frontend:** [URL de Vercel](https://vercel.com/allison9/task-application-bc9a)
    
* **Backend/API:** [URL de la API](https://task-application-beta.vercel.app/tasks)
    
* **Repositorio:** [URL de GitHub](https://github.com/Allison-Eigsti/task-application)
    

## Tecnologías

### Frontend

- React 19
- React Router
- Context API (`useContext`)
- `useState`
- `useRef`
- Tailwind CSS
- Vite

### Backend

- Node.js
- Express
- MongoDB

### Deploy

- Vercel

## Funcionalidades

- Listado de tareas
- Crear nuevas tareas
- Editar tareas existentes
- Ver el detalle de una tarea
- Marcar tareas como completadas
- Eliminar tareas
- Filtrar tareas completadas y pendientes
- Gestión global del usuario mediante Context API
- Persistencia de tareas mediante una 
    

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Listado de tareas |
| `/new-task` | Crear una nueva tarea |
| `/edit/:id` | Editar una tarea |
| `/task/:id` | Ver el detalle de una tarea |

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Allison-Eigsti/task-application
cd dia32
```

### 2. Instalar las dependencias

Entrar en la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

### 3. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `backend`:

```env
PORT=3000
MONGO_URI=tu_cadena_de_conexion_de_mongodb
JWT_SECRET=tu_jwt_secret
```

> El archivo `.env` contiene información sensible y no debe subirse a GitHub.

## MongoDB Atlas

La aplicación utiliza **MongoDB Atlas** como base de datos.

Para configurar MongoDB:

1. Crear una cuenta en MongoDB Atlas.
2. Crear un clúster.
3. Crear un usuario para la base de datos.
4. Configurar las direcciones IP permitidas.
5. Obtener la cadena de conexión.
6. Añadirla a `MONGO_URI` dentro del archivo `.env`.

Ejemplo:

```env
MONGO_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/
```

La conexión con MongoDB se gestiona mediante **Mongoose**.

## Ejecutar el backend

Desde la carpeta `backend`:

```bash
npm run dev
```

El servidor estará disponible en:

```text
http://localhost:3000
```

---

## Configuración del frontend

### 1. Instalar las dependencias

Abrir una segunda terminal y entrar en la carpeta `frontend`:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

### 2. Configurar las variables de entorno

Crear un archivo `.env` dentro de la carpeta `frontend`:

```env
VITE_API_URL=http://localhost:3000
```

Esta variable permite que el frontend conozca la URL base de la API.

### 3. Ejecutar el frontend

Desde la carpeta `frontend`:

```bash
npm run dev
```

El frontend estará disponible normalmente en:

```text
http://localhost:5173
```

---

## Desarrollo local y producción

Durante el desarrollo local:

```env
VITE_API_URL=http://localhost:3000
```

En producción:

```env
VITE_API_URL=https://tu-api.vercel.app
```

De esta manera, la URL de la API puede cambiar entre los diferentes entornos sin modificar directamente el código del frontend.

---

## Formularios
-----------

Los formularios de creación y edición utilizan useRef para obtener los valores de los campos.

### Campos utilizados:

* Título
    
* Descripción
    

El estado de los formularios no depende de useState.

## Estado de las tareas
--------------------

La página principal utiliza useState para gestionar localmente la lista de tareas.

Los datos se obtienen mediante la API de Express y las acciones realizadas sobre las tareas actualizan la interfaz automáticamente.

## API
---

El backend está desarrollado con **Node.js + Express** y se encarga de gestionar las operaciones con **MongoDB**.

La API permite realizar operaciones como:

* Obtener tareas
    
* Crear tareas
    
* Editar tareas
    
* Completar y descompletar tareas
    
* Eliminar tareas
    



Autor
-----

Allison Eigsti

[github.com/Allison-Eigsti](https://github.com/Allison-Eigsti)