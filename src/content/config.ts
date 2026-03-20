import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  description: z.string(),
  section: z.string(),
  topic: z.string().optional(),
  tags: z.array(z.string()).default([]),
  era: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().optional(),
  updatedAt: z.string().optional(),
  quote: z.string().optional(),
  quoteSource: z.string().optional(),
  status: z.enum(['planned', 'draft', 'ready', 'published']).default('draft'),
  related: z.array(z.object({
    title: z.string(),
    href: z.string(),
    description: z.string(),
  })).optional(),
});

const archiveCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['era', 'cultivation', 'theory']),
  }),
});

const medicineCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['classic', 'theory', 'practice']),
  }),
});

const mythCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    category: z.enum(['beast', 'deity', 'place', 'event']),
  }),
});

const dharmaCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    tradition: z.enum(['buddhism', 'daoism', 'both']),
  }),
});

const realmsCollection = defineCollection({
  type: 'content',
  schema: baseSchema.extend({
    realmType: z.enum(['qi', 'body', 'spirit', 'combined']),
  }),
});

export const collections = {
  archive: archiveCollection,
  medicine: medicineCollection,
  myth: mythCollection,
  dharma: dharmaCollection,
  realms: realmsCollection,
};

export type SectionColor = 'gold' | 'jade' | 'ochre' | 'amethyst' | 'sapphire';

export const sectionColors: Record<string, SectionColor> = {
  '档案馆': 'gold',
  '典籍': 'jade',
  '神话': 'amethyst',
  '法门': 'sapphire',
  '境界': 'ochre',
};
