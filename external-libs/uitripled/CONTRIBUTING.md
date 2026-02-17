# Contributing Guide

This guide explains how to add new components and blocks to UITripleD.

## Table of Contents

- [Adding a New Component](#adding-a-new-component)
- [Adding a New Block](#adding-a-new-block)
- [File Structure](#file-structure)
- [Component Categories](#component-categories)

---

## Adding a New Component

Components are reusable UI elements organized by category (microinteractions, components, page, data, decorative, blocks).

### Step 1: Create Component File

Create the component file in the appropriate category directory:

```
components/{category}/{component-id}.tsx
```

Examples:

- `components/micro/buttons/new-button.tsx` (for microinteractions)
- `components/components/cards/new-card.tsx` (for components)
- `components/sections/new-section.tsx` (for blocks)
- `components/motion-core/new-animation.tsx` (for motion-core components)

**Note:** The file path should match the component's category and subcategory structure.

### Step 2: Update Components Registry

Edit `lib/components-registry.tsx`:

1. **Import the component** at the top:

   ```tsx
   import { NewComponent } from "@/components/{category}/{component-id}";
   ```

2. **Add to `componentsRegistry`** array:
   ```tsx
   {
     id: "new-component",
     name: "New Component",
     description: "Description of what this component does.",
     category: "components", // or "microinteractions", "page", "data", "decorative", "blocks"
     tags: ["tag1", "tag2", "tag3"],
     component: NewComponent,
     codePath: "@/components/{category}/{component-id}.tsx",
     duration: "300ms",
     easing: "easeOut",
     display: true, // Set to false if component needs fixes or is not ready
   },
   ```

**Important:**

- Use kebab-case for `id` (e.g., `new-component`)
- Provide a clear `description`
- Add relevant `tags` for searchability
- Set `display: false` if the component needs fixes or isn't ready for production
- The `codePath` should match the actual file location

### Step 3: Sync Registry JSON

Run the sync script to update `registry.json`:

```bash
npm run sync-registry
```

This script automatically:

- Reads components from `lib/components-registry.tsx`
- Detects dependencies from component imports
- Updates `registry.json` with the correct structure
- Preserves existing dependencies if they exist

**Note:** The sync script will automatically:

- Map categories to registry types (e.g., `microinteractions` → `registry:ui`)
- Detect `registryDependencies` from `@/components/ui/` imports
- Detect external `dependencies` from npm packages
- Set appropriate `category` and `subcategory` based on file path

### Step 4: Verify

1. Check that the component appears in the components list
2. Verify the component page loads correctly
3. Test the component functionality
4. Ensure all dependencies are correctly listed in `registry.json`

---

## Adding a New Block

Blocks are complex, feature-rich sections typically used in landing pages (hero sections, pricing tables, testimonials, etc.).

### Step 1: Create Block File

Create the block file in the sections directory:

```
components/sections/{block-id}.tsx
```

Example: `components/sections/new-feature-block.tsx`

### Step 2: Update Components Registry

Edit `lib/components-registry.tsx`:

1. **Import the block** at the top:

   ```tsx
   import { NewFeatureBlock } from "@/components/sections/new-feature-block";
   ```

2. **Add to `componentsRegistry`** array with `category: "blocks"`:
   ```tsx
   {
     id: "new-feature-block",
     name: "New Feature Block",
     description: "Description of what this block does.",
     category: "blocks",
     tags: ["feature", "landing", "section"],
     component: NewFeatureBlock,
     codePath: "@/components/sections/new-feature-block.tsx",
     duration: "600ms",
     easing: "easeOut",
     display: true,
   },
   ```

### Step 3: Sync Registry JSON

Run the sync script:

```bash
npm run sync-registry
```

### Step 4: Verify

1. Check that the block appears in the blocks category
2. Verify the block page loads correctly
3. Test the block functionality
4. Ensure responsive design works on different screen sizes

---

## File Structure

```
UITripleD/
├── components/
│   ├── micro/              # Microinteractions (buttons, toggles, icons, badges, links)
│   │   ├── buttons/
│   │   ├── toggles/
│   │   ├── icons/
│   │   ├── badges/
│   │   └── links/
│   ├── components/         # Reusable UI components
│   │   ├── cards/
│   │   ├── chat/
│   │   ├── forms/
│   │   ├── inputs/
│   │   ├── lists/
│   │   ├── modal/
│   │   ├── notifications/
│   │   ├── tabs/
│   │   └── ...
│   ├── sections/          # Block sections (landing page components)
│   ├── motion-core/        # Advanced motion components
│   ├── navigation/         # Navigation components
│   ├── forms/              # Form components
│   ├── modals/             # Modal components
│   ├── tooltips/           # Tooltip components
│   ├── decorative/         # Decorative components (backgrounds, text)
│   ├── data/               # Data visualization components
│   ├── page/               # Page-level components
│   └── ui/                 # Base UI components (shadcn/ui)
├── lib/
│   ├── components-registry.tsx   # Component metadata and mapping
│   ├── file-reader.ts            # Code loading utilities
│   └── utils.ts                   # Utility functions
├── scripts/
│   └── sync-registry.js           # Auto-sync registry.json
├── registry.json                  # Shadcn registry configuration (auto-generated)
└── types/
    └── index.ts                   # TypeScript types
```

---

## Component Categories

### Microinteractions (`microinteractions`)

Small, delightful interactions for buttons, toggles, and icons.

- **Location:** `components/micro/`
- **Registry Type:** `registry:ui`
- **Examples:** Magnetic buttons, shimmer effects, animated badges

### Components (`components`)

Animated UI components like modals, dropdowns, and cards.

- **Location:** `components/components/`
- **Registry Type:** `registry:component`
- **Examples:** Chat interfaces, animated cards, form components

### Page (`page`)

Smooth transitions and hero sections for pages.

- **Location:** `components/page/` or `components/sections/`
- **Registry Type:** `registry:page`
- **Examples:** Hero sections, scroll reveals, page transitions

### Data (`data`)

Bring your data to life with counters, progress bars, and lists.

- **Location:** `components/data/`
- **Registry Type:** `registry:ui`
- **Examples:** Animated counters, progress bars, charts

### Decorative (`decorative`)

Beautiful text and background effects.

- **Location:** `components/decorative/`
- **Registry Type:** `registry:ui`
- **Examples:** Gradient animations, typewriter text, floating effects

### Blocks (`blocks`)

Reusable block sections for landing pages and portfolios.

- **Location:** `components/sections/`
- **Registry Type:** `registry:block`
- **Examples:** Hero blocks, pricing sections, testimonials

---

## Quick Checklist

### For Components:

- [ ] Component file created in appropriate category directory
- [ ] Component imported in `lib/components-registry.tsx`
- [ ] Added to `componentsRegistry` array with all required fields
- [ ] Ran `npm run sync-registry` to update `registry.json`
- [ ] Verified component appears in the UI
- [ ] Tested component functionality
- [ ] Checked dependencies in `registry.json`

### For Blocks:

- [ ] Block file created in `components/sections/`
- [ ] Block imported in `lib/components-registry.tsx`
- [ ] Added to `componentsRegistry` with `category: "blocks"`
- [ ] Ran `npm run sync-registry` to update `registry.json`
- [ ] Verified block appears in blocks category
- [ ] Tested responsive design
- [ ] Checked dependencies in `registry.json`

---

## Tips

1. **Naming Convention:**
   - Use kebab-case for component IDs (e.g., `new-component`, `hero-section`)
   - Use PascalCase for component names (e.g., `NewComponent`, `HeroSection`)
   - File names should match component IDs

2. **Dependencies:**
   - The sync script automatically detects dependencies from imports
   - `registryDependencies` are detected from `@/components/ui/` imports
   - External `dependencies` are detected from npm package imports
   - Always verify dependencies after syncing

3. **Component Metadata:**
   - Provide clear, descriptive `description` fields
   - Add relevant `tags` for better searchability
   - Set appropriate `duration` and `easing` for animations
   - Use `display: false` for components that need fixes

4. **Code Quality:**
   - Follow TypeScript best practices
   - Use proper React patterns (hooks, composition)
   - Ensure accessibility (ARIA labels, keyboard navigation)
   - Support reduced motion preferences where applicable
   - Make components responsive

5. **Testing:**
   - Always test components after adding
   - Verify the component appears in the UI
   - Test on different screen sizes
   - Check browser console for errors
   - Verify dependencies are correctly listed

6. **Sync Script:**
   - Run `npm run sync-registry` after adding new components
   - The script preserves existing dependencies
   - Check the output for any warnings or errors
   - Verify `registry.json` was updated correctly

---

## Registry Sync Details

The `sync-registry.js` script automatically:

1. **Parses** `lib/components-registry.tsx` to extract component metadata
2. **Detects** dependencies from component file imports
3. **Maps** categories to registry types:
   - `microinteractions` → `registry:ui`
   - `components` → `registry:component`
   - `page` → `registry:page`
   - `data` → `registry:ui`
   - `decorative` → `registry:ui`
   - `blocks` → `registry:block`
4. **Updates** `registry.json` with new/updated entries
5. **Preserves** existing dependencies if they exist

**Important:** Always run `npm run sync-registry` after adding new components to ensure `registry.json` stays in sync.

---

## Need Help?

If you encounter issues:

1. **Check existing components** for reference patterns
2. **Verify file paths** match the `codePath` in registry
3. **Ensure TypeScript types** match the `Component` interface
4. **Run the linter** to catch errors: `npm run lint`
5. **Check browser console** for runtime errors
6. **Verify dependencies** are correctly listed in `registry.json`
7. **Test the sync script** output for warnings

---

## Code Style

- Use TypeScript for all components
- Follow React best practices
- Use functional components with hooks
- Prefer composition over inheritance
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components focused and single-purpose

---

## Accessibility

When creating components, consider:

- **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
- **Screen Readers:** Add appropriate ARIA labels and roles
- **Reduced Motion:** Respect `prefers-reduced-motion` media query
- **Focus Management:** Provide visible focus indicators
- **Color Contrast:** Ensure sufficient contrast ratios
- **Semantic HTML:** Use appropriate HTML elements

---

Thank you for contributing to UITripleD! 🎉
