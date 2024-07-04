export interface BeatmapRawData {
  osu_file_name: string;
  beatmap_id: number;
  beatmapset_id: number;
  md5: number;
  ranked_status: number;
  mode: number;
}

export interface BeatmapData extends BeatmapRawData {
  user_combo: number;
  max_combo: number;
}

export interface CollectionData {
  name: string;
  beatmapsCount: number;
  beatmapsMd5: string[];
}

export interface OsuDB {
  username: string;
  beatmaps_count: string;
  beatmaps: BeatmapRawData[];
}

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
