import { UserManager } from "@/core/db/controllers";
import { IUser } from "@/core/db/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { lastname, firstname, email, password } = await request.json();

    if (email === "jamescoded@gmail.com" && password === "12334") {
      const userDetails: IUser = { lastname, firstname, email, password };
      UserManager.getInstance().preRegisterUser(userDetails);
      return NextResponse.json(
        { message: "Login successful", token: "your-jwt-token" },
        { status: 200 }
      );
    } else {
      // Unauthorized response
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred", error: error },
      { status: 500 }
    );
  }
}
