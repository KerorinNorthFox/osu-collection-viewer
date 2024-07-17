import { BeatmapRawData, CollectionData } from "./types/external";

// 全譜面とコレクションの譜面のMD5をマッチングさせてコレクション内の譜面のidを得る
export function matchEachMd5(
  beatmaps: BeatmapRawData[],
  collection: CollectionData,
) {
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
