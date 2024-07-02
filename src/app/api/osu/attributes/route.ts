import { GameMode } from "@/lib/types/external";
import {
  Client,
  FruitsBeatmapDifficultyAttributes,
  ManiaBeatmapDifficultyAttributes,
  OsuBeatmapDifficultyAttributes,
  TaikoBeatmapDifficultyAttributes,
} from "osu-web.js";

interface RequestType {
  token: string;
  mode: number;
}

export async function POST(
  req: Request,
  { params }: { params: { beatmap: number } },
) {
  const beatmapId = params.beatmap;
  const data: RequestType = await req.json();
  const token = data.token;

  try {
    const api = new Client(token);
    let attributes:
      | OsuBeatmapDifficultyAttributes
      | ManiaBeatmapDifficultyAttributes
      | TaikoBeatmapDifficultyAttributes
      | FruitsBeatmapDifficultyAttributes;
    switch (data.mode) {
      case GameMode.Osu:
        attributes = await api.beatmaps.getBeatmapAttributes(beatmapId, "osu");
        break;
      case GameMode.Mania:
        attributes = await api.beatmaps.getBeatmapAttributes(
          beatmapId,
          "mania",
        );
        break;
      default:
        throw new Error("Invalid game mode." + data.mode);
        break;
    }
    console.log(beatmapId, " の譜面情報の取得に成功しました: ", attributes);
    return Response.json({ success: true, attributes: attributes });
  } catch (e) {
    console.error(beatmapId, " の譜面情報の取得に失敗しました :", e);
    return Response.json({ success: false, attributes: null });
  }
}
