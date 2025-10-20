import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/database";
import User from "@/app/models/User";
import * as bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "secret"

const POST = async(req: NextRequest) => {
    

    try {
        await connectDB()

        const { username, password } = await req.json()


        if(!username || !password) {
            return NextResponse.json(
            { success: false, error: 'Missing Credentials' },
            { status: 400 }
            );
        }
        
        const user = await User.findOne({ username })

        if(!user) {
            return NextResponse.json(
            { success: false, error: 'User not found' },
            { status: 400 }
            );
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return NextResponse.json(
            { success: false, error: 'Invalid credentials' },
            { status: 401 }
            );
        }


        // generate JWT token
        const token = jwt.sign(
            {
            _id: user._id,
            username: user.username,
            role: user.role,
            },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        return NextResponse.json(
            { success: true, message: 'Sign in Successful', token },
            { status: 200 }
        )
    } catch (error) {
        console.error("Sign In error:", error);
        return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
        );
        }
}

export { POST }