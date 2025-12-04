// app/authors/[slug]/page.tsx
import { getAuthor, getAuthors, getPostsByAuthor } from '@/lib/cosmic'
import { Author, Post } from '@/types'
import PostCard from '@/components/PostCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const authors = await getAuthors() as Author[]
  return authors.map((author) => ({
    slug: author.slug,
  }))
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const author = await getAuthor(slug) as Author | null

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id) as Post[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Author Header */}
        <header className="text-center mb-12">
          {author.metadata.avatar && (
            <img
              src={`${author.metadata.avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
              alt={author.metadata.name}
              className="w-32 h-32 rounded-full mx-auto mb-6"
            />
          )}
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            {author.metadata.name}
          </h1>
          {author.metadata.bio && (
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
              {author.metadata.bio}
            </p>
          )}

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {author.metadata.twitter && (
              <a
                href={`https://twitter.com/${author.metadata.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
            )}
            {author.metadata.website && (
              <a
                href={author.metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:text-primary-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        </header>

        {/* Back to Home */}
        <div className="mb-8">
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

        {/* Author's Posts */}
        <section>
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            Articles by {author.metadata.name}
          </h2>
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts by this author yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}