'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const RegisterPage = () => {

  const router = useRouter()

  const [formData, setFormData] = React.useState({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // frontend validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()
      console.log(data);
      if (!data.success) {
        alert(data.message || "Registration failed")
        return
      }

      // redirect to login page
      router.push("/login")

    } catch (error) {
      console.log(error)
      alert("Something went wrong")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center">

      <Card className="w-full max-w-sm">

        <CardHeader>
          <CardTitle>Enter information to register</CardTitle>
          <CardDescription>
            Create your account
          </CardDescription>
        </CardHeader>

        <CardContent>

          <form onSubmit={handleSubmit}>

            <div className="flex flex-col gap-6">

              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  name="fullname"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>

            </div>

            <CardFooter className="flex-col gap-2 mt-4">
              <Button type="submit" className="w-full">
                Register
              </Button>
            </CardFooter>

          </form>

        </CardContent>

      </Card>
    </div>
  )
}

export default RegisterPage