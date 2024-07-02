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

  let token = await getToken(
    parseInt(osuClientId),
    osuClientSecret,
    osuRedirectUrl,
  );

  return (
    <OsuTokenProvider token={token.access_token}>
      <HomeScreen />
    </OsuTokenProvider>
  );
};

export default Home;
