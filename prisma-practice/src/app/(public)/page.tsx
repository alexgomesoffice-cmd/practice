'use client'

import React, { useEffect, useState } from 'react'
import PostCard, { Post } from '@/components/customComponents/postCard'

const Home = () => {
const [posts, setPosts] = useState<Post[]>([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

useEffect(() => {
let mounted = true


const fetchPosts = async () => {
  try {
    const res = await fetch('/api/posts')
    const data = await res.json()

    if (!res.ok || !data.success) {
      throw new Error(data?.message || 'Failed to load posts')
    }

    if (mounted) {
      setPosts(data.posts || [])
    }
  } catch (err) {
    setError(err instanceof Error ? err.message : String(err))
  } finally {
    if (mounted) {
      setLoading(false)
    }
  }
}

fetchPosts()

return () => {
  mounted = false
}

}, [])

return ( <div className="min-h-screen bg-background text-foreground"> <main className="mx-auto max-w-7xl px-4 pt-24 pb-10">
{loading ? ( <div className="p-8 text-center">
Loading posts... </div>
) : error ? ( <div className="p-8 text-center text-red-500">
{error} </div>
) : ( <div className="flex gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
{posts.map((post) => (
  <div key={post.id} className="flex justify-center">
    <PostCard post={post} />
  </div>
))}</div>
)} </main> </div>
)
}

export default Home
