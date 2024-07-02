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

  const auth = new Auth(
    data.osuClientId,
    data.osuClientSecret,
    data.osuRedirectUrl,
  );
  const token = await auth.clientCredentialsGrant();

  return NextResponse.json({
    token: token,
  });
}
