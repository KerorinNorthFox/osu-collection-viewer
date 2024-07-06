"use client";
import { OsuCollectionDB } from "@/lib/types/external";
import { Dropdown, DropdownItem } from "flowbite-react";

interface SelectCollectionDropdownProps {
  isLoadDBCompleted: boolean;
  osuCollectionDB: OsuCollectionDB | null;
  selectedCollectionIndex: number;
  setSelectedCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCollectionDropdown = (props: SelectCollectionDropdownProps) => {
  const {
    isLoadDBCompleted,
    osuCollectionDB,
    selectedCollectionIndex,
    setSelectedCollectionIndex,
  } = props;

  return (
    <div className="h-14 flex border rounded-lg items-center">
      <div className="">
        <button
          type="button"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true">
          <div className="p-4 flex items-center">
            <span>Select</span>
            <svg
              className="w-2.5 h-2.5 ms-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </div>
        </button>
        {/* <Dropdown
          label="Select"
          placement="right"
          inline>
          {osuCollectionDB?.collection.map((item, i) => {
            return (
              <DropdownItem onClick={() => setSelectedCollectionIndex(i)}>
                {item.name}
              </DropdownItem>
            );
          })}
        </Dropdown> */}
      </div>
      {/* <hr className="w-[1px] h-full bg-gray-200 border-0" />
      <div className="p-4">
        <p>{selectedCollectionIndex}</p>
        <p>{osuCollectionDB?.collection[selectedCollectionIndex].name}</p>
      </div> */}
      <div
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex={-1}>
        <div
          className="py-1"
          role="none">
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-0">
            Account settings
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-1">
            Support
          </a>
          <a
            href="#"
            className="block px-4 py-2 text-sm text-gray-700"
            role="menuitem"
            tabIndex={-1}
            id="menu-item-2">
            License
          </a>
          <form
            method="POST"
            action="#"
            role="none">
            <button
              type="submit"
              className="block w-full px-4 py-2 text-left text-sm text-gray-700"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-3">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectCollectionDropdown;
