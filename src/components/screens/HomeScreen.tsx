"use client";
import UploadFile from "@/components/UploadFile";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { useEffect, useState } from "react";
import TimeLine from "../timeline/TimeLine";
import TimeLineContent from "../timeline/TimeLineContent";

const HomeScreen = () => {
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isLoadDBCompleted, setIsLoadDBCompleted] = useState(false);
  const [isOpenSelectCollectionModal, setIsOpenSelectCollectionModal] =
    useState(false);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(-1);

  useEffect(() => {
    if (osuDB !== null && osuCollectionDB !== null) {
      setIsLoadDBCompleted(true);
      return;
    }
    setIsLoadDBCompleted(false);
  }, [osuDB, osuCollectionDB]);

  return (
    <div>
      <TimeLine>
        <TimeLineContent
          title="Load DB files"
          isAchieve={isLoadDBCompleted}>
          <UploadFile
            osuDB={osuDB}
            osuCollectionDB={osuCollectionDB}
            setOsuDB={setOsuDB}
            setOsuCollectionDB={setOsuCollectionDB}
          />
        </TimeLineContent>
        <TimeLineContent
          title="Select collection"
          isAchieve={false}>
          <div></div>
        </TimeLineContent>
      </TimeLine>
    </div>
  );
};

export default HomeScreen;
