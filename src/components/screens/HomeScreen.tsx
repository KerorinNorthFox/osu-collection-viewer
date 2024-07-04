"use client";
import UploadFile from "@/components/UploadFile";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { useEffect, useState } from "react";

const HomeScreen = () => {
  const [osuDB, setOsuDB] = useState<OsuDB | null>(null);
  const [osuCollectionDB, setOsuCollectionDB] =
    useState<OsuCollectionDB | null>(null);
  const [isOpenSelectCollectionModal, setIsOpenSelectCollectionModal] =
    useState(false);
  const [selectedCollectionIndex, setSelectedCollectionIndex] = useState(-1);

  return (
    <div>
      <UploadFile
        osuDB={osuDB}
        osuCollectionDB={osuCollectionDB}
        setOsuDB={setOsuDB}
        setOsuCollectionDB={setOsuCollectionDB}
      />
    </div>
  );
};

export default HomeScreen;
