"use client";
import React, { createContext, useContext } from "react";
import { NotifyToastContent } from "../toast/NotifyToast";

const NotifyToastsContext = createContext<Array<NotifyToastContent>>([]);

const SetNotifyToastsContext = createContext<
  React.Dispatch<React.SetStateAction<NotifyToastContent[]>>
>(() => {});

interface NotifyToastsProviderProps {
  notifyToasts: Array<NotifyToastContent>;
  setNotifyToasts: React.Dispatch<React.SetStateAction<NotifyToastContent[]>>;
  children: React.ReactNode;
}

export const NotifyToastsProvider = (props: NotifyToastsProviderProps) => {
  const { notifyToasts, setNotifyToasts, children } = props;

  return (
    <NotifyToastsContext.Provider value={notifyToasts}>
      <SetNotifyToastsContext.Provider value={setNotifyToasts}>
        {children}
      </SetNotifyToastsContext.Provider>
    </NotifyToastsContext.Provider>
  );
};

export const useNotifyToasts = () => useContext(NotifyToastsContext);

export const useSetNotifyToasts = () => useContext(SetNotifyToastsContext);
