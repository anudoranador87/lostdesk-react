# 🏨 LostDesk

> Sistema de gestión de objetos perdidos para hoteles

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
- Notificaciones automáticas por email al encontrar un objeto

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

- **React + Vite** — UI y bundler
- **React Router v6** — navegación por rutas reales
- **Supabase** — base de datos PostgreSQL, autenticación y storage de imágenes
- **Recharts** — gráficas del dashboard de management
- **Resend / SendGrid** — notificaciones por email via Supabase Edge Functions
- **Vercel** — deploy en producción
- **Jest + React Testing Library** — testing
- **TypeScript** — tipado estático

---

## 🧠 Enfoque técnico

Este proyecto sigue una evolución progresiva desde Vanilla JS hacia una arquitectura React escalable:

- Estado local → global con useContext
- Lógica acoplada → desacoplada con custom hooks
- Persistencia local → backend real con Supabase
- UI estática → aplicación completa con auth, permisos y notificaciones

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
- ✅ Fase 8 — Optimización con useMemo, useCallback y React.memo -
- ✅Fase 9 — Supabase — CRUD completo, Auth con roles, Storage de imágenes
- ✅Deploy — Producción en Vercel
- ✅Historial en Supabase — registro automático de    acciones: registrado, estado cambiado, eliminado

**En desarrollo 🚧**

- ✅ Fase 10 — Completar integración Supabase
- ✅Logout con supabase.auth.signOut()
- 🚧  Manejo de errores visible al usuario
- 🚧 Fotos verificadas en entorno local
- ✅ Responsive para móvil

- ✅ Fase 11 — Filtros y búsqueda
- ✅Filtro por estado — pendiente, reclamado, entregado
- 🚧Filtro por fecha — rango de fechas
- ✅ Filtro por habitación
- ✅Búsqueda por nombre de objeto
- ✅useMemo para optimizar el filtrado

- 🚧 Fase 12 — Dashboard de management
  - Gráfica de objetos por estado con Recharts
  - KPI de porcentaje de objetos encontrados
  - Historial completo con tabla filtrable
  - Objetos por habitación — zonas con más incidencias
  - Solo accesible para el rol management

- 🚧 Fase 13 — QR por objeto
  - QR generado con qrcode.react por cada objeto
  - Página pública /objeto/:id sin necesidad de login
  - El huésped ve el estado actual de su objeto
  - Diseño limpio orientado al usuario final

- 🚧 Fase 14 — Notificaciones por email
  - Supabase Edge Functions como backend serverless
  - Integración con Resend o SendGrid
  - Email automático al huésped cuando el estado cambia a encontrado
  - Plantilla de email con datos del objeto

- 🚧 Fase 15 — Testing
  - Tests unitarios del custom hook useLostItems
  - Tests de integración del formulario de registro
  - Tests de rutas protegidas por rol
  - Jest + React Testing Library

- 🚧 Fase 16 — TypeScript
  - Migración progresiva de JS a TS
  - Tipado de props, estados y respuestas de Supabase
  - Interfaces para objetos y roles

**Futuro 🔮**

- 🔮 React Native con Expo — versión móvil nativa para Android e iOS
- 🔮 Historial de cambios por objeto — auditoría completa
- 🔮 Panel de administración para crear usuarios y asignar roles

---

## 📦 Instalación local

```bash
git clone https://github.com/anudoranador87/lostdesk-react.git
cd lostdesk-react
npm install
npm run dev
```

---

## 👨‍💻 Autor

Jose María Aparicio
Recepcionista de hotel en transición a frontend developer.
52 días de código documentados en Dev Log 365.

🌐 Portfolio → [anudoranador87.github.io/JoseMaria-Frondtend-Portfolio](https://anudoranador87.github.io/JoseMaria-Frondtend-Portfolio/)
📓 Dev Log → [anudoranador87.github.io/Mi-Camino-Web-365](https://anudoranador87.github.io/Mi-Camino-Web-365/)