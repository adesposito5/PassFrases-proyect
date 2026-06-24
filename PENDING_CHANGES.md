# PENDING CHANGES — Inconsistencias del Proyecto

> Archivo de tracking para el Pull Request final.
> Cada entrada documenta qué está mal y quién debe corregirlo.

---

## 🧹 Post-stripping: Estado actual

D5 eliminó del código base todas las implementaciones que correspondían a D2, D3 y D4.
Cada integrante deberá implementar sus propias features desde el estado base actual.

**Base actual (D1 + D5):**
- Scaffold, router, providers, diseño base
- `wordLists.json` con palabras categorizadas
- Generador: elige 4 palabras aleatorias + número de 2 dígitos, separa por guiones
- `PasswordResult` solo tiene `{ password: string }`
- `PasswordConfig` está vacío `{}` (sin campos de personalización)
- `SessionEntry` no tiene `bits` (campo que D3 debe agregar)
- `StepProgress` muestra solo 2 pasos: Inicio → Generador
- D5: `BatchGenerator`, `HistoryPanel`, `checkReuseWarnings`, ruta `/batch`

---

## 📋 Features a implementar por cada integrante

### D2 — Personalización
Partir de `PasswordConfig = {}`. Agregar:
- `wordCount: 2 | 3 | 4 | 5 | 6 | 7 | 8` al type
- `separator`, `includeNumbers`, `includeSymbols`, `capitalize` al type
- `category` (sincronizar claves con `wordLists.json`)
- UI: slider, selector separador, toggles (números, mayúsculas, símbolos)
- Store: setters correspondientes
- `StepProgress` restaurar paso 2 "Personalizar" con diseño completo

### D3 — Seguridad
Partir de `PasswordResult = { password: string }`. Agregar:
- `calculateEntropy()` en utils
- `getStrengthLevel()` en utils
- Campo `bits: number` y `strength` en `PasswordResult`
- Campo `bits: number` en `SessionEntry`
- Componente `PasswordDisplay` con barra de entropía, tags de fortaleza
- Tipos `StrengthLevel`, labels, colores

### D4 — Recomendaciones
Partir del código base (sin D3 aún). Agregar:
- `getRecommendations()` en utils
- Función de copia al portapapeles (`navigator.clipboard.writeText()`)
- Botón de copiar en vista de resultado y batch/historial
- Recomendaciones accionables basadas en configuración

---

## ⚠️ Inconsistencias aún presentes

### I1. `index.html` en inglés
- **Archivo:** `index.html:2,7`
- **Responsable:** D1 — Cambiar a `<html lang="es">` y título "PassFrases — Generador de Contraseñas"

### I2. `App.tsx` y `App.css` — Template Vite default
- **Responsable:** D1 — Eliminar código residual (contador, logos, enlaces)

---

## ✅ D5 — Implementado (Integrante 5)

| Feature | Archivo | Estado |
|---------|---------|--------|
| `BatchGenerator` (múltiples opciones) | `src/features/generator/components/BatchGenerator.tsx` | ✅ |
| `HistoryPanel` (historial flotante global) | `src/features/generator/components/HistoryPanel.tsx` | ✅ |
| `checkReuseWarnings` (detección bigramas) | `src/features/generator/utils.ts` | ✅ |
| `phraseSimilarity` (coeficiente dice) | `src/features/generator/utils.ts` | ✅ |
| `generateBatch` (lote de N frases) | `src/features/generator/utils.ts` | ✅ |
| Página `/batch` completa | `src/features/generator/pages/BatchPage.tsx` | ✅ |
| Store: `generateBatch`, `batchResults`, `batchWarnings` | `src/features/generator/store.ts` | ✅ |
| Types: `BatchResult`, `ReuseWarning` | `src/features/generator/types.ts` | ✅ |
| HistoryPanel global en providers | `src/app/providers.tsx` | ✅ |
| Animación `@keyframes fadeIn` | `src/index.css` | ✅ |
| Wizard: auto-generate en mount | `src/features/generator/pages/GeneratorPage.tsx` | ✅ |
| Stripping D2/D3/D4 del código base | Múltiples archivos | ✅ |

---

*Última actualización: 2026-06-24*
