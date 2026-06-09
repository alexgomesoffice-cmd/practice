import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
const Navbar = () => {
  

  return (
    <div className='bg-foreground text-background p-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50'>
        <Link href={'/'} className='text-lg font-bold'>
            My App
        </Link>
        <div className="flex items-center space-x-2">
              <Input
                id="Search"
                type="text"
                placeholder="Search..."
              />
              <Button className="ml-2">
                Search
              </Button>
        </div>
        <div className="space-x-4">
          <Link href={'/login'} className=''>
            Login
          </Link>
          <Link href={'/register'} className=''>
            Sign Up
          </Link>
        </div>
    </div>
  )
}

export default Navbar