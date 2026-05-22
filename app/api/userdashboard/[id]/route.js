import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { getUserFromRequest } from "@/lib/auth";
import UserDashboard from "@/models/UserDashboard";

export async function DELETE(request, { params }) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  try {
    await connectDB();
    await UserDashboard.findOneAndDelete({ _id: params.id, userId: user.userId });
    return NextResponse.json({ message: "Dashboard record deleted." });
  } catch (error) {
    console.error("DELETE /userdashboard/[id] error:", error);
    return NextResponse.json({ message: "Something went wrong." }, { status: 500 });
  }
}
