import Icon from "../../../components/Icon/Icon";
import { useCurrentUser } from "../../../hooks/useUsers";
import EmployeeModal from "../../EmployeesPage/components/EmployeeModal";

const UserInfo = () => {
  const {
    userData,
    userDataModal,
    isUserModalOpen,
    handleUserModal
  } = useCurrentUser();

  return <>
    <div
      className="flex gap-3 items-center hover:bg-zinc-50 transition-all duration-300 rounded-lg p-3 cursor-pointer"
    >
      <div
        className="rounded-full w-[60px] h-[60px] overflow-hidden flex items-center justify-center shadow-lg bg-white"
        onClick={() => handleUserModal(true)}
      >
        {
          userData.image
            ? <img className="object-cover w-[60px] h-[60px]" src={userData.image}></img>
            : <Icon iconName={userData.role === 'Supplier' ? "BuildingOfficeIcon" : "CameraIcon"} iconClassName="w-[40px] text-zinc-300" type="solid" />
        }
      </div>
      <div className="flex-col">
        {
          userData.role === 'Supplier'
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
      <Icon iconName="BellIcon" iconClassName="w-6 text-zinc-400" />
    </div>
    <EmployeeModal title="Edit" state={isUserModalOpen} onClose={() => handleUserModal(false)} data={userDataModal} isEmployeeMode={true} />
  </>

};

export default UserInfo;