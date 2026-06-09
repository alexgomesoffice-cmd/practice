import { users } from "@/data/users"
import { NextResponse } from "next/server";
export async function POST(req:Request) {
    const body = await req.json();

    const existingUser = users.find(
        (u)=> u.email === body.email
    );

    if (existingUser){
        return NextResponse.json({
            success: false,
            message: "User already exists"
        });
    }

    const newUser = {
        id: users.length+1,
        name: body.name,
        email: body.email,
        password: body.password

    };

    users.push(newUser);

    return NextResponse.json({
        success: true,
        user: newUser
    });
}