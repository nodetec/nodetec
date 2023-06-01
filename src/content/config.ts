import { z, defineCollection } from "astro:content";
import { SITE, OPEN_GRAPH } from "../settings";
const docs = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    order: z.number(),
    title: z.string().default(SITE.title),
    description: z.string().default(SITE.description),
    lang: z.literal("en-us").default(SITE.defaultLanguage),
    image: z.string().optional().default(OPEN_GRAPH.image.src),
    ogLocale: z.string().optional(),
  }),
});

export const collections = {
  docs: docs,
};
