import { logger } from "./logger/logger";
import { BeatmapData, BeatmapRawData, BeatmapStatus } from "./types/external";

export async function fetchScoreInfo(
  beatmaps: BeatmapRawData[],
  token: string,
): Promise<BeatmapData[]> {
  let beatmapData: BeatmapData[] = [];
  for (let i = 0; i < beatmaps.length; i++) {
    const beatmap = beatmaps[i];
    let maxCombo = -1;
    let userMaxCombo = -1;
    if (
      beatmap.ranked_status == BeatmapStatus.Ranked ||
      beatmap.ranked_status == BeatmapStatus.Loved ||
      beatmap.ranked_status == BeatmapStatus.Approved ||
      beatmap.ranked_status == BeatmapStatus.Qualified
    ) {
      console.log(
        `Fetch > beatmap ID:${beatmap.beatmap_id} , beatmapset ID:${beatmap.beatmapset_id} , gamemode:${beatmap.mode}`,
      );
      const beatmapAttr = await getBeatmapAttributes(beatmap, token);
      maxCombo = beatmapAttr.max_combo;
      try {
        const userScore = await getUserCombo(beatmap, 25394282, token);
        userMaxCombo = userScore.max_combo;
      } catch (e) {
        userMaxCombo = 0;
      }
    }
    beatmapData.push(
      Object.assign(beatmap, {
        max_combo: maxCombo,
        user_combo: userMaxCombo,
      }),
    );
  }
  return beatmapData;
}

// osu!apiのトークンを発行する
export async function getToken(
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

// 譜面の難易度情報取得
interface BeatmapAttributes {
  max_combo: number;
  star_rating: number;
}

async function getBeatmapAttributes(beatmap: BeatmapRawData, token: string) {
  const res = await fetch(
    `/api/osu/beatmaps/${beatmap.beatmap_id}/attributes`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token, mode: beatmap.mode }),
    },
  );
  const data = await res.json();
  const attributes: BeatmapAttributes = data.attributes.attributes;
  return attributes;
}

// 譜面のユーザースコア取得
interface UserScore {
  max_combo: number;
}

async function getUserCombo(
  beatmap: BeatmapRawData,
  userId: number,
  token: string,
) {
  const res = await fetch(
    `/api/osu/beatmaps/${beatmap.beatmap_id}/scores/users/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ token: token, mode: beatmap.mode }),
    },
  );
  const data = await res.json();
  const userScore: UserScore = data.score.score;
  return userScore;
}
