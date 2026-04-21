# Lunar Laugh Mission - Manga Reader

![App Preview](https://imgix.cosmicjs.com/9547e5d0-3d6e-11f1-a386-4d54a5265133-autopilot-photo-1516849841032-87cbac4d88f7-1776768058533.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A dramatic Japanese manga-style comic reader featuring "Lunar Laugh Mission – Part 1: We Are NOT Ready" built with Next.js 16 and powered by Cosmic CMS.

## Features
- 📖 Sequential manga page reader with smooth navigation
- 👥 Character profiles with personality and appearance details
- 🎭 Cliffhanger indicators for dramatic story moments
- 🖼️ Optimized manga artwork with imgix
- 📱 Fully responsive design
- ⚡ Server-side rendering with Next.js 16

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69e753ad90067b42f59fc97c&clone_repository=69e754c790067b42f59fc9ee)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Create a Japanese manga-style comic story. Title: Lunar Laugh Mission – Part 1: We Are NOT Ready Characters: Siddhu – teenage boy, short messy black hair, confident, fearless, slightly reckless, funny Pratyaksh – teenage girl, medium black hair, intelligent, cautious, expressive, often annoyed but brave Story: Two teenagers sneak into a highly secured space launch site at night to secretly board a rocket going to the moon. They face multiple difficulties like avoiding guards, triggering alarms, and running for their lives. Structure: Start with a cinematic rocket launch site at night with guards Show the two characters sneaking in and talking They accidentally alert security (alarm scene) Guards chase them They run and climb into the rocket Inside the cockpit, they don't know how to operate anything Siddhu presses a random button The rocket suddenly launches End with a cliffhanger: something goes wrong (warning system or mysterious object in space) Tone: Mix of comedy + action + tension Funny dialogue and expressive reactions Dramatic manga style Panel Instructions: Generate 6 pages Each page should have 3–5 panels Include dialogue in speech bubbles Include sound effects like 'RUN!', 'BEEP', 'WEE WOO' Keep characters visually consistent across panels Style: Black and white manga style, cinematic lighting, dynamic motion lines, expressive anime faces Ending: Finish with a strong cliffhanger to continue in Part 2"

### Code Generation Prompt

> Build a Next.js application for a website called "Create Japanese manga-style". The content is managed in Cosmic CMS with the following object types: characters, comic-pages. Create a beautiful, modern, responsive design with a homepage and pages for each content type.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used
- **Next.js 16** with App Router
- **React 19**
- **TypeScript** with strict mode
- **Tailwind CSS** for styling
- **Cosmic SDK** for content management
- **imgix** for image optimization

## Getting Started

### Prerequisites
- Bun or Node.js 18+
- A Cosmic account and bucket

### Installation

1. Clone the repository
2. Install dependencies:
```bash
bun install
```

3. Set up environment variables in `.env.local`:
```
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

## Cosmic SDK Examples

### Fetching Comic Pages
```typescript
const response = await cosmic.objects
  .find({ type: 'comic-pages' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)

const pages = response.objects.sort((a, b) => 
  (a.metadata?.page_number || 0) - (b.metadata?.page_number || 0)
)
```

### Fetching Characters
```typescript
const response = await cosmic.objects
  .find({ type: 'characters' })
  .props(['id', 'slug', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This app integrates with two content types:
- **Characters**: Siddhu and Pratyaksh with appearance, role, and personality
- **Comic Pages**: Sequential story pages with panels, featured characters, and cliffhanger flags

## Deployment Options

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy

### Netlify
1. Push to GitHub
2. Import in Netlify
3. Add environment variables
4. Deploy
<!-- README_END -->