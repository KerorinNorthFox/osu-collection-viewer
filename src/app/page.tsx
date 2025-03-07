import MainScreen from "@/components/screens/MainScreen";
import NotificationBannerScreen from "@/components/screens/NotificationBannerScreen";
import OsuTokenProvider from "@/components/store/OsuTokenProvider";
import issueToken from "@/lib/fetch/issueToken";

const Home = async () => {
  let token: string;
  try {
    token = await getToken();
  } catch (e) {
    // トークンが取得できなかった時のエラー画面
    return (
      <div className="w-full h-full flex justify-center items-center">
        <div className="text-center">
          <p>505 : Internal Server Error</p>
          <p>
            Please report at{" "}
            <a
              href="https://x.com/KerorinNF222"
              className="text-blue-500 underline">
              developer
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <OsuTokenProvider token={token}>
      <NotificationBannerScreen>
        <MainScreen />
      </NotificationBannerScreen>
    </OsuTokenProvider>
  );
};

export default Home;

async function getToken(): Promise<string> {
  const osuClientId = process.env.OSU_CLIENT_ID;
  const osuClientSecret = process.env.OSU_CLIENT_SECRET;
  const osuRedirectUrl = process.env.OSU_REDIRECT_URL;

  if (
    typeof osuClientId === "undefined" ||
    typeof osuClientSecret === "undefined" ||
    typeof osuRedirectUrl === "undefined"
  ) {
    throw new Error("Some env is undefined.");
  }

  let token: { access_token: string } = await issueToken(
    parseInt(osuClientId),
    osuClientSecret,
    osuRedirectUrl,
  );
  return token.access_token;
}
