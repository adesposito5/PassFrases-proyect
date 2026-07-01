# 🔐 PassFrases

Generador de contraseñas basado en frases — fácil de recordar, difícil de adivinar.

> Proyecto integrador · Tecnicatura en Desarrollo de Software · 2026

---

## 🌐 Deploy

<!-- URL del deploy pendiente -->
_Próximamente_

---

## ¿Qué es PassFrases?

PassFrases genera frases de seguridad (passphrases) combinando palabras al azar de 5 categorías del español, con opciones de personalización, análisis de fortaleza en tiempo real y almacenamiento cifrado de favoritos. El resultado es una contraseña con alta entropía que cualquier persona puede recordar sin anotarla.

Ejemplo: `Niebla-Aldea-Tormenta-42`

Todo el procesamiento ocurre 100% en el navegador. Ninguna contraseña se envía a ningún servidor.

---

## Funcionalidades

- **Generador con wizard** — flujo guiado en 3 pasos: bienvenida, personalización y resultado
- **Generación de passphrases** — combinación aleatoria de 75 palabras distribuidas en 5 categorías (animales, naturaleza, verbos, colores, lugares), usando `crypto.getRandomValues()` para selección criptográficamente segura
- **Controles de personalización** — cantidad de palabras (slider 2 a 6), separador (`-`, `.`, `_`, espacio), números aleatorios, símbolos especiales, capitalización de primera letra
- **Medidor de entropía** — cálculo en bits según diccionario, cantidad de palabras, capitalización, números, símbolos y patrones. Barra progresiva con umbrales: <20 débil, 20–39 moderada, 40–59 fuerte, ≥60 muy fuerte
- **Recomendaciones contextuales** — detección de frases cortas, falta de mayúsculas/símbolos, palabras repetidas y entropía baja
- **Generación en lote** — creación simultánea de 3, 5, 10 o 20 frases, con copiado individual o masivo
- **Historial de sesión** — hasta 50 entradas con timestamp, visible en panel flotante con solapa "Historial / Favoritos", y advertencias de reutilización cuando una frase se parece a una anterior
- **Favoritos cifrados** — guardado con AES-GCM-256 y derivación PBKDF2 (600k iteraciones, SHA-256), sal e IV aleatorios por entrada
- **Copiado seguro** — botón "Copiar" con feedback visual y `navigator.clipboard.writeText()` nativo, sin librerías externas
- **Asistente interactivo (Clippy)** — tips contextuales según el paso del wizard, sugiere guardar como favorito cuando la entropía ≥80 bits
- **100% local** — sin backend, sin telemetría, sin cuentas

---

## Flujo del wizard

```
Inicio (/)  ──[Comenzar]──▶  Personalizar (/generator)  ──[Generar]──▶  Resultado (/generator)
     ▲                             ▲                                              │
     └────[Volver a inicio]────────┘◀──────────[Personalizar]─────────────────────┘
```

| Paso | Ruta | Componente | Acción |
|------|------|-----------|--------|
| 1 — Inicio | `/` | WizardStartPage | Presentación con 3 beneficios. Botón "Comenzar" → paso 2 |
| 2 — Personalizar | `/generator` | GeneratorForm + ClippyAssistant | Configuración de palabras, separador, opciones avanzadas, categorías. Botón "Generar frase mágica" → paso 3 |
| 3 — Resultado | `/generator` | ResultView + EntropyMeter + FunStats | Contraseña generada, análisis, recomendaciones, copiar, guardar como favorito |
| Batch | `/batch` | BatchGenerator | Generación N frases con advertencias de reutilización |

---

## Stack tecnológico

| Tecnología | Rol |
|---|---|
| React 19 + TypeScript 6 | UI y tipado estático |
| Vite 8 | Bundler y dev server |
| Tailwind CSS v4 (`@tailwindcss/vite`) | Estilos y design tokens |
| Zustand v5 (persist middleware) | Estado global |
| React Router v7 (lazy routes + Suspense) | Navegación |
| Lucide React | Íconos |
| clsx + tailwind-merge | Utilidades CSS |
| ESLint + Biome | Calidad de código |
| Web Crypto API (AES-GCM-256, PBKDF2) | Criptografía de favoritos |

---

## Estructura del proyecto

```
src/
├── app/               → router.tsx, providers.tsx
├── features/
│   ├── generator/     → store, types, utils (generate, entropy, analysis)
│   │   ├── pages/     → WizardStartPage, GeneratorPage
│   │   └── components/→ GeneratorForm, GeneratorPanel, PasswordActions,
│   │                    EntropyMeter, FunStats, CategoryChips, CopyButton,
│   │                    RecommendationsPanel
│   ├── batch/         → BatchPage, BatchGenerator, HistoryPanel
│   ├── favorites/     → store (AES-GCM persist), hooks, FavoritesPanel
│   └── clippy/        → ClippyAssistant (tips contextuales)
├── shared/
│   ├── components/ui/ → AppLayout, WizardLayout, StepProgress
│   └── lib/           → cn() utility (clsx + tailwind-merge)
├── services/          → crypto.service.ts (Web Crypto API)
├── main.tsx
└── index.css          → @theme tokens, glass cards, grid background
```

---

## Seguridad

- **Aleatoriedad**: `crypto.getRandomValues()` en toda generación y selección de tips
- **Persistencia**: solo configuración e historial (Zustand persist). Contraseñas NO se persisten en texto plano
- **Favoritos**: cifrados con AES-GCM-256 antes de almacenar en localStorage. La clave de cifrado es la propia contraseña generada
- **Portapapeles**: `navigator.clipboard.writeText()` nativo, sin librerías externas
- **Procesamiento**: 100% local, nunca se envían datos a servidores

---

## Accesibilidad

- Skip link para navegación por teclado
- Roles ARIA (tablist, tab, switch, status, dialog)
- Focus visible personalizado
- `prefers-reduced-motion` respetado
- Contraste legible en todos los modos
- Etiquetas asociadas a controles (htmlFor)

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
pnpm build      # TypeScript check + build de producción
pnpm lint       # ESLint + Biome — 0 errores requerido
pnpm preview    # Preview del build de producción
pnpm doctor     # npx react-doctor@latest .
```

---

## Estado del proyecto

| Verificación | Resultado |
|-------------|-----------|
| Build (`tsc -b && vite build`) | ✅ Sin errores |
| Lint (`eslint .`) | ✅ 0 errores, 0 warnings |
| React Doctor | ✅ 70/100 (Needs work) |
| Score original | 50/100 (Critical) — mejora de +20 puntos |

---

## Equipo

<!--
⚠️ NOTA: el esquema de Desafíos (D1–D5) difiere entre el README del archivo subido
y el que pegaste en el chat. Se usó acá la versión del archivo subido (más detallada
y con apellidos), pero conviene confirmar con el equipo cuál es la asignación real
antes de dar esto por definitivo.
-->

| Desafío | Descripción | Responsable |
|---------|------------|-------------|
| D1 | Base — scaffold, wordLists.json, generador de frases | Agustina D'Esposito |
| D2 | Personalización — longitud, separadores, toggles | Axel Figueredo |
| D3 | Seguridad — entropía, medidor visual, análisis | Alison Gamboa |
| D4 | Recomendaciones — copiar, tips, recomendaciones | Luz Vásquez |
| D5 | Opciones e historial — batch, historial, favoritos cifrados, asistente | Matías Sousa |

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
