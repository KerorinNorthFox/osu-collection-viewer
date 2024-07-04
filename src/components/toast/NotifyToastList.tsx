"use client";
import NotifyToast, { NotifyToastContent } from "./NotifyToast";

interface NotifyToastListProps {
  notifyToastList: NotifyToastContent[];
  setNotifyToastList: React.Dispatch<
    React.SetStateAction<NotifyToastContent[]>
  >;
}

const NotifyToastList = (props: NotifyToastListProps) => {
  const { notifyToastList, setNotifyToastList } = props;

  const removeToast = (id: string) => {
    setNotifyToastList((prev) => prev.filter((toast) => toast.uniqueId !== id));
  };

  return (
    <div className="absolute right-0 bottom-0">
      <ul className="p-4 space-y-4">
        {notifyToastList.map((item) => {
          return (
            <li key={item.uniqueId}>
              {
                <NotifyToast
                  uniqueId={item.uniqueId}
                  text={item.text}
                  level={item.level}
                  onClose={removeToast}
                />
              }
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotifyToastList;