import { getTutorialsData } from "@/lib/tutorials";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tutorialData = getTutorialsData();
    return NextResponse.json(tutorialData, { status: 200 });
  } catch (error) {
    console.error("Error fetching tutorial data:", error);
    return NextResponse.json({ error: "Failed to retrieve tutorial structure." }, { status: 500 });
  }
}
