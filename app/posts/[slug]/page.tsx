// app/posts/[slug]/page.tsx
import { getPost, getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import ReactMarkdown from 'react-markdown'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = await getPosts() as Post[]
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

// Changed: In Next.js 15, params IS a Promise and must be awaited
export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug) as Post | null

  if (!post) {
    notFound()
  }

  const author = post.metadata.author
  const categories = post.metadata.categories || []
  const featuredImage = post.metadata.featured_image

  return (
    <article className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=800&fit=crop&auto=format,compress`}
              alt={post.title}
              className="w-full h-auto"
            />
          </div>
        )}

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {post.metadata.title}
          </h1>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium hover:bg-primary-200 transition-colors"
                >
                  {category.metadata.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author */}
          {author && (
            <Link href={`/authors/${author.slug}`} className="flex items-center gap-3 mb-6">
              {author.metadata.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=96&h=96&fit=crop&auto=format,compress`}
                  alt={author.metadata.name}
                  className="w-12 h-12 rounded-full"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">{author.metadata.name}</p>
                {author.metadata.bio && (
                  <p className="text-sm text-gray-600 line-clamp-1">{author.metadata.bio}</p>
                )}
              </div>
            </Link>
          )}

          {/* Excerpt */}
          {post.metadata.excerpt && (
            <p className="text-xl text-gray-600 leading-relaxed">
              {post.metadata.excerpt}
            </p>
          )}
        </header>

        {/* Post Content */}
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown>{post.metadata.content}</ReactMarkdown>
        </div>

        {/* Back to Home */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link
            href="/"
            className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}