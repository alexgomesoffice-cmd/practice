'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import Image from 'next/image'

const CreatePost = () => {
const router = useRouter()

const [loading, setLoading] = useState(false)

const [images, setImages] = useState<File[]>([])

const [categories, setCategories] = useState<
{ id: number; name: string }[]

> ([])

const [formData, setFormData] = useState({
title: '',
article: '',
categoryId: '',
})

useEffect(() => {
const fetchCategories = async () => {
try {
const res = await fetch('/api/categories')
const data = await res.json()


    if (data.success) {
      setCategories(data.categories)
    }
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

fetchCategories()

}, [])

const handleSubmit = async (
e: React.FormEvent<HTMLFormElement>
) => {
e.preventDefault()


try {
  setLoading(true)

  const data = new FormData()

  data.append('title', formData.title)
  data.append('article', formData.article)
  data.append('categoryId', formData.categoryId)

  images.forEach((image) => {
    data.append('images', image)
  })

  const res = await fetch('/api/posts', {
    method: 'POST',
    body: data,
  })

  const result = await res.json()

  if (!result.success) {
    throw new Error(result.message)
  }

  toast.success('Post created successfully!')

  setFormData({
    title: '',
    article: '',
    categoryId: '',
  })

  setImages([])

  setTimeout(() => {
    router.push('/')
  }, 1000)
} catch (error) {
  console.error(error)

  toast.error(
    error instanceof Error
      ? error.message
      : 'Failed to create post'
  )
} finally {
  setLoading(false)
}

}

const onChange = (
e: React.ChangeEvent<
HTMLInputElement | HTMLTextAreaElement
>
) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
})
}

return ( 
  <div className="min-h-screen flex items-center justify-center p-6"> 
    <Card className="w-full max-w-2xl"> <CardHeader> <CardTitle className="text-2xl">
        Create Post
   </CardTitle>

      <p className="text-sm text-muted-foreground">
        Create a new post
      </p>
    </CardHeader>

    <CardContent>
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium">
            Images
          </label>

          <input
            type="file"
            multiple
            className="w-full rounded-md border border-input p-2"
            onChange={(e) => {
              const files = Array.from(
                e.target.files || []
              )

              setImages((prev) => [
                ...prev,
                ...files,
              ])
            }}
          />
        </div>

        {images.length > 0 && (
          <div className="flex gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative flex"
              >
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="h-24 w-25% rounded-md object-cover border"
                />

                <button
                  type="button"
                  className="flex top-1 right-1 h-6 w-6 rounded-full bg-red-500 text-white text-xs"
                  onClick={() => {
                    setImages((prev) =>
                      prev.filter(
                        (_, i) => i !== index
                      )
                    )
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Title
          </label>

          <Input
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter post title"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Article
          </label>

          <textarea
            name="article"
            value={formData.article}
            onChange={onChange}
            rows={6}
            required
            placeholder="Write your article..."
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Category
          </label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({
                ...formData,
                categoryId: e.target.value,
              })
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            required
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat.id}
                value={cat.id}
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {loading
            ? 'Creating Post...'
            : 'Submit Post'}
        </Button>
      </form>
    </CardContent>
  </Card>
</div>

)
}
export default CreatePost
