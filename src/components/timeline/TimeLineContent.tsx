"use client";
interface TimeLineContentProps {
  title: string;
  isAchieve?: boolean;
  children: React.ReactNode;
}

const TimeLineContent = (props: TimeLineContentProps) => {
  const { title, isAchieve = false, children } = props;

  return (
    <li>
      <div className="absolute w-3 h-3 bg-gray-300 rounded-full mt-2 -start-1.5 border border-light-bg dark:border-dark-bg dark:bg-gray-600"></div>
      <p
        className={`mx-2 my-4 text-xl font-bold ${isAchieve ? "text-green-400" : "text-light-text dark:text-dark-text"}`}>
        {title}
      </p>
      {children}
    </li>
  );
};

export default TimeLineContent;
