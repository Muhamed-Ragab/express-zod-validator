import { defineConfig } from "tsup";

export default defineConfig({
  name: "express-zod-validator",
  entry: ["src/index.ts"],
  outDir: "build",
  clean: true,
  format: ["cjs", "esm"],
  shims: false,
  minify: true,
  dts: true,
  sourcemap: true,
  splitting: false,
});
