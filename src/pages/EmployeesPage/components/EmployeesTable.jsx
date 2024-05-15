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
    console.log('handlePageClick', offset)
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
      <div className={"overflow-auto h-[calc(100vh-20rem)] " + (isLoading ? "hidden" : "")}>
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {
            employees.map((employee, i) => {
              return <div key={i} className="h-auto max-w-full rounded-lg p-3 shadow-sm border border-zinc-100 box-border bg-zinc-50">
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
                  <div className="flex flex-col h-full">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full w-[80px] h-[80px] overflow-hidden flex items-center justify-center shadow-lg">
                        {
                          employee.image
                            ? <img className="object-cover w-[80px] h-[80px]" src={employee.image}></img>
                            : <Icon iconName="CameraIcon" iconClassName="w-12 text-zinc-300" type="solid" />
                        }
                      </div>
                      <div className="mt-3 font-semibold text-zinc-800 text-xl">
                        <div className="text-center">
                          {employee.firstName} {employee.lastName}
                        </div>
                      </div>
                      <div className="truncate text-lg text-center text-zinc-400 font-medium" title={employee.position}>
                        {employee.position}
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1 justify-start font-semibold text-zinc-600 text-sm" title={employee.username}>
                      <Icon iconName="AtSymbolIcon" iconClassName="w-5 text-zinc-300" type="solid" />
                      <div className="truncate">
                        {employee.username}
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
        <div className={"flex justify-center mt-6 " + (isLoading ? "hidden" : "")}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
    </>
  )
}

export default EmployeesTable;