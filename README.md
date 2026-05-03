# 🏨 LostDesk

> Sistema de gestión de objetos perdidos para hoteles

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

LostDesk introduce un sistema simple pero estructurado:

- Registro inmediato de objetos encontrados
- Búsqueda rápida y filtrada
- Actualización de estado por distintos roles
- Historial completo de cada objeto
- Fotografía del objeto adjunta al registro

El objetivo es reducir el tiempo de localización y mejorar la trazabilidad.

---

## 🔄 Flujo real de uso

1. Housekeeping encuentra un objeto y lo registra con foto
2. El sistema lo guarda con ubicación, fecha y estado
3. Recepción lo localiza cuando el cliente lo reclama
4. Management puede auditar todo el proceso

---

## 👥 Roles del sistema

| Rol | Permisos |
|-----|----------|
| Recepción | Consulta y registra objetos |
| Housekeeping | Actualiza estados |
| Management | Visión global e historial completo |

---

## 🛠️ Stack tecnológico

- **React** con Vite
- **React Router v6** — navegación por rutas
- **Supabase** — base de datos, autenticación y almacenamiento de imágenes
- **JavaScript** — base previa en Vanilla JS
- **Jest + React Testing Library** — testing

---

## 🧠 Enfoque técnico

Este proyecto sigue una evolución progresiva desde Vanilla JS hacia una arquitectura escalable en React:

- Estado local → global
- Lógica acoplada → desacoplada (custom hooks)
- Persistencia local → backend real
- UI estática → aplicación completa

No es solo una migración, sino una reconstrucción con mejores prácticas aplicadas fase a fase.

---

## 🗺️ Roadmap de desarrollo

- ✅ Fase 1 — Componentes base y estructura visual
- ✅ Fase 2 — Formularios dinámicos y modal
- ✅ Fase 3 — Persistencia con localStorage y useEffect
- ✅ Fase 4 — Gestión avanzada de estado con useReducer
- ✅ Fase 5 — Contexto global y roles con useContext
- 🚧 Fase 6 — Lógica desacoplada con custom hooks
- ⏳ Fase 7 — Navegación completa con React Router
- ⏳ Fase 8 — Optimización con useMemo y useCallback
- ⏳ Fase 9 — Integración con Supabase y subida de imágenes
- ⏳ Fase 10 — Testing con Jest y React Testing Library

---

## 🎯 Objetivo

Construir una aplicación funcional mientras se consolidan conceptos clave de React y arquitectura frontend, aplicados a un caso de uso real del sector hotelero.

---

## 📦 Instalación

> Disponible a partir de la Fase 7 en entorno local

```bash
git clone https://github.com/anudoranador87/lostdesk-react.git
cd lostdesk-react
npm install
npm run dev
```

---

## 👨‍💻 Autor
👨‍💻 Autor

Jose María Aparicio
Recepcionista de hotel en transición a frontend developer.
42 días de código documentados en Dev Log 365.

🌐 Portfolio → https://anudoranador87.github.io/JoseMaria-Frondtend-Portfolio/
📓 Dev Log → https://anudoranador87.github.io/Mi-Camino-Web-365/
