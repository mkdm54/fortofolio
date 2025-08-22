import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate"; // Mengubah 'require' menjadi 'import'

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
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
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Custom colors for the portfolio theme
        "portfolio-yellow": "hsl(var(--portfolio-yellow))",
        "portfolio-teal": "hsl(var(--portfolio-teal))",
        "portfolio-pink": "hsl(var(--portfolio-pink))",
        "send-message-purple": "hsl(var(--send-message-purple))",
        "portfolio-black": "hsl(var(--portfolio-black))",
        "portfolio-red-pink": "hsl(var(--portfolio-red-pink))",
        "card-text-dark-mode": "hsl(var(--card-text-dark-mode))", // New color for card text
        "always-black": "hsl(var(--always-black))", // New color for always black text
        "portfolio-purple-link": "hsl(var(--portfolio-purple-link))", // New color for consistent purple link
        // New colors for calculator (these will remain fixed for now)
        "calc-dark-blue": "#2700d4",
        "calc-purple": "#4A00E0",
        "calc-deep-blue": "#160078",
        "calc-cyan": "#00FFC8",
        "calc-red": "#FF0000",
        "calc-orange": "#FFA500",
        // Social media colors (these will remain fixed for now)
        "whatsapp-green": "#25D366",
        "reddit-orange": "#FF4500",
        "linkedin-blue": "#0077B5",
        "instagram-purple": "#E1306C",
        "github-black": "#181717",
        "threads-black": "#000000",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
