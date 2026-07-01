# PassFrases — Generador de Passphrases

[![Build](https://img.shields.io/badge/build-%E2%9C%93%20exitosa-brightgreen)]()
[![Lint](https://img.shields.io/badge/lint-0%20errores-brightgreen)]()
[![React Doctor](https://img.shields.io/badge/react--doctor-70%2F100-yellow)]()

Aplicación web progresiva para generar frases de seguridad (passphrases) con entropía configurable.
Cada frase combina palabras al azar de 5 categorías del español, con opciones de personalización, análisis de fortaleza en tiempo real, y almacenamiento cifrado de favoritos.


---
## Delopy 

https://pass-frases-proyect.vercel.app/

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | React 19 + TypeScript 6 |
| Bundler | Vite 8 |
| Enrutamiento | React Router v7 (lazy routes + Suspense) |
| Estado global | Zustand v5 con persist middleware |
| Estilos | Tailwind CSS v4 (via `@tailwindcss/vite`) |
| Iconos | lucide-react |
| Utilidades CSS | clsx + tailwind-merge |
| Calidad | ESLint + Biome |
| Criptografía | Web Crypto API (AES-GCM-256, PBKDF2) |

---

## Funcionalidades

### Generación de passphrases (D1)
- Combinación aleatoria de 75 palabras distribuidas en 5 categorías: animales, naturaleza, verbos, colores, lugares
- Selección criptográficamente segura via `crypto.getRandomValues()`
- Filtro por categorías mediante chips interactivos
- Resultado mostrado con tipografía monoespaciada y selección fácil (`user-select: all`)

### Personalización (D2)
- **Cantidad de palabras**: slider de 2 a 6
- **Separador**: guión (`-`), punto (`.`), guión bajo (`_`) o espacio
- **Opciones avanzadas**: números aleatorios (10–99), símbolos especiales (`!@#$%&*?`), capitalización de primera letra
- Toggle switches animados con estados aria‑checked

### Seguridad y entropía (D3)
- Cálculo de entropía en bits según: tamaño del diccionario, cantidad de palabras, capitalización, números, símbolos, diversidad, y patrones
- Barra de fortaleza progresiva con gradiente rojo → naranja → amarillo → verde
- Umbrales: <20 débil, 20–39 moderada, 40–59 fuerte, ≥60 muy fuerte
- Penalizaciones por: palabras repetidas, patrones secuenciales, patrones de teclado, años, sufijos numéricos predecibles
- Estadísticas adicionales: badges con palabras, bits, toggles activos

### Recomendaciones y usabilidad (D4)
- Botón "Copiar" con feedback visual (✅) y `navigator.clipboard.writeText()`
- Panel de recomendaciones contextuales basadas en análisis de la contraseña
- Tips del asistente ClippyAssistant según el paso del wizard
- Detección de frases cortas, falta de mayúsculas/símbolos, palabras repetidas, entropía baja

### Opciones avanzadas e historial (D5)
- **Batch**: generación simultánea de 3, 5, 10 o 20 frases con copiado individual o masivo
- **Historial de sesión**: almacena hasta 50 entradas con timestamp, visible en panel flotante con solapa "Historial / Favoritos"
- **Advertencias de reutilización**: detecta frases similares a las del historial y muestra alertas
- **Favoritos cifrados**: guardado con AES-GCM-256, derivación PBKDF2 (600k iteraciones, SHA-256), sal e IV aleatorios por entrada
- **Asistente contextual**: ClippyAssistant muestra tips aleatorios según el paso, sugiere guardar cuando la entropía ≥80 bits

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

## Arquitectura

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

## Equipo

| Desafío | Descripción | Responsable |
|---------|------------|-------------|
| D1 | Base — scaffold, wordLists.json, generador de frases | Agustina D'Esposito |
| D2 | Personalización — longitud, separadores, toggles | Axel Figueredo |
| D3 | Seguridad — entropía, medidor visual, análisis | Alizon Gamboa |
| D4 | Recomendaciones — copiar, tips, recomendaciones | Luz Vázquez |
| D5 | Opciones e historial — batch, historial, favoritos cifrados, asistente | Matías Sousa |

---

## Desarrollo

```bash
pnpm install          # Instalar dependencias
pnpm dev              # Servidor de desarrollo (Vite)
pnpm build            # TypeScript check + build production
pnpm lint             # ESLint — 0 errores requerido
pnpm preview          # Preview del build production
pnpm doctor           # npx react-doctor@latest .
```

## Estado del proyecto

| Verificación | Resultado |
|-------------|-----------|
| Build (`tsc -b && vite build`) | ✅ Sin errores |
| Lint (`eslint .`) | ✅ 0 errores, 0 warnings |
| React Doctor | ✅ 70/100 (Needs work) |
| Score original | 50/100 (Critical) — mejora de +20 puntos |
