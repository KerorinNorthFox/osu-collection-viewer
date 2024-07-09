"use client";
import { arrayBufferToJson, readFileAsArrayBuffer } from "@/lib/buffer/convert";
import { logger } from "@/lib/logger/logger";
import { OsuCollectionDB, OsuDB } from "@/lib/types/external";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";
import {
  NotifyToastContent,
  NotifyToastLevel,
} from "@/components/toast/NotifyToast";

interface UploadFileProps {
  osuDB: OsuDB | null;
  setOsuDB: React.Dispatch<React.SetStateAction<OsuDB | null>>;
  osuCollectionDB: OsuCollectionDB | null;
  setOsuCollectionDB: React.Dispatch<
    React.SetStateAction<OsuCollectionDB | null>
  >;
  notifyToastList: NotifyToastContent[];
  setNotifyToastList: React.Dispatch<
    React.SetStateAction<NotifyToastContent[]>
  >;
}

const UploadFile = (props: UploadFileProps) => {
  const {
    osuDB,
    setOsuDB,
    osuCollectionDB,
    setOsuCollectionDB,
    notifyToastList,
    setNotifyToastList,
  } = props;
  const [isDropzoneDisabled, setIsDropzoneDisabled] = useState(false);

  async function onDrop(files: FileList | null) {
    if (files == null) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // osu!.dbかcollection.db以外を弾く
      if (!file.name.match("^(osu!|collection).db$")) {
        alert(
          `The file is incorrect: ${file.name}\nPlease select osu!.db and collection.db.`,
        );
        setNotifyToastList([
          ...notifyToastList,
          {
            uniqueId: `toast-${file.name}-${Math.random()}`,
            text: `The file is incorrect: ${file.name}\nPlease select osu!.db and collection.db.`,
            level: NotifyToastLevel.Fail,
          },
        ]);
        return;
      }
      setNotifyToastList([
        ...notifyToastList,
        {
          uniqueId: `toast-${file.name}-${Math.random()}`,
          text: `Loading ${file.name}...`,
          level: NotifyToastLevel.Loading,
        },
      ]);

      logger.log(`The file ${file.name} is correct;`);

      try {
        // バイナリを読み込める形に変換
        const arrBuf = await readFileAsArrayBuffer(file);
        const arrBufJson = arrayBufferToJson(arrBuf);

        const res = await fetch(`/api/db/parser`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(
            Object.assign(arrBufJson, {
              dbType: file.name.match("collection.db") ? "collection" : "osu",
            }),
          ),
        });

        if (!res.ok) {
          alert(`${res.statusText}\nFailed to upload the DB file.`);
          setNotifyToastList([
            ...notifyToastList,
            {
              uniqueId: `toast-${file.name}-${Math.random()}`,
              text: `${res.statusText}\nFailed to upload the DB file.`,
              level: NotifyToastLevel.Fail,
            },
          ]);
          return;
        }

        const data = await res.json();

        if (!data.success) {
          alert("Failed to load the DB.");
          setNotifyToastList([
            ...notifyToastList,
            {
              uniqueId: `toast-${file.name}-${Math.random()}`,
              text: "Failed to load the DB.",
              level: NotifyToastLevel.Fail,
            },
          ]);
          return;
        }
        logger.info(`${file.name} DB loading completed successfully.`);

        if (file.name.match("osu!.db")) {
          setOsuDB(data.data);
        } else if (file.name.match("collection.db")) {
          setOsuCollectionDB(data.data);
        }

        setNotifyToastList([
          ...notifyToastList,
          {
            uniqueId: `toast-${file.name}-${Math.random()}`,
            text: `Loading ${file.name} completed successfully.`,
            level: NotifyToastLevel.Success,
          },
        ]);
      } catch (e) {
        alert(e);
        setNotifyToastList([
          ...notifyToastList,
          {
            uniqueId: `toast-${file.name}-${Math.random()}`,
            text: `${e}`,
            level: NotifyToastLevel.Success,
          },
        ]);
        return;
      }
    }
  }

  return (
    <div>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className="flex h-56 w-full cursor-pointer flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 dark:bg-dark-bg dark:hover:bg-hover">
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <svg
              className="mb-4 h-8 w-8"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm">
              Click or drag and drop to upload{" "}
              <span className="font-bold"></span>
            </p>
            <p className="text-lg font-semibold">osu!.db and collection.db</p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            disabled={isDropzoneDisabled}
            onChange={async (e) => {
              setIsDropzoneDisabled(true);
              await onDrop(e.currentTarget.files);
              setIsDropzoneDisabled(false);
            }}
          />
        </Label>
      </div>
      <p className="m-2 text-end text-sm">
        <span className={osuDB ? "text-green-400" : "text-red-400"}>
          osu!.db
        </span>{" "}
        /{" "}
        <span className={osuCollectionDB ? "text-green-400" : "text-red-400"}>
          collection.db
        </span>
      </p>
    </div>
  );
};

export default UploadFile;
