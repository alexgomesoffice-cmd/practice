import { users } from "@/data/users";
import { NextResponse } from "next/server";


export async function POST(req:Request){
    const body = await req.json();

    console.log("BODY:", body);
console.log("USERS:", users);
    const user = users.find(
        (u)=>
            u.email === body.email &&
            u.password === body.password
    );

    if (!user){
        return NextResponse.json(
            {
                success:false,
                message: "Invalid Creds"
            }
        )
    }

    return NextResponse.json({
        success: true,
        user,
    });
    
}