// Base Cosmic object interface
export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, any>
  type: string
  created_at: string
  modified_at: string
}

// Category type
export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name: string
    description?: string
  }
}

// Author type
export interface Author extends CosmicObject {
  type: 'authors'
  metadata: {
    name: string
    bio?: string
    avatar?: {
      url: string
      imgix_url: string
    }
    twitter?: string
    website?: string
  }
}

// Post type
export interface Post extends CosmicObject {
  type: 'posts'
  metadata: {
    title: string
    excerpt?: string
    content: string
    featured_image?: {
      url: string
      imgix_url: string
    }
    author?: Author
    categories?: Category[]
  }
}

// API response types
export interface CosmicResponse<T> {
  objects: T[]
  total: number
}