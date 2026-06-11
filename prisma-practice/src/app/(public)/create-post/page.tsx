'use client'

import React, { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const CreatePost = () => {
    const [categories, setCategories] = React.useState<
        { id: number; name: string }[]
    >([])

    const [formData, setFormData] = React.useState({
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
            const res = await fetch('/api/posts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()

            if (!data.success) {
                throw new Error(data.message)
            }
        } catch (error) {
            console.error('Error creating post:', error)
        }
    }

    const onChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
  <div className="min-h-screen flex items-center justify-center p-6">
    <Card className="mx-auto w-full max-w-sm ">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl font-bold">
          Create Post
        </CardTitle>

        <p className="text-sm text-muted-foreground">
          Create a new post by thinking absolutely nothing...
        </p>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Title
            </label>
            <Input
              name="title"
              type="text"
              placeholder="Enter post title"
              value={formData.title}
              onChange={onChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">
              Article
            </label>
            <textarea
              name="article"
              placeholder="Write your article..."
              rows={5}
              value={formData.article}
              onChange={onChange}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
              required
            />
          </div>

          <div className="space-y-2 mb-2">
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
              <option value="">Select Category</option>

              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 "
          >
            Submit Post
          </Button>
        </form>
      </CardContent>
    </Card>
  </div>
)
}

export default CreatePost