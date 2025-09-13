# Ejemplos de Pruebas para las Cloud Functions

Este archivo contiene ejemplos de cómo probar las 6 Cloud Functions usando curl o cualquier cliente HTTP.

## Configuración Previa

1. Compilar las funciones: `npm run build`
2. Iniciar el emulador local: `npm run serve`
3. Las funciones estarán disponibles en `http://localhost:5001/[PROJECT_ID]/us-central1/[FUNCTION_NAME]`

Reemplaza `[PROJECT_ID]` con tu ID de proyecto de Firebase.

## Ejemplos de Pruebas

### 1. Crear un Usuario

```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addUser \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

**Respuesta esperada:**
```json
{
  "success": true,
  "data": {
    "id": "generated-id",
    "email": "test@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  "message": "User created successfully"
}
```

### 2. Buscar Usuario

```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/findUser \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com"
  }'
```

### 3. Crear una Tarea

```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addTask \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID_FROM_STEP_1",
    "title": "Completar proyecto",
    "description": "Terminar el desarrollo de la aplicación de tareas"
  }'
```

### 4. Obtener Tareas de un Usuario

```bash
curl -X GET \
  "http://localhost:5001/[PROJECT_ID]/us-central1/getTasks?userId=USER_ID_FROM_STEP_1"
```

### 5. Actualizar una Tarea

```bash
curl -X PUT \
  http://localhost:5001/[PROJECT_ID]/us-central1/updateTask/TASK_ID_FROM_STEP_3 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Proyecto completado",
    "completed": true
  }'
```

### 6. Eliminar una Tarea

```bash
curl -X DELETE \
  http://localhost:5001/[PROJECT_ID]/us-central1/deleteTask/TASK_ID_FROM_STEP_3
```

## Flujo de Prueba Completo

```bash
# 1. Crear usuario
USER_RESPONSE=$(curl -s -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addUser \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}')

# Extraer userId (requiere jq)
USER_ID=$(echo $USER_RESPONSE | jq -r '.data.id')

# 2. Crear tarea
TASK_RESPONSE=$(curl -s -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addTask \
  -H "Content-Type: application/json" \
  -d "{\"userId\": \"$USER_ID\", \"title\": \"Mi primera tarea\", \"description\": \"Descripción de la tarea\"}")

# Extraer taskId
TASK_ID=$(echo $TASK_RESPONSE | jq -r '.data.id')

# 3. Obtener tareas
curl -X GET "http://localhost:5001/[PROJECT_ID]/us-central1/getTasks?userId=$USER_ID"

# 4. Actualizar tarea
curl -X PUT \
  http://localhost:5001/[PROJECT_ID]/us-central1/updateTask/$TASK_ID \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# 5. Eliminar tarea
curl -X DELETE \
  http://localhost:5001/[PROJECT_ID]/us-central1/deleteTask/$TASK_ID
```

## Casos de Error a Probar

### Usuario no encontrado
```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/findUser \
  -H "Content-Type: application/json" \
  -d '{"email": "noexiste@example.com"}'
```

### Email inválido
```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addUser \
  -H "Content-Type: application/json" \
  -d '{"email": "email-invalido"}'
```

### Tarea sin título
```bash
curl -X POST \
  http://localhost:5001/[PROJECT_ID]/us-central1/addTask \
  -H "Content-Type: application/json" \
  -d '{"userId": "USER_ID", "description": "Sin título"}'
```

### Método HTTP incorrecto
```bash
curl -X GET \
  http://localhost:5001/[PROJECT_ID]/us-central1/addUser \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com"}'
```

## Notas

- Reemplaza `[PROJECT_ID]` con tu ID real del proyecto Firebase
- Guarda los IDs devueltos por las respuestas para usarlos en pruebas posteriores
- Las funciones incluyen validaciones que retornarán errores apropiados para datos inválidos
- Para pruebas en producción, cambia `localhost:5001` por la URL de tu proyecto desplegado