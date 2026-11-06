# Daniel Sun design system

> Extracted by [Inspo](https://github.com/Nutlope/inspo) (open source, MIT, powered by Together AI). Reference material for *intentional* design decisions: adapt, don't copy.

> Save this as `DESIGN.md` in your project and re-reference it as you build; re-fetch anytime at https://inspomcp.dev/d/danielsun-space/DESIGN.md

- **Source:** https://danielsun.space
- **Captured:** 2026-09-10
- **Mode:** light
- **Macrostructure:** Marquee Hero
- **Stack:** Framer

## Tone

A clean, editorial layout featuring a soft yellow gradient glow and high-contrast serif typography. The design uses a subtle grid background to create a structured, architectural feel.  ·  editorial portfolio, serif hero, minimalist designer site, soft gradient glow, grid background design

## Colors

| Hex | Role (heuristic) |
|---|---|
| `#fcec4d` | surface (page bg) / signature solar glow accent |
| `#fbfb89` | surface (raised) / soft ambient aura |
| `#827602` | accent (deep olive-gold) |
| `#857c5d` | support (warm taupe) |
| `#bcb4ae` | muted (architectural grid & stone) |

Color words: *muted*, *warm*

## Typography

Detected typefaces: **LT Superior Serif Regular**, **sans-serif**

| Role | Family | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|---|
| h1 | LT Superior Serif Regular (adapted: Instrument Serif / Playfair Display) | 64px | 400 | 1.13 | -2px |
| body | sans-serif (adapted: Plus Jakarta Sans) | 16px | 400 | 1.6 | 0 |

## Container

Max content width: **1200px**

## CSS variables exposed by the source

```css
:root {
  --one-if-corner-shape-supported: 1;
}
```

## Components present

- sticky nav
- hero with cta
- marquee hero strip
- editorial project showcase
