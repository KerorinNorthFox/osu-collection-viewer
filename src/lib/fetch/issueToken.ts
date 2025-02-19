import { logger } from "@/lib/logger/logger";

// osu!apiのトークンを発行する
export async function issueToken(
  osuClientId: number,
  osuClientSecret: string,
  osuRedirectUrl: string,
) {
  logger.log("osu!apiのトークン発行開始");

  try {
    const res = await fetch(
      `${process.env.OSU_REDIRECT_URL}/api/osu/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          osuClientId: osuClientId,
          osuClientSecret: osuClientSecret,
          osuRedirectUrl: osuRedirectUrl,
        }),
        cache: "no-store",
      },
    );
    const data = await res.json();
    logger.info(
      `osu!apiのTokenの取得に成功: ...${data.token.access_token.slice(-20)}`,
    );
    return data.token;
  } catch (e) {
    logger.error(`osu!apiのTokenの取得に失敗 : ${e}`);
    throw e;
  }
}
