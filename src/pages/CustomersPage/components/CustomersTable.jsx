import Pagination from "../../../components/Pagination/Pagination";
import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import DropDown from "../../../components/DropDown/DropDown";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Icon from "../../../components/Icon/Icon";

import { useDropDown } from "../../../hooks/useDropDown";
import { useCustomers } from "../../../hooks/useCustomers";

const CustomersTable = ({ onRecordEdit = () => { }, onRecordRemove = () => { }, searchQuery = '', isNeedUpdate = false }) => {
  const {
    isLoading,
    customers,
    currentCustomer,
    setCurrentCustomer,
    processCustomers,
    pageSize,
    setOffset,
    totalCount
  } = useCustomers(searchQuery, isNeedUpdate);

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
    await processCustomers();
  };

  const handleDropDown = (state, customerId) => {
    handleOpenDropDown(state);
    if (customerId) {
      setCurrentCustomer({ id: customerId });
    }
  };

  return (
    <>
      {
        isLoading && <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
          <LoadingSpinner color="fill-zinc-600" />
        </div>
      }
      <div className={"overflow-y-auto h-[calc(100vh-20rem)] " + (isLoading || customers.length === 0 ? "hidden" : "")}>
        <div className="flex flex-wrap gap-2">
          {
            customers.map((customer, i) => {
              return <div key={i} className="flex flex-col rounded-lg p-3 shadow-sm border border-zinc-100 box-border m-1 w-72">
                <div className="flex justify-end z-20">
                  <ButtonIcon type="bare" iconName="EllipsisHorizontalIcon" title="More" onClick={() => handleDropDown(false, customer.id)} />
                </div>
                {(!isDropDownHidden && currentCustomer.id === customer.id) && <DropDown items={actions} data={customer} onBlankClick={() => handleDropDown(true)} />}
                <div className="font-semibold text-zinc-800 text-2xl text-center">
                  {customer.firstName} {customer.lastName}
                </div>
                <div className="text-zinc-800 text-lg text-center">
                  {customer.email}
                </div>
                <div className="mt-3 text-zinc-700 flex gap-2">
                  <Icon iconName="PhoneIcon" iconClassName="w-5 text-zinc-300" type="solid"/>
                  <div>{customer.phone}</div>
                </div>
                <div className="text-zinc-700 flex gap-2">
                  <Icon iconName="HomeIcon" iconClassName="w-5 text-zinc-300" type="solid"/>
                  <div>{customer.address}</div>
                </div>
              </div>
            })
          }
        </div>
      </div>
      <div className={"text-xl flex justify-center " + (!isLoading && customers.length === 0 ? "" : "hidden")}>
        No records found
      </div>
      {
        <div className={"flex justify-center mt-6 " + (isLoading || customers.length === 0 ? "hidden" : "")}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
    </>
  )
}

export default CustomersTable;