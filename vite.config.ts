import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";

// Config de Vite estándar (sin el wrapper de Lovable). Reproduce a mano lo que
// @lovable.dev/vite-tanstack-config hacía por debajo: alias "@" -> src, Tailwind,
// TanStack Start (con el entry de servidor en src/server.ts) y Nitro con preset
// "node-server", que genera un servidor Node.js normal en .output/server/index.mjs
// — el formato que Render (y cualquier VPS Node) puede ejecutar.
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    tanstackStart({
      // Redirige el entry de servidor de TanStack Start a src/server.ts (nuestro wrapper SSR de errores).
      server: { entry: "server" },
    }),
    nitro({
      preset: "node-server",
    }),
    viteReact(),
  ],
});
