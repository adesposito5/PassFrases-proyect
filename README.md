# 🔐 PassFrases

Generador de contraseñas basado en frases — fácil de recordar, difícil de adivinar.

> Proyecto integrador · Tecnicatura en Desarrollo de Software · 2026

---

## 🌐 Deploy

<!-- URL del deploy pendiente -->
_Próximamente_

---

## ¿Qué es PassFrases?

PassFrases genera contraseñas compuestas por palabras reales combinadas con separadores y opciones de personalización. El resultado es una contraseña con alta entropía que cualquier persona puede recordar sin anotarla.

Ejemplo: `Niebla-Aldea-Tormenta-42`

Todo el procesamiento ocurre en el navegador. Ninguna contraseña se envía a ningún servidor.

---

## Funcionalidades

- **Generador con wizard** — flujo guiado en 3 pasos: bienvenida, personalización y resultado
- **Controles de personalización** — cantidad de palabras, separador, mayúsculas, números y símbolos
- **Medidor de entropía** — visualización de la fortaleza de la contraseña en bits
- **Generación en lote** — generá múltiples contraseñas a la vez
- **Favoritos** — guardá y gestioná las contraseñas que más te gustan
- **Copiado seguro** — copia al portapapeles con limpieza automática
- **100% local** — sin backend, sin telemetría, sin cuentas

---

## Stack tecnológico

| Tecnología | Rol |
|---|---|
| React 19 | UI |
| TypeScript | Tipado estático |
| Vite 8 | Bundler y dev server |
| Tailwind CSS v4 | Estilos y design tokens |
| Zustand | Estado global |
| React Router v7 | Navegación |
| Lucide React | Íconos |

---

## Estructura del proyecto

```
src/
├── app/                        # Entry point, router y providers
├── features/
│   ├── generator/              # D1 — Wizard, generador, entropía, store base
│   ├── controls/               # D2 — Formulario de controles avanzados
│   ├── batch/                  # D3 — Generación en lote e historial
│   ├── favorites/              # D4 — Favoritos y copiado seguro
│   └── clippy/                 # D5 — Asistente interactivo
├── services/                   # Servicios de crypto y storage
└── shared/
    ├── components/ui/          # AppLayout, Button, Card
    └── lib/                    # Utilidades compartidas (cn)
```

---

## Instalación y uso local

**Requisitos:** Node.js 18+ y pnpm

```bash
# Clonar el repositorio
git clone https://github.com/<org>/PassFrases-proyect.git
cd PassFrases-proyect

# Instalar dependencias
pnpm install

# Iniciar el servidor de desarrollo
pnpm dev
```

La app estará disponible en `http://localhost:5173`

### Otros comandos

```bash
pnpm build      # Build de producción
pnpm preview    # Preview del build
pnpm lint       # Linter (ESLint + Biome)
```

---

## Equipo

| Desafío | Área | Integrante |
|---|---|---|
| D1 | Infraestructura base, design system, wizard y generador | Agustina |
| D2 | Controles avanzados de personalización | Axel |
| D3 | Generación en lote e historial de sesión | Alizon |
| D4 | Favoritos y copiado seguro | Luz |
| D5 | Asistente interactivo (Clippy) | Matias |

---

## Flujo de trabajo Git

```
main
 └── develop
      ├── feat/base-d1
      ├── feat/controls-d2
      ├── feat/batch-d3
      ├── feat/favorites-d4
      └── feat/clippy-d5
```

Cada integrante trabaja en su rama de feature y abre un PR hacia `develop`. Los merges a `main` se hacen al final del sprint.
