import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  base: "/fontan/",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        contacts: "contacts.html",
      },
    },
  },
});
