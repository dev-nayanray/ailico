import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/unit/**/*.test.ts", "tests/integration/**/*.test.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // The real package throws outside React Server Components; tests run in
      // plain Node and import server modules intentionally.
      "server-only": path.resolve(__dirname, "tests/stubs/server-only.ts"),
    },
  },
});
