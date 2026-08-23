import { PrismaClient, PromptStatus, Role, SellerStatus } from '@prisma/client';
import { randomBytes, scrypt as scryptCallback } from 'crypto';
import { promisify } from 'util';

const prisma = new PrismaClient();
const scrypt = promisify(scryptCallback);

const slugify = (value: string) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const hashPassword = async (password: string) => {
  const salt = randomBytes(16).toString('hex');
  const key = await scrypt(password, salt, 64) as Buffer;
  return `${salt}:${key.toString('hex')}`;
};

const categoryNames = ['Writing', 'Development', 'Marketing', 'Research', 'Visual work', 'Career', 'Product', 'Sales', 'Education', 'Operations', 'Data', 'Support', 'Legal', 'Finance', 'Personal'];
const tagNames = ['Clarity', 'Strategy', 'TypeScript', 'Editing', 'Research', 'Campaigns', 'Discovery', 'Leadership', 'Image', 'Interview', 'Planning', 'Analysis', 'Email', 'Copywriting', 'Automation', 'Documentation', 'Career', 'Design', 'Data', 'Workflow'];
const promptTitles = [
  'The brief that does not drift', 'Pragmatic code reviewer', 'The evidence editor', 'Interview story architect', 'Research sprint compass',
  'Art direction notes', 'Product discovery debrief', 'The difficult email', 'Decision memo maker', 'Onboarding pathfinder',
  'Useful meeting notes', 'Customer signal sorter', 'Bug report translator', 'Calm launch checklist', 'Clearer pricing page',
  'User research companion', 'Design critique partner', 'The daily stand-up editor', 'Source-aware explainer', 'Roadmap pressure test',
  'The kind follow-up', 'Funnel diagnosis worksheet', 'Schema reviewer', 'Portfolio story builder', 'Course outline with teeth',
  'Operations handoff guide', 'Data story composer', 'Support response coach', 'Terms plain-language pass', 'Budget scenario mapper',
];

async function main() {
  const passwordHash = await hashPassword('PromptForgeDemo!2026');
  const people = [
    { email: 'admin@promptforge.local', displayName: 'Avery Admin', role: Role.ADMIN },
    { email: 'mina@promptforge.local', displayName: 'Mina Ellis', role: Role.SELLER },
    { email: 'owen@promptforge.local', displayName: 'Owen Park', role: Role.SELLER },
    { email: 'rae@promptforge.local', displayName: 'Rae Silva', role: Role.USER },
    { email: 'tara@promptforge.local', displayName: 'Tara Venn', role: Role.USER },
    { email: 'sana@promptforge.local', displayName: 'Sana Adey', role: Role.USER },
    { email: 'noor@promptforge.local', displayName: 'Noor Grey', role: Role.USER },
    { email: 'dev@promptforge.local', displayName: 'Dev Kim', role: Role.USER },
  ];

  const users = await Promise.all(people.map((person) => prisma.user.upsert({
    where: { email: person.email },
    update: { displayName: person.displayName, role: person.role, passwordHash },
    create: { ...person, passwordHash },
  })));
  const byEmail = new Map(users.map((user) => [user.email, user]));

  const sellers = await Promise.all([
    { email: 'mina@promptforge.local', storeName: 'Mina makes briefs', slug: 'mina-ellis', bio: 'Strategy systems for focused creative teams.' },
    { email: 'owen@promptforge.local', storeName: 'Owen ships thoughtfully', slug: 'owen-park', bio: 'Engineering prompts built from actual review practice.' },
  ].map((seller) => prisma.sellerProfile.upsert({
    where: { userId: byEmail.get(seller.email)!.id },
    update: { storeName: seller.storeName, slug: seller.slug, bio: seller.bio, status: SellerStatus.APPROVED },
    create: { userId: byEmail.get(seller.email)!.id, storeName: seller.storeName, slug: seller.slug, bio: seller.bio, status: SellerStatus.APPROVED },
  })));

  const categories = await Promise.all(categoryNames.map((name, position) => prisma.category.upsert({
    where: { slug: slugify(name) }, update: { name, position }, create: { name, slug: slugify(name), position },
  })));
  const tags = await Promise.all(tagNames.map((name) => prisma.tag.upsert({
    where: { slug: slugify(name) }, update: { name }, create: { name, slug: slugify(name) },
  })));

  const seededPrompts = await Promise.all(promptTitles.map((title, index) => {
    const category = categories[index % categories.length];
    const seller = sellers[index % sellers.length];
    const selectedTags = [tags[index % tags.length], tags[(index + 4) % tags.length]];
    const slug = slugify(title);
    const price = index % 7 === 0 ? 0 : 79 + (index % 4) * 50;
    const content = `You are a precise partner for ${category.name.toLowerCase()} work. Start by identifying the real decision, the context that matters, and the constraint that should not be ignored. Then provide an actionable response in the requested format.`;
    const data = {
      sellerId: seller.id, categoryId: category.id, title, description: `A practical ${category.name.toLowerCase()} prompt designed for repeatable, high-quality work.`, content,
      preview: 'Start by identifying the real decision, the context that matters, and the constraint that should not be ignored…',
      exampleInput: 'Context, intended audience, and desired outcome.', exampleOutput: 'A structured response with assumptions made visible.',
      usageInstructions: 'Replace the bracketed context with your own material before running.', price, aiModel: index % 2 === 0 ? 'GPT-4o' : 'Claude',
      status: PromptStatus.APPROVED, rating: 4.4 + (index % 5) * 0.1, ratingCount: 4 + index, salesCount: 12 + index * 7, isFeatured: index < 3, isTrending: index < 6,
    };
    return prisma.prompt.upsert({
      where: { slug }, update: data,
      create: { slug, ...data, tags: { create: selectedTags.map((tag) => ({ tagId: tag.id })) }, versions: { create: { version: 1, content, preview: data.preview, usageInstructions: data.usageInstructions, changeNote: 'Initial published version.' } } },
    });
  }));

  const reviewers = users.filter((user) => user.role === Role.USER);
  await Promise.all(seededPrompts.slice(0, 10).map((prompt, index) => prisma.review.upsert({
    where: { userId_promptId: { userId: reviewers[index % reviewers.length].id, promptId: prompt.id } },
    update: { rating: 4 + (index % 2), comment: 'Clear context and easy to adapt to real work.' },
    create: { userId: reviewers[index % reviewers.length].id, promptId: prompt.id, rating: 4 + (index % 2), comment: 'Clear context and easy to adapt to real work.' },
  })));

  const wishlist = await prisma.wishlist.upsert({ where: { userId: reviewers[0].id }, update: {}, create: { userId: reviewers[0].id } });
  await Promise.all(seededPrompts.slice(0, 3).map((prompt) => prisma.wishlistItem.upsert({
    where: { wishlistId_promptId: { wishlistId: wishlist.id, promptId: prompt.id } }, update: {}, create: { wishlistId: wishlist.id, promptId: prompt.id },
  })));
  console.log(`Seeded ${users.length} users, ${categories.length} categories, ${tags.length} tags, and ${seededPrompts.length} prompts.`);
}

main().then(() => prisma.$disconnect()).catch(async (error) => { console.error(error); await prisma.$disconnect(); process.exit(1); });
