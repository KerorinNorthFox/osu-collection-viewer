import { GameMode } from "@/lib/types/external";
import { BeatmapUserScore, Client } from "osu-web.js";

interface RequestType {
  token: string;
  mode: number;
}

export async function POST(
  req: Request,
  { params }: { params: { beatmap: number; user: number } },
) {
  const beatmapId = params.beatmap;
  const userId = params.user;
  const data: RequestType = await req.json();
  const token = data.token;

  try {
    const api = new Client(token);
    let score: BeatmapUserScore;
    switch (data.mode) {
      case GameMode.Osu:
        score = await api.beatmaps.getBeatmapUserScore(beatmapId, userId, {
          query: {
            mode: "osu",
          },
        });
        break;
      case GameMode.Mania:
        score = await api.beatmaps.getBeatmapUserScore(beatmapId, userId, {
          query: {
            mode: "mania",
          },
        });
        break;
      default:
        throw new Error("Invalid game mode." + data.mode);
        break;
    }
    console.log(beatmapId, " のスコア情報の取得に成功しました:", score);
    return Response.json({ success: true, score: score });
  } catch (e) {
    console.log(beatmapId, " のスコア情報の取得に失敗しました:", e);
    return Response.json({ success: false, score: null });
  }
}
