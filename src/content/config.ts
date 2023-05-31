import { z, defineCollection } from "astro:content";
const fullnode = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    order: z.number(),
  }),
});

const nostr = defineCollection({
  type: "content",
  schema: z.object({
    label: z.string(),
    order: z.number(),
  }),
});

export const collections = {
  fullnode: fullnode,
  nostr: nostr,
};

export type DocType = {
  slug: string;
  id: string;
  collection: string;
  data: {
    label: string;
    order: number;
  };
};

export type ContentType = "fullnode" | "nostr";

export type CollectionType = "fullnode" | "nostr";

