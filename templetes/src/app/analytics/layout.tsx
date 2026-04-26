"use client";
import Link from 'next/link';
import { useState } from 'react';
const Layout = () => {
    const [name, setName] = useState("");
    return (
        <div>
            <input type="text" value={name} className='border' onChange={(e)=> setName(e.target.value)}>
            </input>
            <br />
            <Link href={`/analytics/revenue`}>Go to Revenue</Link>
            <br />
            <Link href={`/analytics/stats`}>Go to Stats</Link>
        </div>
    )
}
export default Layout;