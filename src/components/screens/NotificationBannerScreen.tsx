"use client";
import { useState } from "react";
import { NotifyToastsProvider } from "../store/NotifyToastsProvider";
import { NotifyToastContent } from "../toast/NotifyToast";

interface NotificationBannerScreenProps {
  children: React.ReactNode;
}

const NotificationBannerScreen = (props: NotificationBannerScreenProps) => {
  const { children } = props;
  const [notifyToasts, setNotifyToasts] = useState<Array<NotifyToastContent>>(
    [],
  );

  return (
    <NotifyToastsProvider
      notifyToasts={notifyToasts}
      setNotifyToasts={setNotifyToasts}>
      {children}
    </NotifyToastsProvider>
  );
};

export default NotificationBannerScreen;
