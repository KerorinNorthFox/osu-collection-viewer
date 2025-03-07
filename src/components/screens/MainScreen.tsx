"use client";
import UploadFile from "@/components/UploadFile";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { useEffect, useState } from "react";
import TimeLine from "@/components/timeline/TimeLine";
import TimeLineContent from "@/components/timeline/TimeLineContent";
import NotifyToasts from "@/components/toast/NotifyToasts";
import { logger } from "@/lib/logger/logger";
import SelectCollectionDropdown from "@/components/SelectCollectionDropdown";
import ApplyButton from "../button/ApplyButton";
import { matchEachMd5 } from "@/lib/filter";
import { fetchScoreInfo } from "@/lib/fetch";
import { useOsuToken } from "@/components/store/OsuTokenProvider";

const MainScreen = () => {
  const token = useOsuToken();
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isLoadDBCompleted, setIsLoadDBCompleted] = useState(false);
  // 選択されたコレクションのindex
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(-1);

  // osu!.dbとcollection.dbがどちらも読み込まれているか判定
  useEffect(() => {
    if (osuDB == null || osuCollectionDB == null) {
      setIsLoadDBCompleted(false);
      return;
    }
    logger.log("DB両方の読み込み完了");
    setIsLoadDBCompleted(true);
    return;
  }, [osuDB, osuCollectionDB]);

  function fetchScoreData() {
    if (osuDB == null || osuCollectionDB == null) return;
    if (selectedCollectionIndex == -1) return;
    const beatmaps = matchEachMd5(
      osuDB.beatmaps,
      osuCollectionDB.collection[selectedCollectionIndex],
    );
    fetchScoreInfo(beatmaps, token).then((bms) => {
      // TODO: beatmapData[]をテーブルデータに変換する処理
    });
  }

  return (
    <>
      <div>
        <TimeLine>
          <TimeLineContent
            title="Load DB files"
            isAchieve={isLoadDBCompleted}>
            <div>
              <UploadFile
                setOsuDB={setOsuDB}
                setOsuCollectionDB={setOsuCollectionDB}
              />
              <p className="m-1 text-end text-sm">
                <span className={osuDB ? "text-green-400" : "text-red-400"}>
                  osu!.db
                </span>{" "}
                /{" "}
                <span
                  className={
                    osuCollectionDB ? "text-green-400" : "text-red-400"
                  }>
                  collection.db
                </span>
              </p>
            </div>
          </TimeLineContent>

          <TimeLineContent
            title="Select collection"
            isAchieve={selectedCollectionIndex == -1 ? false : true}>
            <div>
              <SelectCollectionDropdown
                isDBLoadCompleted={isLoadDBCompleted}
                osuCollectionDB={osuCollectionDB}
                selectedCollectionIndex={selectedCollectionIndex}
                setSelectedCollectionIndex={setSelectedCollectionIndex}
              />
              <div className="m-4 text-center">
                <ApplyButton onClick={fetchScoreData}>Apply</ApplyButton>
              </div>
            </div>
          </TimeLineContent>

          <TimeLineContent title="The display completed">
            <div className="m-12 text-center">
              <ApplyButton onClick={() => {}}>View collection list</ApplyButton>
            </div>
          </TimeLineContent>
        </TimeLine>
      </div>

      <NotifyToasts />
    </>
  );
};

export default MainScreen;
