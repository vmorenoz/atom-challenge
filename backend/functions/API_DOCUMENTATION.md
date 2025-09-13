# Task Management API Documentation

Este documento describe las 6 Cloud Functions para la aplicación de gestión de tareas.

## Endpoints

### User Functions

#### 1. Find User
- **Endpoint**: `POST /findUser`
- **Descripción**: Busca un usuario por su correo electrónico
- **Body**:
```json
{
  "email": "user@example.com"
}
```
- **Response Success (200)**:
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "user@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User found successfully"
}
```
- **Response Not Found (404)**:
```json
{
  "success": false,
  "error": {
    "message": "User not found",
    "code": 404
  }
}
```

#### 2. Add User
- **Endpoint**: `POST /addUser`
- **Descripción**: Crea un nuevo usuario
- **Body**:
```json
{
  "email": "newuser@example.com"
}
```
- **Response Success (201)**:
```json
{
  "success": true,
  "data": {
    "id": "user123",
    "email": "newuser@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User created successfully"
}
```

### Task Functions

#### 3. Get Tasks
- **Endpoint**: `GET /getTasks?userId={userId}`
- **Descripción**: Obtiene todas las tareas de un usuario ordenadas por fecha de creación (más recientes primero)
- **Query Parameters**:
  - `userId` (required): ID del usuario
- **Response Success (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": "task123",
      "userId": "user123",
      "title": "Completar proyecto",
      "description": "Finalizar el desarrollo del proyecto React",
      "completed": false,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "message": "Found 1 tasks"
}
```

#### 4. Add Task
- **Endpoint**: `POST /addTask`
- **Descripción**: Crea una nueva tarea
- **Body**:
```json
{
  "userId": "user123",
  "title": "Nueva tarea",
  "description": "Descripción de la tarea"
}
```
- **Response Success (201)**:
```json
{
  "success": true,
  "data": {
    "id": "task123",
    "userId": "user123",
    "title": "Nueva tarea",
    "description": "Descripción de la tarea",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "Task created successfully"
}
```

#### 5. Update Task
- **Endpoint**: `PUT /updateTask/{taskId}`
- **Descripción**: Actualiza una tarea existente
- **URL Parameters**:
  - `taskId` (required): ID de la tarea a actualizar
- **Body** (todos los campos son opcionales):
```json
{
  "title": "Título actualizado",
  "description": "Descripción actualizada", 
  "completed": true
}
```
- **Response Success (200)**:
```json
{
  "success": true,
  "data": {
    "id": "task123",
    "userId": "user123",
    "title": "Título actualizado",
    "description": "Descripción actualizada",
    "completed": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T01:00:00.000Z"
  },
  "message": "Task updated successfully"
}
```

#### 6. Delete Task
- **Endpoint**: `DELETE /deleteTask/{taskId}`
- **Descripción**: Elimina una tarea
- **URL Parameters**:
  - `taskId` (required): ID de la tarea a eliminar
- **Response Success (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

## Error Responses

Todas las funciones pueden retornar los siguientes errores:

### 400 - Bad Request
```json
{
  "success": false,
  "error": {
    "message": "Error message describing what went wrong",
    "code": 400
  }
}
```

### 404 - Not Found
```json
{
  "success": false,
  "error": {
    "message": "Resource not found",
    "code": 404
  }
}
```

### 405 - Method Not Allowed
```json
{
  "error": "Method not allowed"
}
```

### 500 - Internal Server Error
```json
{
  "success": false,
  "error": {
    "message": "Internal server error",
    "code": 500
  }
}
```

## Arquitectura

El proyecto sigue el patrón de arquitectura en capas:

1. **Models**: Interfaces TypeScript para User y Task
2. **Repositories**: Capa de acceso a datos (Firestore)
3. **Services**: Lógica de negocio
4. **Controllers**: Manejo de requests HTTP
5. **Cloud Functions**: Endpoints públicos

### Principios SOLID aplicados:

- **S** - Single Responsibility: Cada clase tiene una responsabilidad específica
- **O** - Open/Closed: Extensible através de herencia
- **L** - Liskov Substitution: Las clases derivadas son intercambiables
- **I** - Interface Segregation: Interfaces específicas y pequeñas
- **D** - Dependency Inversion: Las capas altas no dependen de las bajas

## Despliegue

Para compilar y desplegar las funciones:

```bash
npm run build
firebase deploy --only functions
```

Para desarrollo local:

```bash
npm run serve
```