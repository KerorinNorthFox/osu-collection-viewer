"use client";
import { createContext, useContext } from "react";

const OsuTokenContext = createContext("");

interface OsuTokenProviderProps {
  token: string;
  children: React.ReactNode;
}

// osu!apiの認証トークンをグローバルに提供するプロバイダ
const OsuTokenProvider = (props: OsuTokenProviderProps) => {
  const { token, children } = props;

  return (
    <OsuTokenContext.Provider value={token}>
      {children}
    </OsuTokenContext.Provider>
  );
};

export default OsuTokenProvider;

export const useOsuToken = () => useContext(OsuTokenContext);
