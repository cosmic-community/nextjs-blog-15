# Modern Blog Platform

![App Preview](https://imgix.cosmicjs.com/0ce1dba0-d12c-11f0-b20e-1d251587b0cd-photo-1498050108023-c5249f4df085-1764864757168.jpg?w=1200&h=300&fit=crop,compress)

A modern, fully-featured blog platform built with Next.js 15 and powered by Cosmic CMS. Features a clean, responsive design with category filtering, author profiles, and rich content display.

## Features

- 📝 **Dynamic Blog Posts** - Display all your blog content with featured images, excerpts, and metadata
- 🏷️ **Category Filtering** - Browse posts by category with dynamic routing and visual badges
- 👤 **Author Profiles** - Dedicated pages for each author showing their bio and articles
- 🎨 **Modern Design** - Clean, professional interface with smooth animations and intuitive navigation
- 📱 **Fully Responsive** - Mobile-first design that looks great on all devices
- ⚡ **Optimized Performance** - Static generation with Next.js 15 for fast loading times
- 🔍 **SEO Ready** - Proper meta tags and semantic HTML for search engine optimization

## Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6931b27c3584465d0a2f74ec&clone_repository=6931b3e53584465d0a2f7513)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a blog with posts, authors, and categories"

### Code Generation Prompt

> Based on the content model I created for "Create a content model for a blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface. Use Next.js 15.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- [Next.js 15](https://nextjs.org/) - React framework with App Router
- [Cosmic](https://www.cosmicjs.com) - Headless CMS for content management
- [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [React Markdown](https://github.com/remarkjs/react-markdown) - Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A Cosmic account with bucket credentials

### Installation

1. Clone this repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
```

4. Run the development server:

```bash
bun dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Posts

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: posts } = await cosmic.objects
  .find({ type: 'posts' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Post

```typescript
const { object: post } = await cosmic.objects
  .findOne({ type: 'posts', slug: 'post-slug' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Posts by Category

```typescript
const { objects: posts } = await cosmic.objects
  .find({ 
    type: 'posts',
    'metadata.categories': categoryId 
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses Cosmic as a headless CMS to manage all content. The content model includes:

- **Posts** - Blog articles with title, excerpt, content (markdown), featured image, author, and categories
- **Authors** - Writer profiles with name, bio, avatar, and social links
- **Categories** - Content organization with name and description

All content is fetched server-side using the Cosmic SDK for optimal performance and SEO.

## Deployment

### Deploy to Vercel

The easiest way to deploy this Next.js app is using Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

Remember to add your environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`

### Deploy to Netlify

You can also deploy to Netlify:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Add environment variables in Netlify's dashboard
4. Deploy!

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Cosmic Documentation](https://www.cosmicjs.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

<!-- README_END -->