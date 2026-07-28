import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import UserDashboard from "@/models/UserDashboard";

export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    const record = await UserDashboard.findOne({ userId: user.userId }).lean();

    if (!record) {
      return NextResponse.json({ message: "No dashboard data found.", data: null }, { status: 404 });
    }

    return NextResponse.json({ data: record });
  } catch (error) {
    console.error("GET /userdashboard/me error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}

export async function PUT(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    await connectDB();

    const record = await UserDashboard.findOneAndUpdate(
      { userId: user.userId },
      { ...body, userId: user.userId },
      { upsert: true, new: true, runValidators: true },
    ).lean();

    return NextResponse.json({ message: "Dashboard saved.", data: record });
  } catch (error) {
    console.error("PUT /userdashboard/me error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
