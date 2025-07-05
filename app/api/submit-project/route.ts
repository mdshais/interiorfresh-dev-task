import { NextResponse } from "next/server"
import type { FormData } from "@/types/form"

export async function POST(request: Request) {
  try {
    const body: FormData = await request.json()

    if (!body.projectDetails?.name || !body.roomSelection?.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Project submission:", {
      projectName: body.projectDetails.name,
      roomType: body.roomSelection.type,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: "Project submitted successfully",
      projectId: `proj_${Date.now()}`,
    })
  } catch (error) {
    console.error("Submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
