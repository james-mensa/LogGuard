import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

   console.log({ email, password });
    if (email === 'jamescoded@gmail.com' && password === '12334') {
      return NextResponse.json(
        { message: 'Login successful', token: 'your-jwt-token' },
        { status: 200 }
      );
    } else {
      // Unauthorized response
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: 'An error occurred', error: error },
      { status: 500 }
    );
  }
}
