import Link from 'next/link'
import { Post } from '@/types'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata.featured_image
  const author = post.metadata.author
  const categories = post.metadata.categories || []

  return (
    <article className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      {/* Featured Image */}
      {featuredImage && (
        <Link href={`/posts/${post.slug}`}>
          <img
            src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
            alt={post.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
          />
        </Link>
      )}

      <div className="p-6">
        {/* Categories */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/categories/${category.slug}`}
                className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium hover:bg-primary-200 transition-colors"
              >
                {category.metadata.name}
              </Link>
            ))}
          </div>
        )}

        {/* Title */}
        <Link href={`/posts/${post.slug}`}>
          <h2 className="text-xl font-bold mb-2 text-gray-900 hover:text-primary-600 transition-colors line-clamp-2">
            {post.metadata.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {post.metadata.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3">
            {post.metadata.excerpt}
          </p>
        )}

        {/* Author */}
        {author && (
          <Link href={`/authors/${author.slug}`} className="flex items-center gap-2 mt-4">
            {author.metadata.avatar && (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
                alt={author.metadata.name}
                className="w-8 h-8 rounded-full"
              />
            )}
            <span className="text-sm text-gray-700 hover:text-primary-600 transition-colors">
              {author.metadata.name}
            </span>
          </Link>
        )}
      </div>
    </article>
  )
}