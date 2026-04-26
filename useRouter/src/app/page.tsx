"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';


export default function Home() {
  const router = useRouter();
  const navigate = (page:string) => {
    router.push(`/${page}`)
  }
  return (
    <div>
      <button onClick={()=>navigate('home')}>Home</button>
      <button onClick={()=>navigate('colors')}>Colors</button>
      <button onClick={()=>navigate('login')}>Login</button>
    </div>
    
  )
    
}