export interface FetchData {
  user_combo: number;
  max_combo: number;
}
// apiから得られる生の譜面データ
// @params
// osu_file_name:
// beatmap_id: 譜面ID
// beatmapset_id: 譜面の属するセットのid
// md5: 譜面のMD5
// ranked_status: 譜面のランク状態
// mode: 譜面のゲームモード
export interface BeatmapRawData {
  osu_file_name: string;
  beatmap_id: number;
  beatmapset_id: number;
  md5: number;
  ranked_status: number;
  mode: number;
  approach_rate: number;
  circle_size: number;
  overall_difficulty: number;
  hp_drain: number;
}

// テーブルに表示する譜面データ
export interface BeatmapData extends BeatmapRawData, FetchData {}

// コレクションのデータ
// @params
// name: コレクション名
// beatmapsCount: 譜面数
// beatmapsMd5: 譜面のMD5
export interface CollectionData {
  name: string;
  beatmapsCount: number;
  beatmapsMd5: string[];
}

// osu!.dbから得られるデータ
// username: ユーザー名
// beatmaps_count: 譜面総数
// beatmaps: 譜面のデータ
export interface OsuDB {
  username: string;
  beatmaps_count: string;
  beatmaps: BeatmapRawData[];
}

// collectino.dbから得られるデータ
// @params
// collectionscount: コレクションの総数
// collection: コレクションの実データ
export interface OsuCollectionDB {
  collectionscount: number;
  collection: CollectionData[];
}

export enum BeatmapStatus {
  Unknown,
  Unsubmitted,
  Graveyard,
  Unused,
  Ranked,
  Approved,
  Qualified,
  Loved,
}

export enum GameMode {
  Osu = 0,
  Mania = 3,
}
