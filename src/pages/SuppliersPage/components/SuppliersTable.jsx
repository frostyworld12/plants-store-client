import { useSuppliers } from "../../../hooks/useSuppliers";
import Pagination from "../../../components/Pagination/Pagination";
import ButtonIcon from "../../../components/ButtonIcon/ButtonIcon";
import DropDown from "../../../components/DropDown/DropDown";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Icon from "../../../components/Icon/Icon";

import { useDropDown } from "../../../hooks/useDropDown";

const SuppliersTable = ({ onRecordEdit = () => {}, onRecordRemove = () => {}, searchQuery = '', isNeedUpdate = false }) => {
  const {
    isLoading,
    suppliers,
    currentSupplier,
    setCurrentSupplier,
    processSuppliers,
    pageSize,
    setOffset,
    totalCount
  } = useSuppliers(searchQuery, isNeedUpdate);

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
    await processSuppliers();
  };

  const handleDropDown = (state, supplierId) => {
    handleOpenDropDown(state);
    if (supplierId) {
      setCurrentSupplier({ id: supplierId });
    }
  };

  return (
    <>
      {
        isLoading && <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
          <LoadingSpinner color="fill-zinc-600" />
        </div>
      }
      <div className={"overflow-y-auto h-[calc(100vh-20rem)] " + (isLoading ? "hidden" : "")}>
        <div className="flex flex-wrap gap-2">
          {
            suppliers.map((supplier, i) => {
              return <div key={i} className="flex flex-col rounded-lg p-3 shadow-sm border border-zinc-100 box-border m-1 w-72">
                <div className="flex justify-end z-20">
                  <ButtonIcon type="bare" iconName="EllipsisHorizontalIcon" title="More" onClick={() => handleDropDown(false, supplier.id)} />
                </div>
                {(!isDropDownHidden && currentSupplier.id === supplier.id) && <DropDown items={actions} data={supplier} onBlankClick={() => handleDropDown(true)} />}
                <div className="font-semibold text-zinc-800 text-2xl text-center">
                  {supplier.name}
                </div>
                <div className="text-zinc-800 text-lg text-center">
                  {supplier.contactPerson}
                </div>
                <div className="mt-3 text-zinc-700 flex gap-2">
                  <Icon iconName="AtSymbolIcon" iconClassName="w-5 text-zinc-300" type="solid"/>
                  <div>{supplier.email}</div>
                </div>
                <div className="text-zinc-700 flex gap-2">
                  <Icon iconName="PhoneIcon" iconClassName="w-5 text-zinc-300" type="solid"/>
                  <div>{supplier.phone}</div>
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

export default SuppliersTable;