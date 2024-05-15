import Icon from "../../../components/Icon/Icon";
import { useLogoutUser } from "../../../hooks/useUsers";

const Logout = () => {
  const {
    handleLogout
  } = useLogoutUser();

  return <div
    className="flex justify-center gap-4 cursor-pointer hover:bg-zinc-50 transition-all duration-300 rounded-lg p-3"
    onClick={() => handleLogout()}
  >
    <div className="font-semibold text-zinc-500">Log out</div>
    <Icon iconName="ArrowRightStartOnRectangleIcon" iconClassName="w-5 text-zinc-500" type="solid"/>
  </div>
};

export default Logout;