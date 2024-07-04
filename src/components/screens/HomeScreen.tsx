"use client";
import UploadFile from "@/components/UploadFile";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { useEffect, useState } from "react";
import TimeLine from "@/components/timeline/TimeLine";
import TimeLineContent from "@/components/timeline/TimeLineContent";
import { NotifyToastContent } from "@/components/toast/NotifyToast";
import NotifyToastList from "@/components/toast/NotifyToastList";

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
