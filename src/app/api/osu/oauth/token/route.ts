import { Auth } from "osu-web.js";

interface RequestType {
  osuClientId: number;
  osuClientSecret: string;
  osuRedirectUrl: string;
}

interface ResponseType {
  token: string;
}

export async function POST(req: Request) {
  const { osuClientId, osuClientSecret, osuRedirectUrl }: RequestType =
    await req.json();

  const auth = new Auth(osuClientId, osuClientSecret, osuRedirectUrl);
  const token = await auth.clientCredentialsGrant();

  return Response.json({
    token: token,
  });
}
