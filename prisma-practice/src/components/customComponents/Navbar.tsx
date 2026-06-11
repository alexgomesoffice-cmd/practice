'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const Navbar = () => {
  const handleLogout = async ()=>{
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      })
      const data = await res.json()
      if (data.success) {
        setUser(null)
      }

    } catch (error) {
      console.error("Error logging out:", error)
    }
    
  }
  const [user, setUser] = useState<{ fullname: string } | null>(null)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/me")
        const data = await res.json()
        if (data.loggedIn) {
          setUser(data.user)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }
    getUser()
  }, [])

  return (
    <div className='bg-foreground text-background p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50'>
        <Link href={'/'} className='text-lg font-bold'>
            My App
        </Link>
        <div className="flex items-center space-x-2">
              <Input
                name="search"
                id="Search"
                type="text"
                placeholder="Search..."
              />
              <Button className="ml-2">
                Search
              </Button>
        </div>
        <div className="space-x-4">
          {(user) ? (
            <div className="flex items-center space-x-4">
      
              <Link href={'/create-post'}>
              <Button variant="outline" >
                New Post
              </Button>
              </Link>

              <DropdownMenu>

  <DropdownMenuTrigger asChild>
    <Button variant="outline">
      {user.fullname}
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end"
  className='bg-background text-foreground border'>
    <DropdownMenuItem asChild>
      <Link href="/profile">
        Profile
      </Link>
    </DropdownMenuItem>
    <DropdownMenuItem asChild>
      <Link href="/my-posts">
        My Posts
      </Link>
    </DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem
      onClick={handleLogout}
    >
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> 
            </div>
          ) : (
            <>
              <Link href={'/login'} >
                Login
              </Link> 
              <Link href={'/register'} >
                Sign Up
              </Link>
            </>
          )}
        </div>
    </div>
  )
}

export default Navbar


