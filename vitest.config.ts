import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["tests/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "lcov", "html"],
    },
  },
  resolve: {
    alias: {
      "astro:env/server": path.resolve(
        __dirname,
        "src/test/__mocks__/astro-env-server.ts",
      ),
      "astro:env/client": path.resolve(
        __dirname,
        "src/test/__mocks__/astro-env-client.ts",
      ),
    },
  },
});
