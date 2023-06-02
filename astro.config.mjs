import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import { theme } from "./sometheme";
import remarkCodeTitles from "remark-code-titles";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [nodePolyfills()]
  },
  integrations: [tailwind(), react(), mdx()],
  markdown: {
    remarkPlugins: [remarkCodeTitles],
    rehypePlugins: [[rehypeExternalLinks, {
      target: "_blank",
      rel: ["noreferrer noopener"]
      // content: {
      //   type: "text",
      //   value: "↗",
      // },
    }], rehypeSlug, [rehypeAutolinkHeadings, {
      properties: {
        class: "heading-link heading-link--hidden---effects",
        "data-heading-link": true
      },
      behavior: "wrap"
    }]],
    shikiConfig: {
      theme: theme
    }
  },
  site: `https://nodetec.co`
});