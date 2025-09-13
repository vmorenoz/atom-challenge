# Cloud Functions - Task Management API

Firebase Cloud Functions para la aplicación de gestión de tareas del challenge. Implementación simplificada con buenas prácticas y patrones de desarrollo.

## 🚀 Características

- **Arquitectura limpia**: Separación clara de responsabilidades
- **Validación robusta**: Validación de entrada con mensajes claros
- **Autenticación JWT**: Tokens seguros para autenticación
- **Logging**: Registro estructurado de eventos
- **CORS**: Configurado para solicitudes cross-origin
- **TypeScript**: Tipado fuerte para mejor mantenibilidad

## 📦 Instalación y Despliegue

### Desarrollo Local
```bash
npm install
npm run build
npm run serve
```

### Despliegue a Firebase
```bash
npm run deploy
```

## 🔧 Configuración

### Variables de Entorno
Para JWT en producción, configura:
```bash
firebase functions:config:set jwt.secret="tu-super-secreto-seguro"
```

Para desarrollo local:
```bash
# Windows PowerShell
$env:JWT_SECRET = "tu-secreto-desarrollo"

# Linux/Mac
export JWT_SECRET="tu-secreto-desarrollo"
```

## 📡 API Endpoints

### Funciones de Usuario

#### 1. Buscar Usuario por Email
**Endpoint:** `POST /getUserByEmail`

**Request:**
```json
{
  "email": "usuario@ejemplo.com"
}
```

**Response - Usuario encontrado:**
```json
{
  "exists": true,
  "user": {
    "id": "user123",
    "email": "usuario@ejemplo.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response - Usuario no encontrado:**
```json
{
  "exists": false,
  "message": "User not found"
}
```

#### 2. Crear Usuario
**Endpoint:** `POST /createUser`

**Request:**
```json
{
  "email": "nuevo@usuario.com"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "user456",
    "email": "nuevo@usuario.com",
    "createdAt": "2023-12-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Funciones de Tareas

#### 3. Obtener Tareas
**Endpoint:** `GET /getTasks?userId=USER_ID`

**Query Parameters:**
- `userId` (requerido): ID del usuario

**Response:**
```json
{
  "success": true,
  "tasks": [
    {
      "id": "task123",
      "title": "Mi tarea",
      "description": "Descripción de la tarea",
      "completed": false,
      "userId": "user123",
      "createdAt": "2023-12-01T00:00:00.000Z",
      "updatedAt": "2023-12-01T00:00:00.000Z"
    }
  ],
  "count": 1
}
```

#### 4. Crear Tarea
**Endpoint:** `POST /addTask`

**Request:**
```json
{
  "title": "Nueva tarea",
  "description": "Descripción de la nueva tarea",
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task created successfully",
  "task": {
    "id": "task456",
    "title": "Nueva tarea",
    "description": "Descripción de la nueva tarea",
    "completed": false,
    "userId": "user123",
    "createdAt": "2023-12-01T00:00:00.000Z",
    "updatedAt": "2023-12-01T00:00:00.000Z"
  }
}
```

#### 5. Actualizar Tarea
**Endpoint:** `PUT /updateTask`

**Request:**
```json
{
  "taskId": "task123",
  "userId": "user123",
  "title": "Título actualizado",
  "description": "Descripción actualizada",
  "completed": true
}
```

**Nota:** Todos los campos excepto `taskId` y `userId` son opcionales.

**Response:**
```json
{
  "success": true,
  "message": "Task updated successfully",
  "task": {
    "id": "task123",
    "title": "Título actualizado",
    "description": "Descripción actualizada",
    "completed": true,
    "userId": "user123",
    "createdAt": "2023-12-01T00:00:00.000Z",
    "updatedAt": "2023-12-01T01:00:00.000Z"
  }
}
```

#### 6. Eliminar Tarea
**Endpoint:** `DELETE /deleteTask`

**Request:**
```json
{
  "taskId": "task123",
  "userId": "user123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Task deleted successfully",
  "taskId": "task123"
}
```

## 🗄️ Estructura de Base de Datos

### Colección `users`
```javascript
{
  "email": "usuario@ejemplo.com",
  "createdAt": Timestamp
}
```

### Colección `tasks`
```javascript
{
  "title": "Título de la tarea",
  "description": "Descripción de la tarea",
  "completed": false,
  "userId": "user123",
  "createdAt": Timestamp,
  "updatedAt": Timestamp
}
```

## 🛡️ Seguridad

### Validaciones Implementadas
- **Email**: Formato válido requerido
- **Título**: 1-200 caracteres, sin espacios extra
- **Descripción**: 1-1000 caracteres, sin espacios extra
- **Ownership**: Solo el propietario puede modificar/eliminar tareas
- **Sanitización**: Eliminación de espacios extra en strings

### JWT Tokens
- **Expiración**: 24 horas
- **Payload**: `{ userId, email, iat, exp }`
- **Uso**: Incluye el token en responses de login/registro

## 📊 Códigos de Respuesta HTTP

- `200`: Éxito
- `201`: Creado exitosamente
- `400`: Error de validación/parámetros
- `403`: No autorizado (ownership)
- `404`: Recurso no encontrado
- `405`: Método HTTP no permitido
- `409`: Conflicto (usuario ya existe)
- `500`: Error interno del servidor

## 🧪 Testing

Para probar las funciones localmente:

1. Iniciar emulador:
```bash
npm run serve
```

2. Las funciones estarán disponibles en:
```
http://localhost:5001/PROJECT_ID/us-central1/FUNCTION_NAME
```

### Ejemplo con curl:
```bash
# Crear usuario
curl -X POST http://localhost:5001/project-id/us-central1/createUser \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'

# Obtener tareas
curl "http://localhost:5001/project-id/us-central1/getTasks?userId=USER_ID"
```

## 🏗️ Arquitectura y Patrones

### Buenas Prácticas Implementadas
- **Separation of Concerns**: Funciones enfocadas y específicas
- **Input Validation**: Validación exhaustiva de entrada
- **Error Handling**: Manejo consistente de errores
- **Logging**: Registro estructurado para debugging
- **Security**: Validación de ownership y sanitización
- **Clean Code**: Código legible y mantenible

### Patrones Utilizados
- **Factory Pattern**: Para generación de tokens JWT
- **Helper Functions**: Utilidades reutilizables
- **Middleware Pattern**: CORS handling
- **Error-First Approach**: Validación temprana con retorno rápido

## 🔍 Monitoreo y Logs

Los logs están disponibles en Firebase Console:
```bash
firebase functions:log
```

Cada función registra:
- Inicio y fin de requests
- Errores con contexto
- Validaciones fallidas
- Operaciones exitosas

## 📝 Notas para el Challenge

Esta implementación está diseñada para:
- Demostrar conocimiento de buenas prácticas
- Mostrar manejo de Firebase/Firestore
- Implementar autenticación JWT
- Validación robusta de datos
- Arquitectura limpia pero no sobrecompleja
- Código mantenible y escalable

La implementación balancea simplicidad con profesionalismo, perfecta para un challenge de postulación.