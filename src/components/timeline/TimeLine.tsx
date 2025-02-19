"use client";

interface TimeLineProps {
  children: React.ReactNode;
}

const TimeLine = (props: TimeLineProps) => {
  const { children } = props;

  return (
    <ol className="m-4 ps-4 relative border-s border-gray-300 dark:border-gray-600">
      {children}
    </ol>
  );
};

export default TimeLine;
