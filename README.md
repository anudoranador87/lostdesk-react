# 🏨 LostDesk

> Sistema de gestión de objetos perdidos para hoteles

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2.15-FF6384?logo=data:image/svg+xml;base64,&logoColor=white)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?logo=vercel&logoColor=white)

🌐 **Demo en producción** → [lostdesk-react-x3dk.vercel.app](https://lostdesk-react-x3dk.vercel.app/)

**Credenciales de prueba:**
| Rol | Email | Contraseña |
|-----|-------|------------|
| Recepción | recepcion@lostdesk.com | Recepcion123 |
| Housekeeping | housekeeping@lostdesk.com | Housekeeping123 |
| Management | management@lostdesk.com | Management123 |

---

## 📌 Qué es

LostDesk es una aplicación web que centraliza la gestión de objetos perdidos en hoteles, conectando a recepción, housekeeping y management en un único flujo de trabajo.

---

## ⚠️ Problema real

La gestión de objetos perdidos suele ser inconsistente:

- Registros en papel o sistemas aislados
- Falta de comunicación entre departamentos
- Tiempo perdido buscando objetos
- Sin historial claro de qué ocurrió

Esto genera mala experiencia para el huésped y fricción interna en el equipo.

---

## 💡 Qué aporta LostDesk

- Registro inmediato de objetos encontrados con foto
- Búsqueda rápida y filtrada por estado, fecha y habitación
- Actualización de estado por distintos roles
- Historial completo de cada objeto
- Autenticación real con permisos por rol
- QR por objeto — el huésped puede rastrear su objeto sin login
- Vista previa interactiva de notificaciones por email
- Dashboard con gráficas y KPIs para management

---

## 🔄 Flujo real de uso

1. Housekeeping encuentra un objeto y lo registra con foto
2. El sistema lo guarda con ubicación, fecha y estado en Supabase
3. Recepción lo localiza cuando el cliente lo reclama
4. Management puede auditar todo el proceso y ver estadísticas
5. El huésped recibe un email automático o escanea el QR para ver el estado

---

## 👥 Roles del sistema

| Rol | Permisos |
|-----|----------|
| Recepción | Registra y consulta objetos |
| Housekeeping | Actualiza estados |
| Management | Visión global, historial completo, estadísticas y eliminación |

---

## 🛠️ Stack tecnológico

- **React 19 + Vite 8** — UI y bundler
- **React Router v6** — navegación por rutas reales
- **Supabase** — base de datos PostgreSQL, autenticación y storage de imágenes
- **Recharts** — gráficas del dashboard de management
- **qrcode.react** — generación de códigos QR por objeto
- **Vercel** — deploy en producción
- **Vitest + React Testing Library** — testing
- **TypeScript 6** — tipado estático

---

## 🧠 Enfoque técnico

Este proyecto sigue una evolución progresiva desde Vanilla JS hacia una arquitectura React escalable:

- Estado local → global con useContext
- Lógica acoplada → desacoplada con custom hooks
- Persistencia local → backend real con Supabase
- UI estática → aplicación completa con auth, permisos y notificaciones

---

## 📦 Instalación local

```bash
git clone https://github.com/anudoranador87/lostdesk-react.git
cd lostdesk-react
npm install
```

### Configuración de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```bash
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

> 💡 Puedes copiar `.env.example` como referencia.

### Ejecutar en desarrollo

```bash
npm run dev
```

---

## 🗄️ Esquema de Base de Datos (Supabase)

### Tabla `objetos`

```sql
CREATE TABLE objetos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  habitacion TEXT NOT NULL,
  fecha DATE NOT NULL,
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'reclamado', 'entregado')),
  comentario TEXT,
  foto_url TEXT,
  registrado_por TEXT NOT NULL,
  reclamado_por TEXT,
  email_cliente TEXT,
  booking_cliente TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Tabla `historial`

```sql
CREATE TABLE historial (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre_objeto TEXT NOT NULL,
  habitacion TEXT,
  rol TEXT NOT NULL,
  accion TEXT NOT NULL,
  estado_nuevo TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### Storage

- **Bucket**: `fotos-objetos` (público)
- Se usa para almacenar las fotos subidas con cada objeto registrado

---

## 🗺️ Roadmap completo

**Completado ✅**

- ✅ Fase 1 — Componentes base y estructura visual
- ✅ Fase 2 — Formularios dinámicos y modal
- ✅ Fase 3 — Persistencia con localStorage y useEffect
- ✅ Fase 4 — Gestión de estado con useReducer
- ✅ Fase 5 — Contexto global y roles con useContext
- ✅ Fase 6 — Lógica desacoplada con custom hooks
- ✅ Fase 7 — Navegación con React Router
- ✅ Fase 8 — Optimización con useMemo, useCallback y React.memo
- ✅ Fase 9 — Supabase — CRUD completo, Auth con roles, Storage de imágenes
- ✅ Deploy — Producción en Vercel
- ✅ Historial en Supabase — registro automático de acciones: registrado, estado cambiado, eliminado
- ✅ Fase 10 — Integración Supabase completa (logout, manejo de errores, responsive)
- ✅ Fase 11 — Filtros y búsqueda (estado, nombre, habitación, rango de fechas)
- ✅ Fase 12 — Dashboard de management (gráficas por estado, KPI tasa de devolución, top habitaciones)
- ✅ Fase 13 — QR por objeto (generación con qrcode.react, página pública /objeto/:id, descarga e impresión)
- ✅ Fase 14 — Notificaciones por email (simulación interactiva con vista previa de plantilla de correo)
- ✅ Variables de entorno — Credenciales de Supabase securizadas con `.env`
- ✅ Fotos en tarjetas — Visualización de la imagen del objeto en las tarjetas del panel
- ✅ Corrección de fotos en vista pública — Arreglado bug de campo `imagen_url` → `foto_url`

**En desarrollo 🚧**

- 🚧 Fase 15 — Testing
  - Tests unitarios del custom hook useLostItems
  - Tests de integración del formulario de registro
  - Tests de rutas protegidas por rol
  - Vitest + React Testing Library

- 🚧 Fase 16 — TypeScript
  - Migración progresiva de JS a TS
  - Tipado de props, estados y respuestas de Supabase
  - Interfaces para objetos y roles

**Futuro 🔮**

- 🔮 React Native con Expo — versión móvil nativa para Android e iOS
- 🔮 Notificaciones reales — Supabase Edge Functions + Resend/SendGrid
- 🔮 Panel de administración para crear usuarios y asignar roles
- 🔮 Exportación de informes a PDF/Excel

---

## 👨‍💻 Autor

Jose María Aparicio
Recepcionista de hotel en transición a frontend developer.
52 días de código documentados en Dev Log 365.

🌐 Portfolio → [anudoranador87.github.io/JoseMaria-Frondtend-Portfolio](https://anudoranador87.github.io/JoseMaria-Frondtend-Portfolio/)
📓 Dev Log → [anudoranador87.github.io/Mi-Camino-Web-365](https://anudoranador87.github.io/Mi-Camino-Web-365/)