export type PromptRecord = {
  slug: string;
  title: string;
  description: string;
  category: string;
  model: string;
  creator: string;
  creatorInitials: string;
  rating: number;
  reviews: number;
  sales: number;
  price: number;
  accent: 'forge' | 'moss' | 'ink';
  excerpt: string;
  tags: string[];
};

export const categories = [
  { name: 'Writing', count: 248, note: 'Structure, voice, and long-form craft' },
  { name: 'Development', count: 193, note: 'Shipping better software, thoughtfully' },
  { name: 'Marketing', count: 164, note: 'Clear campaigns without the noise' },
  { name: 'Research', count: 126, note: 'Source-grounded thinking and synthesis' },
  { name: 'Visual work', count: 109, note: 'Direction for images and interfaces' },
  { name: 'Career', count: 87, note: 'Preparation for consequential moments' },
];

export const prompts: PromptRecord[] = [
  {
    slug: 'the-brief-that-doesnt-drift', title: "The brief that doesn't drift", category: 'Marketing',
    model: 'GPT-4o', creator: 'Mina Ellis', creatorInitials: 'ME', rating: 4.9, reviews: 84, sales: 326,
    price: 149, accent: 'forge', tags: ['Positioning', 'Campaigns', 'Strategy'],
    description: 'Turn a loose business ask into a sharp, useful creative brief in one guided pass.',
    excerpt: 'Act as a strategist who protects the signal. First, identify the decision this brief needs to make…',
  },
  {
    slug: 'pragmatic-code-reviewer', title: 'Pragmatic code reviewer', category: 'Development',
    model: 'Claude', creator: 'Owen Park', creatorInitials: 'OP', rating: 4.8, reviews: 61, sales: 279,
    price: 99, accent: 'moss', tags: ['TypeScript', 'Review', 'Engineering'],
    description: 'A senior-review pass that finds risk, explains tradeoffs, and keeps the team moving.',
    excerpt: 'Review this change like an invested teammate. Start with the highest-leverage concern, then explain why…',
  },
  {
    slug: 'the-evidence-editor', title: 'The evidence editor', category: 'Writing',
    model: 'ChatGPT', creator: 'Rae Silva', creatorInitials: 'RS', rating: 4.9, reviews: 47, sales: 212,
    price: 0, accent: 'ink', tags: ['Editing', 'Nonfiction', 'Clarity'],
    description: 'Edit a draft without sanding off its point of view or pretending every claim is equally sound.',
    excerpt: 'You are a precise, generous editor. Separate claims from evidence, flag leaps, and preserve the author’s voice…',
  },
  {
    slug: 'interview-story-architect', title: 'Interview story architect', category: 'Career',
    model: 'GPT-4o', creator: 'Tara Venn', creatorInitials: 'TV', rating: 4.7, reviews: 39, sales: 156,
    price: 129, accent: 'forge', tags: ['Interviews', 'Narrative', 'Leadership'],
    description: 'Shape your raw experience into memorable, truthful stories for serious interviews.',
    excerpt: 'Use the facts below to find two moments of change. Build each into a concise story with a decision, tension…',
  },
  {
    slug: 'research-sprint-compass', title: 'Research sprint compass', category: 'Research',
    model: 'Claude', creator: 'Sana Adey', creatorInitials: 'SA', rating: 4.8, reviews: 33, sales: 138,
    price: 179, accent: 'moss', tags: ['Synthesis', 'Discovery', 'Sources'],
    description: 'Plan and synthesize a research sprint while keeping open questions visible.',
    excerpt: 'Treat the following material as an incomplete evidence set. Group what is known, contested, and still needed…',
  },
  {
    slug: 'art-direction-notes', title: 'Art direction notes', category: 'Visual work',
    model: 'Midjourney', creator: 'Noor Grey', creatorInitials: 'NG', rating: 4.6, reviews: 22, sales: 94,
    price: 89, accent: 'ink', tags: ['Image', 'Moodboard', 'Direction'],
    description: 'Translate a half-formed visual instinct into an image brief with texture and restraint.',
    excerpt: 'Make a visual language guide, not a list of adjectives. Describe framing, light, material, rhythm, and what to avoid…',
  },
];

export const formatPrice = (price: number) => (price === 0 ? 'Free' : `₹${price}`);
