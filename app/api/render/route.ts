import { NextRequest, NextResponse } from "next/server";
import { readFile } from "fs/promises";
import path from "path";

// Template metadata
const TEMPLATES: Record<
  string,
  {
    fps: number;
    durationInFrames: number;
    width: number;
    height: number;
    description: string;
    compositionId: string; // Remotion composition id (PascalCase)
  }
> = {
  "product-launch": {
    fps: 30,
    durationInFrames: 450,
    width: 1920,
    height: 1080,
    description: "Cinematic reveal animation for product announcements",
    compositionId: "ProductLaunch",
  },
  "tutorial-intro": {
    fps: 30,
    durationInFrames: 240,
    width: 1920,
    height: 1080,
    description: "Clean animated intro card for YouTube tutorials",
    compositionId: "TutorialIntro",
  },
  "saas-promo": {
    fps: 30,
    durationInFrames: 900,
    width: 1920,
    height: 1080,
    description: "Feature highlight reel with smooth animations",
    compositionId: "SaaSPromo",
  },
  "social-story": {
    fps: 30,
    durationInFrames: 300,
    width: 1080,
    height: 1920,
    description: "Vertical 9:16 story template for Instagram and TikTok",
    compositionId: "SocialStory",
  },
  "data-viz": {
    fps: 30,
    durationInFrames: 600,
    width: 1920,
    height: 1080,
    description: "Animated bar charts and KPI counters for reports",
    compositionId: "DataViz",
  },
  "lower-third": {
    fps: 30,
    durationInFrames: 150,
    width: 1920,
    height: 1080,
    description: "Animated lower-third overlays for interviews",
    compositionId: "LowerThird",
  },
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const templateId = searchParams.get("template");
    const download = searchParams.get("download") === "true";

    if (!templateId || !TEMPLATES[templateId]) {
      return NextResponse.json(
        {
          error: "Template not found",
          available: Object.keys(TEMPLATES),
        },
        { status: 404 }
      );
    }

    const template = TEMPLATES[templateId];

    // ── Download mode: stream the pre-rendered MP4 ─────────────────────────
    if (download) {
      const videoPath = path.join(process.cwd(), "public", "videos", `${templateId}.mp4`);
      let fileBuffer: Buffer;
      try {
        fileBuffer = await readFile(videoPath);
      } catch {
        return NextResponse.json(
          {
            error: "Pre-rendered video not found for this template.",
            hint: `Run: npx remotion render remotion/index.tsx ${template.compositionId} public/videos/${templateId}.mp4`,
          },
          { status: 404 }
        );
      }

      return new NextResponse(fileBuffer.buffer as ArrayBuffer, {
        status: 200,
        headers: {
          "Content-Type": "video/mp4",
          "Content-Disposition": `attachment; filename="${templateId}.mp4"`,
          "Content-Length": String(fileBuffer.byteLength),
          "Cache-Control": "public, max-age=3600",
        },
      });
    }

    // ── Info mode: return JSON with CLI instructions ────────────────────────
    return NextResponse.json({
      success: true,
      template: {
        id: templateId,
        compositionId: template.compositionId,
        description: template.description,
        fps: template.fps,
        durationInFrames: template.durationInFrames,
        duration: `${(template.durationInFrames / template.fps).toFixed(1)}s`,
        resolution: `${template.width}x${template.height}`,
      },
      download: {
        url: `/api/render?template=${templateId}&download=true`,
        note: "Downloads the pre-rendered MP4 directly",
      },
      localRender: {
        render: `npx remotion render remotion/index.tsx ${template.compositionId} output.mp4 --concurrency=4`,
        preview: `npx remotion studio`,
        withProps: `npx remotion render remotion/index.tsx ${template.compositionId} output.mp4 --props='{"title":"My Title"}'`,
      },
    });
  } catch (error) {
    console.error("[Render API] Error:", error);
    return NextResponse.json(
      { error: "Request failed", details: String(error) },
      { status: 500 }
    );
  }
}
