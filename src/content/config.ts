import { z, defineCollection } from "astro:content";
const docs = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  docs: docs,
};
