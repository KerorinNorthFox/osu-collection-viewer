import { logger } from "@/lib/logger/logger";
import { NextRequest, NextResponse } from "next/server";
import { Auth } from "osu-web.js";

interface RequestType {
  osuClientId: number;
  osuClientSecret: string;
  osuRedirectUrl: string;
}

interface ResponseType {
  token: string;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const data: RequestType = await req.json();

  try {
    const auth = new Auth(
      data.osuClientId,
      data.osuClientSecret,
      data.osuRedirectUrl,
    );
    const token = await auth.clientCredentialsGrant();

    logger.api("トークンの取得に成功", "POST");
    return NextResponse.json({
      token: token,
    });
  } catch (e) {
    logger.apiError(`トークンの取得に失敗 : ${e}`, "POST");
    return NextResponse.json({
      token: null,
    });
  }
}
