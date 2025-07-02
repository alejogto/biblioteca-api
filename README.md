# 📚 Biblioteca API – Proyecto Final NestJS + TypeORM + Docker

🔗 **Repositorio GitHub:**  
https://github.com/alejogto/biblioteca-api

Este es un proyecto completo de una API RESTful desarrollado con **NestJS**, **TypeORM**, **MySQL** y **Docker**.  
Forma parte del taller:  
**“Desarrollo de una API RESTful con NestJS, TypeORM y Buenas Prácticas”**.

La API permite gestionar **usuarios**, **libros**, **autores** y **préstamos**, con relaciones entre entidades, validaciones, manejo de errores, y pruebas documentadas con Insomnia.

---

## 🧰 Tecnologías utilizadas

- **NestJS** – Framework backend  
- **TypeORM** – ORM con soporte para relaciones  
- **MySQL** – Base de datos relacional  
- **Docker & Docker Compose** – Orquestación del entorno  
- **class-validator / class-transformer** – Validaciones  
- **Insomnia** – Pruebas de la API  
- **Git + GitHub** – Repositorio del código

---

## ⚙️ Requisitos

### Opción A – Sin Docker

- Node.js v18+  
- npm  
- MySQL local  
- Nest CLI → `npm i -g @nestjs/cli`

### Opción B – Con Docker

- Docker Desktop  
- Docker Compose

---

## 🚀 Configuración del entorno

### 🔐 Variables de entorno (`.env`)

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=admin123
DB_NAME=biblioteca
```

---

## 🐳 Ejecución con Docker (Recomendado)

1. Asegúrate de tener Docker corriendo  
2. Ejecuta:

```bash
docker-compose up --build
```

Esto levanta:

- 🛠️ NestJS API: http://localhost:3000  
- 🐬 MySQL: localhost:3306  
- 🔍 phpMyAdmin: http://localhost:8081  
  - Usuario: `root`  
  - Contraseña: `admin123`

---

## 🧪 Ejecución manual (sin Docker)

1. Instala las dependencias:

```bash
npm install
```

2. Crea la base de datos `biblioteca` en tu servidor MySQL

3. Ejecuta el proyecto:

```bash
npm run start:dev
```

---

## 📦 Entidades y relaciones

### 📘 Libro

- Campos: `id`, `titulo`, `descripcion`  
- Relaciones:
  - 🔁 `ManyToOne` → Autor  
  - 🔁 `OneToMany` → Préstamos  

### 👤 Usuario

- Campos: `id`, `nombre`, `email`  
- Relaciones:
  - 🔁 `OneToMany` → Préstamos  

### ✍️ Autor

- Campos: `id`, `nombre`  
- Relaciones:
  - 🔁 `OneToMany` → Libros  

### 📄 Préstamo

- Campos: `id`, `fecha_prestamo`  
- Relaciones:
  - 🔁 `ManyToOne` → Usuario  
  - 🔁 `ManyToOne` → Libro  

---

## 🧱 Estructura del proyecto

```
src/
├── autor/
├── libro/
├── usuario/
├── prestamo/
├── main.ts
└── app.module.ts
```

Cada módulo incluye:

- DTOs (`create-*.dto.ts`, `update-*.dto.ts`)  
- Servicios  
- Controladores  
- Entidades con relaciones  

---

## ✅ Validaciones y manejo de errores

### Ejemplo de validaciones con `class-validator`:

```ts
@IsString()
@IsEmail()
readonly email: string;
```

### Ejemplo de manejo de errores:

```ts
throw new NotFoundException('Libro no encontrado');
```

---

## 🔍 Pruebas con Insomnia

La colección de pruebas se encuentra incluida en el repositorio:  
📁 `Insomnia_2025-07-01.json`

Incluye pruebas CRUD completas para:

- Usuarios  
- Libros  
- Autores  
- Préstamos  

---

## 🧭 Rutas disponibles (CRUD)

### 📂 Usuarios

- `POST    /usuario`  
- `GET     /usuario`  
- `GET     /usuario/:id`  
- `PUT     /usuario/:id`  
- `DELETE  /usuario/:id`  

### 📘 Libros

- `POST    /libro`  
- `GET     /libro`  
- `GET     /libro/:id`  
- `PUT     /libro/:id`  
- `DELETE  /libro/:id`  

### ✍️ Autores

- `POST    /autor`  
- `GET     /autor`  
- `GET     /autor/:id`  
- `PUT     /autor/:id`  
- `DELETE  /autor/:id`  

### 📄 Préstamos

- `POST    /prestamo`  
- `GET     /prestamo`  
- `GET     /prestamo/:id`  
- `PUT     /prestamo/:id`  
- `DELETE  /prestamo/:id`  

---

## 📋 Checklist de entrega

| Requisito                                                    | Estado |
|-------------------------------------------------------------|--------|
| ✅ Estructura modular con NestJS                            | ✅     |
| ✅ CRUD completo (mínimo 3 entidades)                       | ✅     |
| ✅ Relaciones entre entidades con claves foráneas           | ✅     |
| ✅ Validaciones con class-validator                         | ✅     |
| ✅ Manejo de errores con HttpException                      | ✅     |
| ✅ Pruebas con Insomnia exportadas                          | ✅     |
| ✅ Docker y docker-compose funcionando                      | ✅     |
| ✅ Proyecto subido y documentado en GitHub                  | ✅     |

---

## 👨‍💻 Autor

**Alejandro Restrepo**  
Tecnólogo en Desarrollo de Software  
GitHub: [@alejogto](https://github.com/alejogto)
