import { terser } from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/pantone-tcx.js",
  output: [
    {
      file: "dist/pantone-tcx.cjs",
      format: "cjs",
      sourcemap: true,
    },
    {
      file: "dist/pantone-tcx.mjs",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [resolve(), commonjs(), terser()],
};
