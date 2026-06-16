'use client'

import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/customComponents/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Post = {
  id: number
  title: string
  article: string
  createdAt: string
  user: { fullname: string }
  category: { name: string }
  images: { imageUrl: string }[]
  _count: { likes: number; comments: number }
}

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        if (!data.success) {
          throw new Error(data.message || "Failed to load posts")
        }
        setPosts(data.posts || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const filteredPosts = useMemo(
    () =>
      posts.filter((post) =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.article.toLowerCase().includes(query.toLowerCase()) ||
        post.category.name.toLowerCase().includes(query.toLowerCase()) ||
        post.user.fullname.toLowerCase().includes(query.toLowerCase())
      ),
    [posts, query]
  )

  return (
    <div className="min-h-screen bg-background text-foreground flex">

      <main className="mx-auto max-w-6xl px-4 pt-28 pb-12 flex flex-row gap-8">

        <section className="space-y-4">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                Latest posts
              </p>
              <h2 className="text-2xl font-semibold">Community feed</h2>
            </div>
            <p className="text-sm text-muted-foreground">
              {filteredPosts.length} posts available
            </p>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-dashed border-muted-foreground/50 p-10 text-center text-muted-foreground">
              Loading posts...
            </div>
          ) : error ? (
            <div className="rounded-3xl border border-red-300 bg-red-50 p-10 text-center text-red-700">
              {error}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-muted-foreground/50 p-10 text-center text-muted-foreground">
              No posts found.
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden">
                  <div className="relative h-56 w-full">
                    {post.images?.[0]?.imageUrl ? (
                      <Image
                        src={post.images[0].imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-muted-foreground/10 text-muted-foreground">
                        No image available
                      </div>
                    )}
                  </div>
                  <CardContent className="space-y-4 p-6">
                    <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                      <span>{post.category.name}</span>
                      <span>•</span>
                      <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{post.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {post.article.slice(0, 140)}{post.article.length > 140 ? "..." : ""}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{post.user.fullname}</span>
                      <span>{post._count.likes} likes • {post._count.comments} comments</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
