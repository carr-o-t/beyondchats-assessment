// app/api/metadata/route.ts
import { NextResponse } from "next/server";
import ogs from "open-graph-scraper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const { result } = await ogs({ url });
    return NextResponse.json({
      title: result.ogTitle,
      description: result.ogDescription,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch metadata" }, { status: 500 });
  }
}