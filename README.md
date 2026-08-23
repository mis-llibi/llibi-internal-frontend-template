# LLIBI Frontend Template

Corporate UI template that carries the look and feel of the LLIBI
Reimbursement Portal so every new frontend starts out visually consistent.

Stack: Next.js 16 (App Router, React Compiler), React 19, Tailwind CSS v4,
shadcn/ui (new-york style), Radix UI, lucide-react.

## What is included

- **Design tokens** (`src/app/globals.css`)
  - shadcn color tokens (light + dark)
  - Accent presets: `theme-blue` (default), `theme-slate`, `theme-violet`, `theme-rose`, `theme-orange`
  - Font families: `font-geist` (default), `font-roboto`, `font-outfit`, `font-lora`, `font-playfair`, `font-mono`
  - Base font sizes: `size-sm` (14px), `size-md` (16px), `size-lg` (18px, default)
  - Radius scales: `radius-none` … `radius-xl` (`radius-sm` default)
- **Theme system**
  - `src/components/theme-provider.tsx` — persists user choices in `localStorage`
  - Anti-flash inline script in `src/app/layout.tsx`
  - Live customizer at `/settings/theme`
- **App shell**
  - Collapsible `AppSidebar` with LLIBI brand header, `NavMain`, `NavUser`
  - Sticky header with `HeaderTitle` + `NotificationMenu`
  - `LegalFooter` with Terms of Use dialog + Privacy Notice link
- **UI kit & Corporate Component Library**
  - Primitive UI tokens under `src/components/ui/` (`Button`, `Input`, `Select`, `Dialog`, `Table`, `DataTable`, `Tabs`, `Accordion`, `Toaster` with `sonner`, `Avatar`, `Skeleton`, `Tooltip`)
  - Corporate shared components under `src/components/common/`:
    - `PageHeader` — Standard page header with descriptions and action buttons
    - `StatCard` — High-density metric cards with icons, skeleton loaders, and trend hints
    - `FilterBar` — Composable toolbar with `FilterSearch`, `FilterSelect`, and `FilterDateRange`
    - `StatusBadge` — Theme-aware operational status badges
    - `RiskBadge` — Severity and risk indicators (`NORMAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`)
    - `EmptyState` — Dashed empty state component with actions
    - `CardMain`, `CardBody`, `InputDate`, `TogglePill`
- **Pages & Interactive Demos**
  - `/dashboard` — High-density overview with 8 KPI stat cards, AreaChart (`recharts`), Donut Distribution chart, and real-time claim audit table.
  - `/activity` — Activity Explorer & Audit Log with multi-filter toolbar, sortable columns, and JSON payload viewer dialog.
  - `/system` — System Health & Telemetry with ingestion latency charts and worker node pool status.
  - `/components` — Interactive UI Kit showcasing all inputs, controls, buttons, badges, modals, toasts, and skeletons.
  - `/profile` — User profile management screen.
  - `/settings/theme` — Real-time accent, font, and radius visual theme customizer.
  - `/login` — Modern authentication form with React Hook Form + Zod validation.

## Starting a new project from this template

1. Copy this folder to the new project location, e.g.
   `cp -r frontend-template my-new-frontend` (do not copy `node_modules`
   or `.next`).
2. Rename the package in `package.json`.
3. `npm install`
4. Customize:
   - `src/app/layout.tsx` — metadata title/description
   - `src/components/app-sidebar.tsx` — nav items and brand tooltip
   - `src/components/header-title.tsx` — route-to-title map
   - `src/components/nav-user.tsx` — replace the demo user with your auth hook
   - `src/components/notification-menu.tsx` — wire real notifications
   - `src/app/(auth)/login/page.tsx` — wire your real login call
   - Logos in `public/` if the product is not LLIBI-branded
5. When you need data fetching, add `axios` + `swr` (used by the reference
   apps) and an env file for the API base URL.
6. `npm run dev`

## Commands

| Command         | Purpose               |
| --------------- | --------------------- |
| `npm run dev`   | Start dev server      |
| `npm run build` | Production build      |
| `npm run lint`  | ESLint                |

## Reference

Design source: `../Reimbursement/frontend` (LLIBI Reimbursement Portal).
Keep this template in sync when the portal's design system changes.
