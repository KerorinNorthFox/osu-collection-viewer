import {
  BeatmapData,
  BeatmapRawData,
  BeatmapStatus,
  FetchData,
} from "@/lib/types/external";

export async function fetchScoreInfo(
  beatmaps: BeatmapRawData[],
  token: string,
): Promise<BeatmapData[]> {
  let beatmapData: BeatmapData[] = [];
  for (let i = 0; i < beatmaps.length; i++) {
    const beatmap = beatmaps[i];
    const fetchData: FetchData = {
      max_combo: -1,
      user_combo: -1,
    };
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
      fetchData.max_combo = beatmapAttr.max_combo;
      try {
        const userScore = await getUserCombo(beatmap, 25394282, token);
        fetchData.user_combo = userScore.max_combo;
      } catch (e) {
        fetchData.user_combo = 0;
      }
    }
    beatmapData.push(Object.assign(beatmap, fetchData));
  }
  return beatmapData;
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
