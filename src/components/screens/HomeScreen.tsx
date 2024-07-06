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

const HomeScreen = () => {
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isLoadDBCompleted, setIsLoadDBCompleted] = useState(false);
  const [isOpenSelectCollectionModal, setIsOpenSelectCollectionModal] =
    useState(false);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(-1);

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
            <UploadFile
              osuDB={osuDB}
              setOsuDB={setOsuDB}
              osuCollectionDB={osuCollectionDB}
              setOsuCollectionDB={setOsuCollectionDB}
              notifyToastList={notifyToastList}
              setNotifyToastList={setNotifyToastList}
            />
          </TimeLineContent>
          <TimeLineContent title="Select collection">
            <SelectCollectionDropdown
              osuCollectionDB={osuCollectionDB}
              selectedCollectionIndex={selectedCollectionIndex}
              setSelectedCollectionIndex={setSelectedCollectionIndex}
            />
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
