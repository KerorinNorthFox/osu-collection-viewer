"use client";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { OsuCollectionDB } from "@/lib/types/external";

interface SelectCollectionDropdownProps {
  isDBLoadCompleted: boolean;
  osuCollectionDB: OsuCollectionDB | null;
  selectedCollectionIndex: number;
  setSelectedCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCollectionDropdown = (props: SelectCollectionDropdownProps) => {
  const {
    isDBLoadCompleted,
    osuCollectionDB,
    selectedCollectionIndex,
    setSelectedCollectionIndex,
  } = props;

  return (
    <div className="h-14 flex border rounded-lg items-center">
      <div className="">
        <Menu>
          <MenuButton
            disabled={!isDBLoadCompleted}
            className={`rounded-l-lg ${isDBLoadCompleted && "hover:bg-hover"}`}>
            <div
              className={`p-4 flex items-center ${!isDBLoadCompleted && "text-gray-400"}`}>
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
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom start"
            className="w-64 h-64 p-1 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
            {osuCollectionDB?.collection.map((item, i) => {
              return (
                <MenuItem>
                  <button
                    className="group flex w-full items-center py-1 px-2 hover:bg-hover"
                    onClick={() => setSelectedCollectionIndex(i)}>
                    <span className="text-sm text-light-text dark:text-dark-text">
                      {item.name}
                    </span>
                  </button>
                </MenuItem>
              );
            })}
          </MenuItems>
        </Menu>
      </div>
      <hr className="w-[1px] h-full bg-gray-200 border-0" />
      <div className="p-4">
        {selectedCollectionIndex != -1 ? (
          <p>{osuCollectionDB?.collection[selectedCollectionIndex].name}</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default SelectCollectionDropdown;
