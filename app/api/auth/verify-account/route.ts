import { UserManager } from "@/core/controllers";
import { IUser } from "@/core/db/types";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl

    const token  = searchParams.get("t")
    const ip = (request.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
console.log({token,ip,searchParams:request.headers.get('x-forwarded-for')})
      // const res= await UserManager.getInstance().authUser()     
      return NextResponse.json(
        { message: "Login successful", token: "your-jwt-token" },
        { status: 200 }
      );

  } catch (error) {
    console.log({error})
    return NextResponse.json(
      { message: "An error occurred", error },
      { status: 500 }
    );
  }
}
