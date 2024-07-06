"use client";
import { OsuCollectionDB } from "@/lib/types/external";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface SelectCollectionDropdownProps {
  osuCollectionDB: OsuCollectionDB | null;
  selectedCollectionIndex: number;
  setSelectedCollectionIndex: React.Dispatch<React.SetStateAction<number>>;
}

const SelectCollectionDropdown = (props: SelectCollectionDropdownProps) => {
  const {
    osuCollectionDB,
    selectedCollectionIndex,
    setSelectedCollectionIndex,
  } = props;

  return (
    <div className="h-14 flex border rounded-lg items-center">
      <div className="">
        <Menu>
          <MenuButton>
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
          </MenuButton>
          <MenuItems
            transition
            anchor="bottom start"
            className="w-52 origin-top-right rounded-lg border p-1 text-sm/6 bg-gray-700 bg-opacity-50 border-gray-600 text-white transition duration-100 ease-out [--anchor-gap:var(--spacing-1)] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0">
            {osuCollectionDB?.collection.map((item, i) => {
              return (
                <MenuItem>
                  <button
                    className="group flex w-full items-center py-1 px-2 hover:bg-hover"
                    onClick={() => setSelectedCollectionIndex(i)}>
                    {item.name}
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
