"use client";
import UploadFile from "@/components/UploadFile";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { useEffect, useState } from "react";
import TimeLine from "@/components/timeline/TimeLine";
import TimeLineContent from "@/components/timeline/TimeLineContent";
import { NotifyToastContent } from "@/components/toast/NotifyToast";
import NotifyToastList from "@/components/toast/NotifyToastList";
import { logger } from "@/lib/logger/logger";
import SelectCollectionDropdown from "../SelectCollectionDropdown";
import { Button } from "@headlessui/react";

const HomeScreen = () => {
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isLoadDBCompleted, setIsLoadDBCompleted] = useState(false);
  // 選択されたコレクションのindex
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(-1);
  // 右下の通知のリスト
  const [notifyToastList, setNotifyToastList] = useState<
    Array<NotifyToastContent>
  >([]);

  useEffect(() => {
    if (osuDB !== null && osuCollectionDB !== null) {
      logger.log("DB両方の読み込み完了");
      setIsLoadDBCompleted(true);
      return;
    }
    setIsLoadDBCompleted(false);
  }, [osuDB, osuCollectionDB]);

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
                notifyToastList={notifyToastList}
                setNotifyToastList={setNotifyToastList}
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
                <Button
                  className="px-12 py-3 font-bold bg-green-400 text-dark-text rounded-full"
                  onClick={() => {}}>
                  Apply
                </Button>
              </div>
            </div>
          </TimeLineContent>
          <TimeLineContent title="The display completed">
            <div></div>
          </TimeLineContent>
        </TimeLine>
      </div>
      <NotifyToastList
        notifyToastList={notifyToastList}
        setNotifyToastList={setNotifyToastList}
      />
    </>
  );
};

export default HomeScreen;
