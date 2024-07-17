"use client";
import { Button } from "@headlessui/react";
import { useState } from "react";

interface ApplyButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}
const ApplyButton = (props: ApplyButtonProps) => {
  const { onClick, children } = props;
  const [isClick, setIsClick] = useState(false);

  return (
    <Button
      className={`px-12 py-3 bg-transparent hover:bg-pink-400 border border-gray-900 dark:border-white text-light-text dark:text-dark-text hover:text-dark-text rounded-full duration-50 ${
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
