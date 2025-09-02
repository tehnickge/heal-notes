// postcss.config.js
module.exports = {
  plugins: {
    "postcss-preset-mantine": {},
    "postcss-simple-vars": {
      variables: {
        // breakpoints
        "mantine-breakpoint-xs": "480px",
        "mantine-breakpoint-sm": "768px",
        "mantine-breakpoint-md": "992px",
        "mantine-breakpoint-lg": "1200px",
        "mantine-breakpoint-xl": "1440px",

        // цвета
        "color-primary": "#6c63ff",
        "color-secondary": "#a0aec0",
        "color-success": "#81e6d9",
        "color-danger": "#f56565",

        "color-text-primary": "#2d3748",
        "color-text-secondary": "#718096",
        "color-bg": "#f7fafc",
        "color-bg-alt": "#e2e8f0",

        // pastel UI
        "color-pastel-pink": "#fed7e2",
        "color-pastel-lavender": "#e9d8fd",
        "color-pastel-peach": "#ffe5d9",
        "color-pastel-mint": "#d1fae5",
        "color-pastel-blue": "#bee3f8",

        // shadows & borders
        "shadow-light": "rgba(0, 0, 0, 0.05)",
        "border-light": "#cbd5e0",

        // spacing
        "spacing-xs": "4px",
        "spacing-sm": "8px",
        "spacing-md": "16px",
        "spacing-lg": "24px",
        "spacing-xl": "32px",

        // border radius
        "radius-xs": "0.125rem",
        "radius-sm": "0.25rem",
        "radius-md": "0.375rem",
        "radius-lg": "0.5rem",
        "radius-xl": "0.75rem",
        "radius-xxl": "1rem",
      },
    },
  },
};
