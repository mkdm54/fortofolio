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
        "portfolio-yellow": "#FFEB00",
        "portfolio-teal": "#00C8C8",
        "portfolio-pink": "#FF00FF",
        "portfolio-black": "#000000", // Explicitly define black for borders
        "portfolio-red-pink": "#FF0062", // Warna kustom baru: RGB(255, 0, 98)
        // New colors for calculator
        "calc-dark-blue": "#2700d4",
        "calc-purple": "#4A00E0",
        "calc-deep-blue": "#160078",
        "calc-cyan": "#00FFC8", // Adjusted from rgb(0, 255, 200)
        "calc-red": "#FF0000", // Adjusted from rgb(255, 0, 0)
        "calc-orange": "#FFA500", // Adjusted from orange
        "whatsapp-green": "#25D366", // Warna hijau WhatsApp
        "reddit-orange": "#FF4500", // Warna oranye Reddit
        "linkedin-blue": "#0077B5", // Warna biru LinkedIn
        "instagram-purple": "#E1306C", // Warna ungu Instagram
        "github-black": "#181717", // Warna hitam GitHub
        "threads-black": "#000000", // Warna hitam untuk Threads (sesuai logo)
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
        // "scroll-left": { // Dihapus
        //   from: { transform: "translateX(0%)" },
        //   to: { transform: "translateX(-50%)" },
        // },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // "scroll-left": "scroll-left 30s linear infinite", // Dihapus
      },
    },
  },
  plugins: [tailwindcssAnimate], // Menggunakan modul yang diimpor
} satisfies Config;
