import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { nodePolyfills } from "vite-plugin-node-polyfills";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [nodePolyfills()],
  },
  integrations: [tailwind(), react()],
  markdown: {
    shikiConfig: {
      theme: "github-dark",
    },
  },
	site: `https://nodetec.co`,
});
