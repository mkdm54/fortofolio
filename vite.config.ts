import { defineConfig } from "vite";
import dyadComponentTagger from "@dyad-sh/react-vite-component-tagger";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
    proxy: {
      // Proxy requests starting with /roblox-api to the Roblox API
      "/roblox-api": {
        target: "https://users.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/roblox-api/, ""),
        secure: true, // Ensure this is true for HTTPS targets
      },
      "/roblox-thumbnails-api": {
        target: "https://thumbnails.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/roblox-thumbnails-api/, ""),
        secure: true,
      },
      // New proxy for Roblox friends API
      "/roblox-friends-api": {
        target: "https://friends.roblox.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/roblox-friends-api/, ""),
        secure: true,
      },
    },
  },
  plugins: [dyadComponentTagger(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
