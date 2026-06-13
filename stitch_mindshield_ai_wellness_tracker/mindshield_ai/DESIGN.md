---
name: MindShield AI
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464555'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#6b38d4'
  on-secondary: '#ffffff'
  secondary-container: '#8455ef'
  on-secondary-container: '#fffbff'
  tertiary: '#00534a'
  on-tertiary: '#ffffff'
  tertiary-container: '#006d62'
  on-tertiary-container: '#69f1de'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#e9ddff'
  secondary-fixed-dim: '#d0bcff'
  on-secondary-fixed: '#23005c'
  on-secondary-fixed-variant: '#5516be'
  tertiary-fixed: '#71f8e4'
  tertiary-fixed-dim: '#4fdbc8'
  on-tertiary-fixed: '#00201c'
  on-tertiary-fixed-variant: '#005048'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: outfit
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
  headline-md:
    fontFamily: outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: manrope
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: manrope
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  container-max: 1280px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The brand identity centers on "Empathetic Intelligence"—a fusion of high-tech AI precision and the soft, nurturing qualities of a mental wellness companion. Designed specifically for students navigating academic pressure, the visual language prioritizes cognitive ease and emotional regulation.

The design system employs a **Modern Glassmorphic** style. It utilizes translucent layers to suggest depth without clutter, creating a "breathable" interface that feels expansive and calm. By combining the organizational structure of productivity tools with the organic, atmospheric qualities of meditation apps, the system evokes a sense of clarity, focus, and digital sanctuary. 

Key principles include:
- **Luminosity:** Using light and gradients to guide the eye toward positive actions.
- **Softness:** Avoiding harsh angles to reduce visual stress.
- **Clarity:** High-contrast typography paired with generous whitespace to minimize distractions.

## Colors

The palette is anchored by **Deep Indigo** and **Lavender**, colors that symbolize wisdom, intuition, and peace. This primary duo is used for critical interactive elements and brand moments. 

**Teal** and **Sky Blue** serve as secondary colors to denote growth and openness, often used for data visualization and mood tracking. The background system supports both a "Day" mode (Soft White) for active focus and a "Night" mode (Dark Navy) for evening reflection and wind-down. 

Gradients should be used sparingly but purposefully, typically blending Indigo into Lavender to create a sense of movement and vitality in headers and primary buttons. All color pairings must meet WCAG AA standards for accessibility, ensuring text remains legible against translucent glass backgrounds.

## Typography

This design system uses **Outfit** for headlines to provide a fresh, geometric, and modern tech feel. Its wide apertures and clean lines remain legible even at large display sizes. 

For body copy and functional labels, **Manrope** is used. It is a highly functional, modern sans-serif that balances the "tech" aesthetic of the system with excellent readability for long-form content, such as AI-generated insights or journaling prompts.

- Use **Display** styles for hero sections and emotional check-ins.
- Use **Headline** styles for page titles and card headers.
- Use **Body** styles for all reading material, ensuring a line height of at least 1.5x for accessibility.
- **Labels** are reserved for navigation, buttons, and secondary metadata.

## Layout & Spacing

The layout philosophy follows a **Fluid Grid** model based on an 8px spacing rhythm. This ensures mathematical harmony across all components.

- **Desktop:** A 12-column grid with 24px gutters. The layout should be centered with a maximum container width of 1280px to prevent excessive line lengths in reading views.
- **Tablet:** An 8-column grid with 20px gutters. Sidebars should collapse into a bottom navigation bar or a hamburger menu to preserve horizontal space.
- **Mobile:** A 4-column grid with 16px margins. 

Vertical spacing should be generous (using `xl` and `xxl` tokens) to create a "breathable" atmosphere that reduces the user's cognitive load and anxiety levels.

## Elevation & Depth

Depth is established through **Backdrop Blurs** and **Ambient Shadows** rather than solid fills. This creates a sense of lightweight layering.

1.  **Level 0 (Base):** The primary background color (Soft White or Dark Navy).
2.  **Level 1 (Surface):** Used for cards and secondary navigation. Features a 1px solid border (White @ 10% opacity) and a background blur of 12px.
3.  **Level 2 (Float):** Used for active modals and dropdowns. Background blur increases to 20px, paired with a soft, diffused shadow tinted with the primary Indigo color (5% opacity) to give the element a "lifted" appearance.
4.  **Glassmorphism:** All "Glass" elements must have a subtle inner highlight on the top-left edge to simulate a physical glass pane catching light.

## Shapes

The shape language is defined by **Smooth Rounded Corners**. Sharp edges are avoided to maintain a friendly, approachable, and non-threatening aesthetic.

- **Standard Elements (Buttons, Inputs):** Use `rounded` (0.5rem) as the default.
- **Cards & Containers:** Use `rounded-lg` (1rem) to create clear, soft containment for content.
- **Featured Modules (Goal tracking, AI Chat):** Use `rounded-xl` (1.5rem) to emphasize focus areas.
- **Interactive Pill Elements:** Chips and toggles should use fully rounded (pill) ends to distinguish them from structural containers.

## Components

### Buttons
Primary buttons use a linear gradient (Indigo to Lavender) with white text. They should have a subtle outer glow on hover that matches the primary color. Secondary buttons use a glassmorphic style: a translucent white/navy fill with a 1px border.

### Cards
Cards are the primary content vessel. They must feature a background blur (12px) and a subtle 1px border. There should be no heavy drop shadows; instead, use a soft "bloom" shadow that picks up the background color.

### Inputs & Form Fields
Fields should feel tactile but clean. Use a light gray background with an inner shadow to suggest depth. On focus, the border should transition to a 2px Indigo stroke with a soft lavender glow.

### Chips & Tags
Chips are pill-shaped and used for mood tagging or academic subjects. They use low-saturation versions of the accent colors (e.g., pale Teal for "Productivity") to keep the interface from feeling "loud."

### AI Insight Modules
These are specialized components with a unique treatment: a thin, animated gradient border (moving slowly between Lavender and Teal) to signal active "MindShield AI" processing or suggestions.