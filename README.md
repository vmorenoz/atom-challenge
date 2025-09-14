# Task Manager - Challenge Project

Una aplicación fullstack de gestión de tareas construida con Angular y Firebase Cloud Functions, implementando buenas prácticas de desarrollo y arquitectura limpia.

## 🚀 Características Principales

- **Autenticación segura** con Firebase Auth y tokens JWT
- **CRUD completo** de tareas con validaciones robustas
- **Interfaz moderna** con TailwindCSS y DaisyUI
- **Arquitectura limpia** siguiendo principios SOLID
- **Responsive design** adaptado a diferentes dispositivos
- **Tiempo real** con sincronización automática

## 🏗️ Arquitectura del Proyecto

```
atom-challenge/
├── frontend/           # Aplicación Angular 20
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/         # Guards, interceptors
│   │   │   ├── data/         # Modelos y requests
│   │   │   ├── presentation/ # UI components (Atomic Design)
│   │   │   │   ├── atoms/      # Componentes básicos
│   │   │   │   ├── molecules/  # Combinaciones de atoms
│   │   │   │   ├── organisms/  # Secciones complejas
│   │   │   │   └── pages/      # Páginas principales
│   │   │   └── shared/       # Servicios compartidos
│   │   └── environments/     # Configuraciones
└── backend/            # Firebase Cloud Functions
    ├── functions/
    │   ├── src/
    │   │   ├── controllers/  # Lógica de endpoints
    │   │   ├── services/     # Lógica de negocio
    │   │   ├── models/       # Interfaces y tipos
    │   │   ├── middleware/   # CORS y autenticación
    │   │   └── config/       # Configuración Firebase
    └── public/          # Archivos estáticos (hosting)
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Angular 20** - Framework principal
- **TypeScript** - Lenguaje tipado
- **TailwindCSS 4** - Framework de utilidades CSS
- **DaisyUI** - Componentes preconstruidos
- **Firebase SDK** - Autenticación y servicios
- **RxJS** - Programación reactiva

### Backend
- **Firebase Cloud Functions** - Serverless computing
- **Express.js** - Framework web
- **TypeScript** - Lenguaje tipado
- **Firestore** - Base de datos NoSQL
- **Firebase Admin SDK** - Administración del proyecto
- **JWT** - Tokens de autenticación

### Herramientas
- **Angular CLI** - Herramientas de desarrollo
- **Firebase CLI** - Despliegue y emuladores
- **npm** - Gestión de paquetes

## 📋 Requisitos Previos

- Node.js >= 22
- npm >= 8
- Firebase CLI
- Angular CLI

```bash
# Instalar herramientas globales
npm install -g @angular/cli firebase-tools
```

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd atom-challenge
```

### 2. Configurar Backend
```bash
cd backend
npm install

# Configurar proyecto Firebase (si es necesario)
firebase login
firebase use <your-project-id>

cd functions
npm install
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
```

### 4. Variables de Entorno
Actualiza la configuración de Firebase en:
- `frontend/src/app/app.config.ts`
- `frontend/src/environments/environment.ts`

## 🏃‍♂️ Desarrollo Local

### Iniciar Backend (Firebase Emulators)
```bash
cd backend
firebase emulators:start
```
Las funciones estarán disponibles en `http://localhost:5001`

### Iniciar Frontend
```bash
cd frontend
npm start
# o
ng serve
```
La aplicación estará disponible en `http://localhost:4200`

## 🚀 Despliegue en Producción

### Backend a Firebase
```bash
cd backend
npm run deploy
# o
firebase deploy --only functions,hosting
```

### Frontend (si se despliega por separado)
```bash
cd frontend
ng build --configuration production
# Subir el contenido de dist/ a tu hosting preferido
```

## 📡 API Endpoints

### Autenticación
- `POST /findUser` - Buscar usuario por UID
- `POST /addUser` - Crear nuevo usuario

### Gestión de Tareas
- `GET /getTasks` - Obtener todas las tareas del usuario
- `POST /addTask` - Crear nueva tarea
- `PUT /updateTask?taskId={id}` - Actualizar tarea existente
- `DELETE /deleteTask?taskId={id}` - Eliminar tarea

> **Nota**: Todos los endpoints de tareas requieren autenticación JWT via header `Authorization: Bearer <token>`

## 🎨 Patrones de Diseño Implementados

### Frontend - Atomic Design
- **Atoms**: Componentes básicos (botones, inputs)
- **Molecules**: Combinaciones de atoms (navbar)
- **Organisms**: Secciones complejas (modales, formularios)
- **Pages**: Vistas completas

### Backend - Clean Architecture
- **Controllers**: Manejo de HTTP requests/responses
- **Services**: Lógica de negocio
- **Models**: Definición de tipos y interfaces
- **Middleware**: Funcionalidades transversales (CORS, auth)

## 🛡️ Seguridad

- **Autenticación JWT** con expiración configurada
- **Validación robusta** de entrada en todos los endpoints
- **CORS** configurado apropiadamente
- **Sanitización** de datos de entrada
- **Ownership validation** - usuarios solo pueden acceder a sus tareas

## 🧪 Testing

### Frontend
```bash
cd frontend
npm test        # Unit tests con Karma/Jasmine
npm run e2e     # End-to-end tests
```

### Backend
```bash
cd backend/functions
npm test        # Unit tests (si están configurados)
```

## 🔍 Monitoreo y Logs

```bash
# Ver logs de Cloud Functions
firebase functions:log

# Monitorear en tiempo real
firebase functions:log --only <function-name>
```

## 📈 Buenas Prácticas Implementadas

### Código
- **TypeScript estricto** en ambos proyectos
- **Separación clara** de responsabilidades
- **Manejo consistente** de errores
- **Naming conventions** claras y consistentes
- **Código limpio** y comentado

### Arquitectura
- **Modularización** apropiada
- **Reutilización** de componentes
- **Escalabilidad** considerada en el diseño
- **Performance** optimizada

### Seguridad
- **Validación** de entrada exhaustiva
- **Autenticación** y autorización robusta
- **Sanitización** de datos
