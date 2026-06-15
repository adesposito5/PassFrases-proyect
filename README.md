<div align="center">

# 🛡️ PassFrases

### Generador de Contraseñas Memorables

**Fácil de recordar · Imposible de adivinar · En 3 simples pasos**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Zustand](https://img.shields.io/badge/Zustand-5-FF6B6B?style=for-the-badge)](https://zustand-demo.pmnd.rs/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

[🚀 Ver Demo](https://passfrases.vercel.app) · [📁 Repositorio](https://github.com/tu-usuario/passfrases) · [📋 Proyecto Integrador · Módulo React 2026](#)

</div>

---

## 📖 ¿Qué es PassFrases?

**PassFrases** es una Single Page Application (SPA) que genera contraseñas seguras y fáciles de recordar combinando palabras al azar en frases con sentido.

En lugar de contraseñas tipo `P@ssw0rd123!` (difíciles de recordar y fáciles de adivinar por fuerza bruta), PassFrases genera frases como:

```
Gato-Corre-Playa-42     →  93 bits de entropía  →  "Muy Fuerte" 🟢
Tigre-Vuela-Monte-7!    → 112 bits de entropía  →  "Muy Fuerte" 🟢
```

El usuario **personaliza** la frase (cantidad de palabras, separadores, números, símbolos), visualiza su **nivel de seguridad** mediante entropía, **copia** al portapapeles con un clic y puede generar **lotes** de opciones para elegir la que más le guste.

> 🔒 **PassFrases no almacena contraseñas.** El historial de sesión vive solo en memoria RAM y se borra al cerrar la pestaña. Por diseño.

---

## ✨ Funcionalidades

### 🎯 Generación de frases (D1 — Agus)
- Combina objetos + acciones + lugares + número al azar desde listas semilla en JSON
- Frase ejemplo: `Gato-Corre-Playa-42`
- Función pura `generatePassword()` en `utils.ts`
- Layout responsive con sidebar de controles + área principal de resultado
- Rutas `/` (generador) y `/batch` (lote e historial)

### ⚙️ Personalización (D2 — Alex)
- **Slider** de cantidad de palabras (2 a 6)
- **Selector** de separador: guión `-`, punto `.`, guión bajo `_`
- **Toggles** para incluir números, símbolos y mayúsculas
- **Chips** de categoría de palabras: animales, naturaleza, lugares, comida, colores
- **Chips** de longitud de palabra: corta, media, larga
- Configuración persistida en `localStorage` (se recuerda entre sesiones)

### 🔐 Entropía y nivel de seguridad (D3 — Alizon)
- Cálculo matemático real: `H = L × log₂(N)` donde N = tamaño del alfabeto
- Medidor visual con barra gradiente rojo → verde
- Badge con bits exactos: `93 bits — MUY FUERTE`
- Tabla de niveles:

  | Bits | Nivel | Color |
  |------|-------|-------|
  | < 40 | Débil | 🔴 Rojo |
  | 40–59 | Moderada | 🟠 Naranja |
  | 60–79 | Fuerte | 🟡 Amarillo |
  | 80+ | Muy fuerte | 🟢 Verde |

- Stats rápidos: palabras · bits · 1 clic para copiar

### 📋 Copiar y recomendaciones (D4 — Luz)
- Botón **Copiar** con feedback visual (ícono cambia a ✓ por 2 segundos)
- Toast de confirmación: `¡Contraseña copiada!`
- Manejo de error si `navigator.clipboard` no está disponible
- **Panel de recomendaciones accionables** según nivel:
  - Débil → `"Aumentá la cantidad de palabras"`
  - Moderada → `"Agregá un símbolo para subir a Fuerte"`
  - Fuerte → `"Activá mayúsculas para llegar a Muy fuerte"`
  - Muy fuerte → `"¡Excelente! Lista para usar"`

### 📦 Lote e historial de sesión (D5 — Matías)
- Generación de **3 a 20 frases** de una sola vez
- **Historial de sesión** en memoria (máx. 50 ítems) — NO persistido
- Advertencia si una contraseña ya fue generada antes en la sesión
- Aviso de reutilización: `"¿Estás usando esta frase en otro sitio?"`
- Ruta `/batch` con lista de resultados y botón de copiar en cada ítem
- Mensaje claro: _"El historial se borra al cerrar la pestaña. No almacenamos tus contraseñas."_

---

## 👥 Equipo

| Integrante | Desafío | Responsabilidad |
|-----------|---------|----------------|
| **Agus** | D1 · Base | Scaffold, generador, store, types, layout |
| **Alex** | D2 · Personalización | Controles de configuración en la sidebar |
| **Alizon** | D3 · Entropía | Cálculo de seguridad y medidor visual |
| **Luz** | D4 · Copiar + Recomendaciones | Clipboard y panel de tips accionables |
| **Matías** | D5 · Lote + Historial | Generación por lote e historial en memoria |

---

## 🛠️ Stack Tecnológico

| Rol | Tecnología | Versión |
|-----|-----------|---------|
| Bundler | Vite + `@vitejs/plugin-react` | latest |
| UI | React | 19.x |
| Lenguaje | TypeScript | 5.x |
| Routing | React Router (modo librería SPA) | v7 |
| Estado global | Zustand + middleware `persist` | v5 |
| Estilos | Tailwind CSS vía `@tailwindcss/vite` | v4 |
| Iconos | lucide-react | latest |
| Clases condicionales | clsx + tailwind-merge | latest |
| IDs únicos | `crypto.randomUUID()` | nativo |
| Linter/Formatter | Biome | latest |

---

## 🏗️ Arquitectura del Proyecto

La estructura sigue el principio **feature-first**: todo lo que pertenece a una funcionalidad vive junto.

```
passfrases/
├── index.html
├── package.json
├── biome.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                    ← Punto de entrada
    ├── index.css                   ← @import "tailwindcss" + @theme tokens
    │
    ├── app/
    │   ├── router.tsx              ← Rutas: / y /batch
    │   └── providers.tsx           ← BrowserRouter + providers globales
    │
    ├── features/
    │   └── generator/              ← Feature principal
    │       ├── types.ts            ← Tipos compartidos (todos los leen)
    │       ├── utils.ts            ← generatePassword(), calculateEntropy(), getRecommendations()
    │       ├── store.ts            ← useGeneratorStore (Zustand)
    │       ├── data/
    │       │   ├── words-objects.json   ← 60+ objetos
    │       │   ├── words-actions.json   ← 60+ acciones
    │       │   └── words-places.json    ← 60+ lugares
    │       ├── components/
    │       │   ├── PasswordDisplay.tsx  ← Frase generada en mono grande
    │       │   ├── GeneratorForm.tsx    ← Controles de personalización (D2)
    │       │   ├── StrengthMeter.tsx    ← Barra de entropía + badge (D3)
    │       │   ├── PasswordActions.tsx  ← Copiar / Me gusta / Otra (D4)
    │       │   ├── RecommendationsPanel.tsx ← Tips accionables (D4)
    │       │   ├── FunStats.tsx         ← palabras · bits · 1 clic (D3)
    │       │   ├── GenButton.tsx        ← Botón "✨ Generar frase mágica" (D1)
    │       │   ├── BatchGenerator.tsx   ← Lote: input cantidad (D5)
    │       │   ├── BatchResultList.tsx  ← Lista del lote (D5)
    │       │   └── SessionHistory.tsx   ← Historial en memoria (D5)
    │       ├── hooks/
    │       │   ├── useClipboard.ts      ← navigator.clipboard (D4)
    │       │   └── useEntropy.ts        ← Hook para consumir entropía (D3)
    │       └── pages/
    │           ├── GeneratorPage.tsx    ← Página principal /
    │           └── BatchPage.tsx        ← Página de lote /batch
    │
    └── shared/
        ├── components/ui/          ← Button, Card, Badge (reutilizables)
        └── lib/
            └── cn.ts               ← clsx + tailwind-merge
```

### Principios de arquitectura

- **Feature-first**: agrupado por dominio, no por tipo técnico.
- **Lógica pura en `utils.ts`**: `generatePassword()`, `calculateEntropy()`, `getRecommendations()` son funciones puras sin efectos secundarios.
- **`localStorage` solo vía Zustand `persist`**: solo la configuración del usuario se persiste. Las contraseñas y el historial nunca se guardan.
- **Contratos tipados en `types.ts`**: todos los integrantes importan desde el mismo archivo. Nadie redefine tipos.

---

## 📐 Modelo de Datos

```typescript
// Cómo el usuario configura la generación (persiste en localStorage)
interface PasswordConfig {
  wordCount: 2 | 3 | 4 | 5 | 6;
  separator: '-' | '.' | '_';
  includeNumbers: boolean;
  includeSymbols: boolean;
  capitalize: boolean;
  category: 'mixed' | 'animals' | 'nature' | 'actions' | 'food' | 'places' | 'colors';
  wordLength: 'short' | 'medium' | 'long';
}

// El resultado de generar una contraseña (en memoria, nunca persistida)
interface PasswordResult {
  password: string;      // "Gato-Corre-Playa-42"
  bits: number;          // 93
  strength: 'weak' | 'medium' | 'strong' | 'very-strong';
  recommendations: string[];
}

// Una entrada del historial de sesión
interface SessionEntry {
  id: string;            // crypto.randomUUID()
  password: string;
  bits: number;
  timestamp: number;     // Date.now()
}
```

### Estado global (Zustand)

```
passwordStore
├── config: PasswordConfig          ← persiste en localStorage
├── currentResult: PasswordResult   ← en RAM (se borra al recargar)
└── sessionHistory: SessionEntry[]  ← en RAM (se borra al recargar)
```

---

## 🚀 Instalación y uso local

### Requisitos

- Node.js 18+
- npm 9+

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/passfrases.git
cd passfrases

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:5173
```

### Scripts disponibles

```bash
npm run dev        # Servidor de desarrollo con hot reload
npm run build      # Build de producción en /dist
npm run preview    # Preview del build de producción
npm run lint       # Linting con Biome
npm run format     # Formateo con Biome
```

---

## 🔢 Algoritmo de generación

```
generatePassword(config)
  │
  ├── 1. Seleccionar config.wordCount palabras según category y wordLength
  ├── 2. Si capitalize: "gato" → "Gato"
  ├── 3. Unir con config.separator: "Gato-Corre-Playa"
  ├── 4. Si includeNumbers: añadir número 10–999 al final → "Gato-Corre-Playa-42"
  ├── 5. Si includeSymbols: añadir símbolo aleatorio → "Gato-Corre-Playa-42!"
  └── 6. calculateEntropy(resultado, config) → { bits, strength }
```

### Fórmula de entropía

```
H = longitud × log₂(tamaño_del_alfabeto)

Ejemplo: "Gato-Corre-Playa-42"
  longitud = 19 caracteres
  alfabeto = minúsculas(26) + mayúsculas(26) + guión(1) + números(10) = 63
  H = 19 × log₂(63) = 19 × 5.98 ≈ 113 bits  →  "Muy fuerte"
```

---

## 🌐 Deploy

El proyecto está desplegado en Vercel:

🔗 **[https://passfrases.vercel.app](https://passfrases.vercel.app)**

### Configuración de deploy (SPA routing)

Para que React Router funcione correctamente al recargar cualquier ruta, el proyecto incluye `vercel.json`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

---

## 🔀 Flujo Git del equipo

| Integrante | Rama |
|-----------|------|
| Agus (D1) | `feat/base-d1` → mergea primero, desbloquea al resto |
| Alex (D2) | `feat/customization-d2` |
| Alizon (D3) | `feat/entropy-d3` |
| Luz (D4) | `feat/clipboard-d4` (depende de D3) |
| Matías (D5) | `feat/batch-d5` |

- Una rama por feature, PRs chicos y frecuentes
- Agus (D1) revisa e integra todos los PRs
- Conventional Commits: `feat:`, `fix:`, `refactor:`, `docs:`

### Grafo de dependencias

```
D1 (Agus) ──┬── D2 (Alex)
             ├── D3 (Alizon) ── D4 (Luz)
             └── D5 (Matías)
```

---

## ♿ Accesibilidad

- `aria-label` en todos los botones con solo íconos
- `role="progressbar"` y `aria-valuenow` en el medidor de entropía
- Formularios con `<label>` asociada a cada `<input>`
- Navegación completa por teclado: Tab, Enter, Escape
- Información no depende solo del color (íconos + texto adicional)
- Contraste AAA en el tema oscuro

---

## 📸 Capturas de pantalla

| Pantalla de inicio | Personalización | Resultado |
|:------------------:|:---------------:|:---------:|
| Inicio → 3 pasos | Controles de config | Frase + entropía + copiar |

---

## 📋 Criterios de aprobación cumplidos

- [x] SPA funcional en React 19 + TypeScript + Vite
- [x] Ruteo entre vistas con React Router v7 (`/` y `/batch`)
- [x] Estado global con Zustand v5
- [x] Persistencia real en `localStorage` (configuración del usuario)
- [x] Arquitectura feature-first con lógica pura en `utils.ts`
- [x] Los 5 desafíos (D1–D5) resueltos e integrados
- [x] Repositorio público con trabajo colaborativo en GitHub
- [x] Deploy funcional en Vercel
- [x] README completo

---

## 📄 Licencia

Proyecto académico — Módulo de React · Proyecto Integrador · Junio 2026  
IntegrArTec · Todos los derechos reservados por los integrantes del equipo.

---

<div align="center">

Hecho con ❤️ por **Agus, Alex, Alizon, Luz y Matías**

*Proyecto Integrador · Módulo de React (SPA) · Idea 11 · Junio 2026*

</div>

