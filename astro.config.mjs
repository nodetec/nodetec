import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { theme } from "./sometheme";
import remarkCodeTitles from "remark-code-titles";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [nodePolyfills()],
  },
  integrations: [tailwind(), react()],
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    shikiConfig: {
      theme: theme,
    },
  },
  site: `https://nodetec.co`,
});
