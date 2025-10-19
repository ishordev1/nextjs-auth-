import { connectionDB } from "@/lib/ConnectionDB";
import { User } from "@/model/Users";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function POST(request) {
    const { email, password } = await request.json();
    try {
        await connectionDB();
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ message: "Invalid credentials", success: false }, { status: 401 })
        }

        //generate token
        const token = jwt.sign(
            {
                _id: user._id,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        )
        //create cookie and send in nextResponse
        const response = NextResponse.json({
            message: "Login successful",
            success: true,
    
        });
        response.cookies.set('authToken', token,{httpOnly:true})
        return response
    }
    catch (err) {
        return NextResponse.json({ message: err.message, success: false })
    }
}