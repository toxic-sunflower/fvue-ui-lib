# upstream diff 2.21.0 → 3.0.0

Changed items: 179

> [!WARNING]
> Possible breaking changes:
> - removed tokens: --color-bg-gradient-end, --color-bg-gradient-start, --color-bg-overlay, --color-bg-primary, --color-buttons-brand, --color-buttons-primary, --color-content-on-brand, --color-content-on-brand-inverted, --color-link-default, --color-link-hover (+2)
> - 20 token value changes (visual review needed)

## tokens: +147 −12 ~20
+ --color-alerts-critical-banner-background
+ --color-alerts-critical-banner-content
+ --color-alerts-critical-banner-icons
+ --color-alerts-info-prompt-background-error
+ --color-alerts-info-prompt-background-info
+ --color-alerts-info-prompt-background-neutral
+ --color-alerts-info-prompt-background-success
+ --color-alerts-info-prompt-background-warning
+ --color-alerts-info-prompt-content-error
+ --color-alerts-info-prompt-content-info
+ --color-alerts-info-prompt-content-neutral
+ --color-alerts-info-prompt-content-success
+ --color-alerts-info-prompt-content-warning
+ --color-alerts-info-prompt-icon-error
+ --color-alerts-info-prompt-icon-info
+ --color-alerts-info-prompt-icon-neutral
+ --color-alerts-info-prompt-icon-success
+ --color-alerts-info-prompt-icon-warning
+ --color-alerts-toast-icon-error
+ --color-alerts-toast-icon-info
+ --color-alerts-toast-icon-success
+ --color-alerts-toast-icon-warning
+ --color-background-ai-agent
+ --color-background-gradient-end
+ --color-background-gradient-start
+ --color-background-overlay-default
+ --color-background-overlay-gradient-end
+ --color-background-overlay-gradient-start
+ --color-background-overlay-heavy
+ --color-background-primary
− --color-bg-gradient-end
− --color-bg-gradient-start
− --color-bg-overlay
− --color-bg-primary
− --color-buttons-brand
− --color-buttons-primary
− --color-content-on-brand
− --color-content-on-brand-inverted
− --color-link-default
− --color-link-hover
− --color-surface-inputs
− --color-surface-inputs-off
~ --shadow-focus-ring [theme]: `0 0 0 2px var(--color-bg-primary), 0 0 0 4px var(--color-interaction-focus)` → `0 0 0 2px var(--color-background-primary), 0 0 0 4px var(--fv-focus-ring-color)`
~ --color-neutral-alphas-150 [dark]: `#232323cc` → `#ffffffcc`
~ --color-success-surface [dark]: `var(--primitives-color-emerald-green-900)` → `var(--primitives-color-green-900)`
~ --color-success-surface [theme]: `var(--primitives-color-emerald-green-50)` → `var(--primitives-color-green-50)`
~ --color-success-content [dark]: `var(--primitives-color-emerald-green-600)` → `var(--primitives-color-green-500)`
~ --color-success-content [theme]: `var(--primitives-color-emerald-green-700)` → `var(--primitives-color-green-700)`
~ --color-success-secondary [dark]: `var(--primitives-color-emerald-green-700)` → `var(--primitives-color-green-700)`
~ --color-success-secondary [theme]: `var(--primitives-color-emerald-green-300)` → `var(--primitives-color-green-300)`
~ --color-warning-surface [dark]: `var(--primitives-color-amber-900)` → `var(--primitives-color-amber-800)`
~ --color-warning-content [dark]: `var(--primitives-color-amber-400)` → `var(--primitives-color-amber-300)`
~ --color-warning-content [theme]: `var(--primitives-color-amber-600)` → `var(--primitives-color-amber-700)`
~ --color-warning-secondary [dark]: `var(--primitives-color-amber-700)` → `var(--primitives-color-amber-600)`
~ --color-error-surface [dark]: `var(--primitives-color-red-950)` → `var(--primitives-color-red-900)`
~ --color-error-content [theme]: `var(--primitives-color-red-600)` → `var(--primitives-color-red-500)`
~ --color-info-surface [dark]: `var(--primitives-color-blue-900)` → `var(--primitives-color-blue-800)`
~ --color-info-content [dark]: `var(--primitives-color-blue-500)` → `var(--primitives-color-blue-300)`
~ --color-info-secondary [dark]: `var(--primitives-color-blue-700)` → `var(--primitives-color-blue-600)`
~ --color-icons-primary [theme]: `var(--primitives-color-gray-black)` → `var(--primitives-color-gray-900)`
~ --color-icons-secondary [theme]: `var(--primitives-color-gray-700)` → `var(--primitives-color-gray-600)`
~ --color-icons-tertiary [theme]: `var(--primitives-color-gray-600)` → `var(--primitives-color-gray-400)`

