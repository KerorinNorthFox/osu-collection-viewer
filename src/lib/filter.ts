import { BeatmapRawData, CollectionData } from "./types/external";

interface MatchEachMd5Args {
  beatmaps: BeatmapRawData[]; // osu!db内の全譜面
  collection: CollectionData; // 選択したコレクション
}

// 全譜面とコレクションの譜面のMD5をマッチングさせてコレクション内の譜面のidを得る
export function matchEachMd5(args: MatchEachMd5Args) {
  const { beatmaps, collection } = args;
  let beatmapsInCollection: BeatmapRawData[] = [];

  // md5をキーとしてマッチさせるmapを作成
  let matchMd5: { [key: string]: BeatmapRawData } = {};
  beatmaps.forEach((item) => {
    matchMd5[item.md5] = item;
  });

  // コレクション中のmd5とマッチさせる
  collection.beatmapsMd5.forEach((item) => {
    if (matchMd5[item]) {
      beatmapsInCollection.push(matchMd5[item]);
    }
  });

  return beatmapsInCollection;
}
