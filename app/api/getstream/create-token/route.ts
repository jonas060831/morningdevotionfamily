import { NextRequest, NextResponse } from "next/server";
import { StreamClient } from "@stream-io/node-sdk";

const apiKey = process.env.STREAM_API_KEY!
const secretKey = process.env.STREAM_API_SECRET!

const serverClient = new StreamClient(apiKey, secretKey)

const POST = async (req: NextRequest) => {
  try {
    const body = await req.json()
    
    const { userId, role } = body

    if (!userId) {
      throw new Error("User ID is required");
    }

    //TODO: Check if that supplied user is a registered user in our db

    const exp = Math.floor(Date.now() / 1000) + 3 * 60 * 60; //3 hours
      const token = serverClient.generateCallToken({
          user_id: userId,
          call_cids: ["livestream:sunday-mass"],
          role: role, //admin allows backstage access
          exp: exp
      })

      return NextResponse.json(
        { success: true, data: token },
        { status: 200 }
      )
      
    
  } catch (error) {
    console.error('Server error:', error);
    const errMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: errMsg },
      { status: 500 }
    );
  }
}

export { POST }