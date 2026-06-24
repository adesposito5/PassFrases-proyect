# PENDING CHANGES — Inconsistencias del Proyecto

> Archivo de tracking para el Pull Request final.
> Cada entrada documenta qué está mal y quién debe corregirlo.

---

## 🔴 Bloqueantes — Deben corregirse para que el build pase

Los siguientes errores fueron **revertidos** por D5 para que cada integrante los corrija en su rama.

### B1. `utils.ts:18` — Parámetro `password` declarado pero no usado
- **Responsable:** D3 — Integrante 3 (entropía)
- **Error (TS6133):** `'password' is declared but its value is never read`
- **Archivo:** `src/features/generator/utils.ts:18`
- **Qué hacer:** Usar `password` en el cálculo de entropía o renombrar a `_password`

### B2. `utils.ts:184` — Variable `allWords` asignada pero nunca usada
- **Responsable:** D1 — Integrante 1 (generador base)
- **Error (TS6133 + ESLint):** `'allWords' is assigned a value but never used`
- **Archivo:** `src/features/generator/utils.ts:184`
- **Qué hacer:** Eliminar `const allWords = Object.values(wordLists).flat()` de `generatePassword()`

### B3. `store.ts:69` — `any` explícito en `setCategory`
- **Responsable:** D2 — Integrante 2 (personalización)
- **Error (ESLint):** `Unexpected any. Specify a different type`
- **Archivo:** `src/features/generator/store.ts:69`
- **Qué hacer:** Reemplazar `as any` con el tipo correcto `as PasswordConfig['category']`

---

## ⚠️ Inconsistencias de tipos y datos

### I1. Categorías en types.ts no coinciden con wordLists.json
- **Archivo:** `src/features/generator/types.ts:7`
- **Problema:** `PasswordConfig.category` permite `'mixed' | 'animals' | 'nature' | 'actions' | 'food' | 'places' | 'colors'`
- **Realidad:** `wordLists.json` solo tiene: `animales`, `naturaleza`, `verbos`, `colores`, `lugares`
- **Responsable:** D1/D2
- **Qué hacer:** Sincronizar tipos con las claves reales del JSON
  - Opción A: Cambiar types.ts a español `'animales' | 'naturaleza' | 'verbos' | 'colores' | 'lugares'`
  - Opción B: Renombrar claves JSON a inglés + agregar categorías faltantes (food, actions, places)

### I2. Archivos `data/words-*.json` no se usan
- **Archivos:** `src/features/generator/data/words-actions.json`, `words-objects.json`, `words-places.json`
- **Problema:** Existen pero ningún código los importa. Son legacy del plan original.
- **Responsable:** D1
- **Qué hacer:** Eliminarlos si no se necesitan, o integrarlos al `wordLists.json`

### I3. `wordLength` en types pero sin UI
- **Archivo:** `src/features/generator/types.ts:8`
- **Problema:** Existe `wordLength: 'short' | 'medium' | 'long'` en el tipo
- **Realidad:** El `GeneratorPanel` no tiene UI para seleccionar wordLength
- **Responsable:** D2
- **Qué hacer:** Agregar control UI o eliminar del type si no se implementó

### I4. `wordCount` limitado a 6 vs VariantG (hasta 8)
- **Estado:** ✅ Corregido por D5 — type extendido a `2 | 3 | 4 | 5 | 6 | 7 | 8`

---

## 🎨 UI/UX — Desviaciones del diseño

### U1. Estados loading/empty/error no implementados
- **VariantG:** Tiene 4 estados: loading, empty, error, success
- **React actual:** No hay manejo de estados en el flujo wizard
- **Responsable:** D4/D5

### U2. StepProgress no coincide con VariantG
- **Estado:** ✅ Corregido por D5 — barra gradiente, steps cliqueables, active/done/pending

### U5. `index.html` en inglés
- **Archivo:** `index.html:2,7`
- **Responsable:** D1 — Cambiar a `<html lang="es">` y título "PassFrases — Generador de Contraseñas"

---

## 🧹 Código legacy

### L1. `App.tsx` y `App.css` — Template Vite default
- **Responsable:** D1 — Eliminar código residual (contador, logos, enlaces)

---

## ✅ D5 — Implementado (Integrante 5)

| Feature | Archivo | Estado |
|---------|---------|--------|
| `BatchGenerator` (múltiples opciones) | `src/features/generator/components/BatchGenerator.tsx` | ✅ |
| `HistoryPanel` (historial flotante global) | `src/features/generator/components/HistoryPanel.tsx` | ✅ |
| `checkReuseWarnings` (detección bigramas) | `src/features/generator/utils.ts` | ✅ |
| Página `/batch` completa | `src/features/generator/pages/BatchPage.tsx` | ✅ |
| Store: `generateBatch`, `batchResults`, `batchWarnings` | `src/features/generator/store.ts` | ✅ |
| Types: `BatchResult`, `ReuseWarning` | `src/features/generator/types.ts` | ✅ |
| HistoryPanel global en providers | `src/app/providers.tsx` | ✅ |
| Animación `@keyframes fadeIn` | `src/index.css` | ✅ |
| Wizard: StepProgress con barra gradiente | `src/features/generator/components/StepProgress.tsx` | ✅ |
| Wizard: Step2 (personalizar) separado de Step3 (resultado) | `src/features/generator/components/GeneratorPanel.tsx` | ✅ |
| Wizard: security level (Básica/Media/Alta) | `src/features/generator/components/GeneratorPanel.tsx` | ✅ |
| Wizard: toggle "Palabras memorables" | `src/features/generator/components/GeneratorPanel.tsx` | ✅ |
| Wizard: wordCount slider 2–8 | `src/features/generator/store.ts`, `types.ts` | ✅ |
| Wizard: sin auto-generate en paso 2 | `src/features/generator/pages/GeneratorPage.tsx` | ✅ |
| Wizard: navegación fluida entre pasos | `src/features/generator/components/GeneratorPanel.tsx` | ✅ |

---

*Última actualización: 2026-06-24*
