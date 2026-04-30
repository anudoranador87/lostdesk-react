# 🏨 LostDesk

> Sistema de gestión de objetos perdidos para hoteles.

---

## ¿Qué es LostDesk?

LostDesk es una aplicación web para que el staff de un hotel pueda registrar, buscar, actualizar y gestionar objetos perdidos por los huéspedes.

Cada rol del hotel — Recepción, Housekeeping y Management — tiene acceso a la información que le corresponde.

---

## Estado del proyecto

🚧 **En construcción** — migración progresiva de Vanilla JS a React.

Este proyecto es un ejercicio real de aprendizaje. Cada fase añade una capa de complejidad sobre la anterior, siguiendo la progresión natural de React desde los fundamentos hasta el nivel avanzado.

---

## Hoja de ruta

| Fase | Contenido                                 | Estado       |
| ---- | ----------------------------------------- | ------------ |
| 1    | Estructura visual — componentes estáticos | ⬜ Completado|
| 2    | Formulario vivo — useState y re-render    | ⬜ Completado|
| 3    | Memoria — useEffect + localStorage        | ⬜ Completado|
| 4    | Orden interno — useReducer                | ⬜ Pendiente |
| 5    | Roles — useContext                        | ⬜ Pendiente |
| 6    | Lógica separada — Custom hook             | ⬜ Pendiente |
| 7    | Navegación real — React Router            | ⬜ Pendiente |
| 8    | Rendimiento — useMemo, useCallback, memo  | ⬜ Pendiente |
| 9    | API real — Supabase + fotos de objetos    | ⬜ Pendiente |
| 10   | Testing — Jest + React Testing Library    | ⬜ Pendiente |

---

## Stack tecnológico

- **React** con Vite
- **React Router v6**
- **Supabase** — base de datos, autenticación y almacenamiento de imágenes
- **JavaScript** — base previa en Vanilla JS
- **Jest + React Testing Library** — testing (Fase 10)

---

## Roles de la aplicación

- **Recepción** — registra y consulta objetos
- **Housekeeping** — actualiza el estado de los objetos encontrados
- **Management** — acceso completo e historial

---

## Origen del proyecto

LostDesk nació como una aplicación en Vanilla JS. Este repositorio documenta su migración completa a React, fase a fase, como proyecto de aprendizaje y portfolio.

---

## Instalación

> Disponible cuando el proyecto esté en fase local (Fase 7+)

```bash
git clone https://github.com/tuusuario/lostdesk.git
cd lostdesk
npm install
npm run dev
```

---

## Autor

Desarrollado como proyecto de aprendizaje progresivo de React.
