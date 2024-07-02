"use client";
import { FileInput, Label } from "flowbite-react";
import { useState } from "react";

const UploadFile = () => {
  const [isDropzoneDisabled, setIsDropzoneDisabled] = useState(false);
  const [isOpenLoadingModal, setIsOpenLoadingModal] = useState(false);
  const [loadingFileName, setLoadingFileName] = useState("");

  function onDrop(files: FileList | null) {
    if (files == null) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // osu!.dbかcollection.db以外を弾く
      if (!file.name.match("^(osu!|collection).db$")) {
        alert(
          `The file is incorrect: ${file.name}\nPlease select osu!.db and collection.db.`,
        );
        return;
      }
      setLoadingFileName(file.name);

      console.log(`The file ${file.name} is correct;`);
    }
  }

  return (
    <div className="m-4">
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
            <p className="text-lg font-semibold">Osu!.db and collection.db</p>
          </div>
          <FileInput
            id="dropzone-file"
            className="hidden"
            multiple
            disabled={isDropzoneDisabled}
            onChange={(e) => {
              setIsOpenLoadingModal(true);
              setIsDropzoneDisabled(true);
              onDrop(e.currentTarget.files);
              setIsOpenLoadingModal(false);
              setIsDropzoneDisabled(false);
            }}
          />
        </Label>
      </div>
    </div>
  );
};

export default UploadFile;
