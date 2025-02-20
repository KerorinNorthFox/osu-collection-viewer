"use client";
import { useState } from "react";
import { Button } from "@headlessui/react";

interface ApplyButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
const ApplyButton = (props: ApplyButtonProps) => {
  const { children, onClick } = props;

  const [isClick, setIsClick] = useState(false);

  return (
    <Button
      className={`px-12 py-3 bg-transparent hover:bg-pink-400 border border-gray-900 dark:border-white text-light-text dark:text-dark-text hover:text-dark-text shadow-md rounded-full duration-50 ${
        isClick && "scale-[.95]"
      }`}
      onMouseDown={() => setIsClick(true)}
      onMouseUp={() => setIsClick(false)}
      onClick={onClick}>
      {children}
    </Button>
  );
};

export default ApplyButton;
