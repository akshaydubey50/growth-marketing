/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '375px',
      },
      maxWidth: {
        '8xl': '88rem',  // 1408px
        '9xl': '96rem',  // 1536px
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "light-yellow": "#FFA500",
        DarkOrange: "#2bb656",
        "light-gray": "#f5f5f5",
        "Orange-200": "#fed7aa",
      },
      fontFamily: {
        poppins: ["var(--font-poppins)"],
      },
      fontSize: {
        "Heading-Small": "clamp(1rem, 2vw, 1.25rem)",
        "Heading-Medium": "clamp(1.5rem, 3vw, 1.875rem)",
        "Heading-Large": "clamp(2rem, 5vw, 3rem)",
        "Title-Small": "clamp(0.875rem, 1.5vw, 1rem)",
        "Title-Medium": "clamp(1rem, 1.75vw, 1.15rem)",
        "Title-Large": "clamp(1.125rem, 2vw, 1.25rem)",
        "Title-Larger": "clamp(1.25rem, 2.5vw, 2rem)",
        Description: "clamp(0.875rem, 1.5vw, 1rem)",
        "Description-Large": "clamp(1rem, 2vw, 1.25rem)",
        tags: "clamp(0.75rem, 1.25vw, 0.9rem)",
        "8xl": "clamp(4.5rem, 7vw, 6rem)",
        "9xl": "clamp(5rem, 8vw, 7rem)",
        "10xl": "clamp(5.5rem, 9vw, 8rem)",
        "11xl": "clamp(6rem, 10vw, 9rem)",
        "12xl": "clamp(6.5rem, 11vw, 10rem)"
      },
      lineHeight: {
        45: "2.813rem",
        90: "5.625rem",
      },
      spacing: {
        "10-percent": "10%",
      },
      animation: {
        shine: "shine 1s",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        shine: {
          "100%": { left: "125%" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};