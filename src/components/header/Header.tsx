import ToggleTheme from "../ToggleTheme";

const Header = () => {
  return (
    <div className="w-screen h-header px-4 fixed shadow-md">
      <div className="h-full flex items-center justify-between">
        <p className="">Osu! FC Checker</p>
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Header;