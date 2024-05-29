import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { extname, relative, resolve } from "path";
import dts from "vite-plugin-dts";

import { glob } from "glob";
import { fileURLToPath } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), dts()],
	build: {
		lib: {
			// Could also be a dictionary or array of multiple entry points
			entry: resolve(__dirname, "src/main.ts"),
			name: "intugine-ui",
			fileName: "intugine-ui",
			formats: ["es"],
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			input: Object.fromEntries(
				glob.sync("src/**/*.{ts,tsx}").map((file) => [
					// This remove `src/` as well as the file extension from each
					// file, so e.g. src/nested/foo.js becomes nested/foo
					relative("src", file.slice(0, file.length - extname(file).length)),
					// This expands the relative paths to absolute paths, so e.g.
					// src/nested/foo becomes /project/src/nested/foo.js
					fileURLToPath(new URL(file, import.meta.url)),
				])
			),
			output: {
				assetFileNames: "assets/[name][extname]",
				entryFileNames: "[name].js",
			},
			external: ["react, react/jsx-runtime"],
		},
	},
});
