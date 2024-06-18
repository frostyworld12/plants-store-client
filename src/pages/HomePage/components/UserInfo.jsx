import { useContext } from "react";
import Icon from "../../../components/Icon/Icon";
import Notification from "../../../components/Notification/Notification";
import { AuthContext } from "../../../utility/contexts";

const UserInfo = () => {
  const currentUser = useContext(AuthContext);
  const userData = currentUser ? {
    ...currentUser[currentUser?.user?.role?.toLowerCase()],
    user: currentUser.user
  } : {};

  return <>
    <div
      className="flex gap-3 items-center hover:bg-zinc-50 transition-all duration-300 rounded-lg p-3"
    >
      <div
        className="rounded-full w-[60px] h-[60px] overflow-hidden flex items-center justify-center shadow-lg bg-white"
      >
        {
          userData.image
            ? <img className="object-cover w-[60px] h-[60px]" src={userData.image}></img>
            : <Icon iconName={userData?.user?.role === 'Supplier' ? "BuildingOfficeIcon" : "CameraIcon"} iconClassName="w-[40px] text-zinc-300" type="solid" />
        }
      </div>
      <div className="flex-col">
        {
          userData?.user?.role === 'Supplier'
            ? <>
              <div className="text-lg font-semibold text-zinc-800">{userData.name}</div>
              <div className="text-sm font-semibold text-zinc-500">{userData.contactPerson}</div>
            </>
            : <>
              <div className="text-lg font-semibold text-zinc-800">{userData.firstName} {userData.lastName}</div>
              <div className="text-sm font-semibold text-zinc-500">{userData.position}</div>
            </>
        }
      </div>
      <Notification currentUser={userData}/>
    </div>
  </>

};

export default UserInfo;