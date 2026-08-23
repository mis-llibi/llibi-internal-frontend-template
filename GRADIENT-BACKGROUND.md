# Full-App Soft Gradient Background

Apply a subtle multi-layer gradient to the **whole application** so it shows
behind content, including through the sticky top navbar.

## The design

A soft light gradient with two tinted radial "glows" at the top corners
blending into a light vertical fade:

- Top-LEFT glow: sky blue tinted radial accent
- Top-RIGHT glow: **theme primary color** tinted radial accent
- Base: light slate-white vertical gradient (page stays readable)

## 1. Apply the background on `<body>` (root layout)

In `app/layout.tsx` (or equivalent root layout), add this class to `<body>`:

```tsx
<body
  className="min-h-full flex flex-col bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.16),transparent_38%),radial-gradient(circle_at_top_right,color-mix(in_oklab,var(--primary)_16%,transparent),transparent_32%),linear-gradient(180deg,#f8fafc_0%,#f3f6fb_48%,#eef2f7_100%)]"
>
```

Key points:
- The top-right glow uses the theme's **primary color** via
  `color-mix(in oklab, var(--primary) 16%, transparent)` so it follows any
  theme/variant automatically — do NOT hardcode a fixed hue here.
- If you want BOTH glows to use the primary, swap the sky-blue value
  `rgba(14,165,233,0.16)` for the same `color-mix(...)` expression.

## 2. Kill opaque full-page `bg-background` fills

Any full-page container that paints `bg-background` (opaque) will cover the
gradient. Remove `bg-background` from these surfaces (keep it on small
components like cards, buttons, dialogs, inputs — those are fine and needed):

- Full-height loading / empty / alert wrappers using `min-h-screen bg-background`
- Route-guard loading states using `flex-1 ... bg-background`

## 3. Make the sticky top navbar transparent

In the authorized layout's `<header>`, replace the opaque `bg-background/80`
with transparency + stronger blur so the glow is visible behind the bar:

```tsx
<header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b border-transparent px-4 backdrop-blur-md transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
```

- Drop `bg-background/80` -> transparent (remove the class).
- Use `backdrop-blur-md` (or `-lg`) so content scrolling under the bar blurs
  and stays legible.
- Set the border to `border-transparent` (or a low-opacity color) so it
  doesn't draw a hard white line.

## 4. Sidebar content shell transparency

If using a shadcn-style sidebar, the `SidebarInset` main wrapper ships with
`bg-background` which hides the body gradient across the whole content area.
Remove that one background class so the gradient shows through:

- `src/components/ui/sidebar.tsx` -> `SidebarInset` ->
  `"relative flex w-full flex-1 flex-col"` (drop `bg-background`).

## 5. Verification

Run the build/typecheck (e.g. `npm run build`). Confirm in the browser /
dev server that the gradient is visible on the landing + authorized pages and
behind the transparent navbar.

Note: auth pages (login, forgot-password, etc.) commonly ship their **own**
inline radial gradient designs. Leave those as-is unless you explicitly want
to adopt this one there too.