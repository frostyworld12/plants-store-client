import { useEmployees } from "../../../hooks/useEmployees";
import Pagination from "../../../components/Pagination/Pagination";
import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import DropDown from "../../../components/DropDown/DropDown";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Icon from "../../../components/Icon/Icon";

import { useDropDown } from "../../../hooks/useDropDown";

const EmployeesTable = ({ onRecordEdit = () => { }, onRecordRemove = () => { }, searchQuery = '', isNeedUpdate = false }) => {
  const {
    isLoading,
    employees,
    currentEmployee,
    setCurrentEmployee,
    processEmployees,
    pageSize,
    setOffset,
    totalCount
  } = useEmployees(searchQuery, isNeedUpdate);

  const {
    isDropDownHidden,
    handleOpenDropDown
  } = useDropDown();

  const actions = [
    { title: 'Edit', value: 'Edit', action: onRecordEdit },
    { title: 'Delete', value: 'Delete', action: onRecordRemove }
  ]

  const handlePageClick = async (offset) => {
    setOffset(offset);
    await processEmployees();
  };

  const handleDropDown = (state, userId) => {
    handleOpenDropDown(state);
    if (userId) {
      setCurrentEmployee({ userId: userId });
    }
  };

  return (
    <>
      {
        isLoading && <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
          <LoadingSpinner color="fill-zinc-600" />
        </div>
      }
      <div className={"overflow-y-auto h-[calc(100vh-20rem)] " + (isLoading || !employees.length ? "hidden" : "")}>
        <div className="flex flex-wrap gap-2">
          {
            employees.map((employee, i) => {
              return <div key={i} className="rounded-lg p-3 shadow-sm border border-zinc-100 box-border m-1 w-[230px] h-[255px]">
                <div className="h-full flex flex-col">
                  <div className="flex justify-end z-20">
                    <ButtonIcon type="bare" iconName="EllipsisHorizontalIcon" title="More" onClick={() => handleDropDown(false, employee.userId)} />
                  </div>
                  {
                    (!isDropDownHidden && currentEmployee.userId === employee.userId) &&
                    <DropDown
                      items={actions}
                      data={employee}
                      onBlankClick={() => handleDropDown(true)}
                    />
                  }
                  <div className="flex flex-col items-center h-full">
                    <div className="rounded-full w-[80px] h-[80px] overflow-hidden flex items-center justify-center border border-zinc-100">
                      {
                        employee.image
                          ? <img className="object-cover w-[80px] h-[80px]" src={employee.image}></img>
                          : <Icon iconName="CameraIcon" iconClassName="w-12 text-zinc-300" type="solid" />
                      }
                    </div>
                    <div className="mt-auto w-full">
                      <div className="font-semibold text-zinc-800 text-xl h-[56px] flex items-center justify-center">
                        <div className="text-center">
                          {employee.firstName} {employee.lastName}
                        </div>
                      </div>
                      <div className="self-end ">
                        <div className="mt-3 text-zinc-700 flex gap-2">
                          <Icon iconName="AtSymbolIcon" iconClassName="w-5 text-zinc-300" type="solid" />
                          <div className="truncate" title={employee.username}>{employee.username}</div>
                        </div>
                        <div className="text-zinc-700 flex gap-2">
                          <Icon iconName="UserIcon" iconClassName="w-5 text-zinc-300" type="solid" />
                          <div className="truncate" title={employee.position}>{employee.position}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            })
          }
        </div>
      </div>
      {
        <div className={"flex justify-center mt-6 " + (isLoading || !employees.length ? "hidden" : "")}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
    </>
  )
}

export default EmployeesTable;