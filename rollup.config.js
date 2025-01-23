import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/pantone-tcx.js",
  output: [
    {
      file: "lib/cjs/index.js",
      format: "cjs",
    },
    {
      file: "lib/esm/index.js",
      format: "esm",
    },
  ],
  plugins: [resolve(), commonjs()],
};
