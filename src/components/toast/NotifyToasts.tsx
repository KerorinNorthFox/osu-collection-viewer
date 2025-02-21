"use client";
import {
  useNotifyToasts,
  useSetNotifyToasts,
} from "../store/NotifyToastsProvider";
import NotifyToast from "./NotifyToast";

const NotifyToasts = () => {
  const notifyToasts = useNotifyToasts();
  const setNotifyToasts = useSetNotifyToasts();

  function removeToast(id: string) {
    setNotifyToasts((prev) => prev.filter((toast) => toast.uniqueId !== id));
  }

  return (
    <div className="max-w-xs absolute right-4 bottom-4">
      <ul className="space-y-4">
        {notifyToasts.map((item) => {
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

export default NotifyToasts;
