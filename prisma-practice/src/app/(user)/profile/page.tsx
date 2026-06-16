'use client'
import { Card, CardHeader,CardTitle,CardContent,CardFooter } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'



const ProfilePage = () => {
    const [formData,setFormData] = useState({
        name:'',
        email:'',
        password:'',

    })
    useEffect(() => {
    const loadUser = async () => {
    const res = await fetch("/api/me")
    const data = await res.json()

    if (data.loggedIn) {
      setFormData({
        name: data.user.fullname,
        email: data.user.email,
        password: "",
      })
    }
  }

  loadUser()
}, [])
    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        
    } 
  return (
    <div className="flex min-h-screen items-center justify-center">
        <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className='flex justify-center'>Edit Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="Name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Alexie"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="email">Email</Label>
              </div>
              <Input
                id="Email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                required
              />
            </div>
          </div>
          <CardFooter className="flex-col gap-2 pt-4">
        <Button type="submit" className="w-full">
          Update Profile
        </Button>
      </CardFooter>
        </form>
      </CardContent>

    </Card>
    </div>
  )
}

export default ProfilePage