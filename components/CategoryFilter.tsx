import { getCategories } from '@/lib/cosmic'
import { Category } from '@/types'
import Link from 'next/link'

export default async function CategoryFilter() {
  const categories = await getCategories() as Category[]

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-900">Browse by Category</h2>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 group"
          >
            <span className="font-medium text-gray-900 group-hover:text-primary-700">
              {category.metadata.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}