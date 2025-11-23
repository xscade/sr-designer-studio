# SR Designer Studio - Developer Guide

## 💎 Project Overview
**SR Designer Studio** is a premium, Apple-inspired landing page for a leading interior design firm in Visakhapatnam. The site features a unique **Global Horizontal Scroll** experience, cinematic animations, and a high-end editorial aesthetic.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** 
  - **GSAP ScrollTrigger:** Powered the global horizontal scroll.
  - **Framer Motion:** Used for micro-interactions, fades, and component reveals.
- **UI Primitives:** Radix UI (accessible primitives), Lucide React (icons).
- **Fonts:** 
  - **Fraunces (Variable):** Editorial Serif (Substitute for Reckless).
  - **Plus Jakarta Sans:** Geometric Sans (Substitute for Suisse Int'l).

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Build for Production:**
   ```bash
   npm run build
   ```

## 📂 Project Structure
```
/app
  layout.js       # Global font config & metadata
  page.js         # Main entry point. Implements GSAP Global Horizontal Scroll.
  globals.css     # Tailwind directives & CSS variables
/components
  /ui             # Reusable primitives (Button, Card)
  Hero.jsx        # "Building Beyond" cinematic entrance
  FounderShowcase # Asymmetric layout with bio
  ServicesGrid.jsx# 4-column hoverable cards
  Portfolio.jsx   # Horizontal gallery showcase
  ProcessTimeline # Horizontal step-by-step journey
  AIGenerator.jsx # Interactive AI concept generator
  LeadForm.jsx    # Contact/Lead capture form
  Footer.jsx      # Full-height footer panel
/hooks
  useHorizontalScroll.js # (Legacy) Local scroll logic
  useRevealMotion.js     # Reveal on scroll hook
/lib
  utils.js        # cn() utility for Tailwind class merging
```

## 🎨 Design System

### Typography
- **Headings (`font-serif`):** Fraunces. Used for all section titles ("Building Beyond", "Our Expertise").
- **Body (`font-sans`):** Plus Jakarta Sans. Used for navigation, descriptions, and UI text.

### Brand Colors
- **SR Red:** `#B31E1A` (Primary Accent)
- **SR Orange:** `#E87F02` (Secondary Accent)
- **SR Beige:** `#F4E6CB` (Background Warmth)
- **SR Black:** `#121212` (Primary Text/Background)

### Key Interaction: Global Horizontal Scroll
The entire website behaves as a single horizontal strip.
- **Implementation:** `app/page.js` uses `GSAP ScrollTrigger` to pin the main container and translate it on the X-axis based on the vertical scroll position.
- **Developer Note:** All top-level sections in `page.js` must have `w-screen` (or fixed width) and `h-screen` to maintain the "slide" effect.

## 📝 Developer Notes & Troubleshooting

### GSAP ScrollTrigger + React
**Common Error:** `Runtime NotFoundError: The node to be removed is not a child of this node.`

**Cause:** This happens when you use `pin: true` on the direct root element returned by a React component (e.g., `<main>`). GSAP wraps the pinned element in a `pin-spacer` div, altering the DOM structure. When React attempts to unmount the component (e.g., during route changes), it fails to find the node where it expects it to be.

**Solution:**
1. **Internal Wrapper:** NEVER pin the component's root element. Create an inner `div` or wrapper inside the root and apply the `ref` and pinning to that.
   ```jsx
   // ✅ CORRECT
   return (
     <main>
       <div ref={pinnedContainerRef}> {/* Pin this */}
          {content}
       </div>
     </main>
   )

   // ❌ INCORRECT
   return (
     <main ref={pinnedContainerRef}> {/* Don't pin this */}
       {content}
     </main>
   )
   ```
2. **GSAP Context:** ALWAYS use `gsap.context()` in `useEffect` to scope animations and ensure `ctx.revert()` is called in the cleanup function.
3. **Scroll Behavior:** Do NOT use `scroll-behavior: smooth` (Tailwind `scroll-smooth`) in global CSS or Layout when using ScrollTrigger's `scrub`, as they conflict.

### Adding Sections
- To add a new section, create the component, import it into `app/page.js`, and wrap it in a `section` or `div` with `h-screen` and `shrink-0`.

### Fonts
- Always use `font-serif` for main artistic headings to maintain the "Studio RHE" editorial look.
