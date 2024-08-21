import { UserManager } from "@/core/controllers";
import { IUser, UserAuthInfo } from "@/core/db/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { lastname, firstname, email, password } :UserAuthInfo = await request.json();
      const userDetails = { lastname, firstname, email, password };
      const res= await UserManager.getInstance().preRegisterUser(userDetails);
      console.log({ res})      
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
