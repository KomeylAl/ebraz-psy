import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log(token)
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API_URL}api/v2/doctors/logout`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          Authorization: `Bearer ${token?.value}`,
        },
      }
    );

    if (!response.ok) {
      const errors = await response.json();
      console.log(errors)
      return NextResponse.json(
        { message: "Error in logging out" },
        { status: response.status }
      );
    }

    const res = NextResponse.json(
      { message: "Logged out successfuly" },
      { status: 200 }
    );

    res.cookies.delete("token");

    return res;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: `Something went wrong ${error.message}` },
      { status: 500 }
    );
  }
}
