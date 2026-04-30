import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Map template id → Remotion composition file name
const TEMPLATE_FILES: Record<string, string> = {
  "product-launch": "ProductLaunch.tsx",
  "tutorial-intro": "TutorialIntro.tsx",
  "saas-promo": "SaaSPromo.tsx",
  "social-story": "SocialStory.tsx",
  "data-viz": "DataViz.tsx",
  "lower-third": "LowerThird.tsx",
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id || !TEMPLATE_FILES[id]) {
    return NextResponse.json(
      { error: "Template not found", available: Object.keys(TEMPLATE_FILES) },
      { status: 404 }
    );
  }

  const filePath = path.join(process.cwd(), "remotion", TEMPLATE_FILES[id]);
  let source: string;
  try {
    source = await readFile(filePath, "utf-8");
  } catch {
    return NextResponse.json(
      { error: "Source file not found on server." },
      { status: 500 }
    );
  }

  return new NextResponse(source, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `attachment; filename="${TEMPLATE_FILES[id]}"`,
      "Access-Control-Allow-Origin": "*",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
