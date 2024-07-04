import HomeScreen from "@/components/screens/HomeScreen";
import OsuTokenProvider from "@/components/store/OsuTokenProvider";
import { getToken } from "@/lib/fetch";

const Home = async () => {
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

  let token: { access_token: string };
  try {
    token = await getToken(
      parseInt(osuClientId),
      osuClientSecret,
      osuRedirectUrl,
    );
    // トークンが取得できなかった時のエラー画面
  } catch (e) {
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
    <OsuTokenProvider token={token.access_token}>
      <HomeScreen />
    </OsuTokenProvider>
  );
};

export default Home;
