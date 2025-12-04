import { getPosts } from '@/lib/cosmic'
import { Post } from '@/types'
import PostCard from '@/components/PostCard'
import CategoryFilter from '@/components/CategoryFilter'

export default async function HomePage() {
  const posts = await getPosts() as Post[]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-gray-900">
            Welcome to Our Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover insights, stories, and ideas about technology, travel, and lifestyle
          </p>
        </section>

        {/* Category Filter */}
        <CategoryFilter />

        {/* Posts Grid */}
        <section className="mt-12">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No posts found.</p>
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