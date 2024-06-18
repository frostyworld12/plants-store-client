import { useSupplyRequestSupplier } from '../../../hooks/useSupplyRequest';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Table from '../../../components/Table/Table';

const SupplyTable = ({ onSelect = () => { }, isApprovedByEmployee = false, isNeedUpdate = false }) => {
  const {
    isLoading,
    pageSize,
    totalCount,
    handleSelectPage,
    getRequestsFormattedData
  } = useSupplyRequestSupplier(isApprovedByEmployee, isNeedUpdate, onSelect);

  return (
    <>
      {
        isLoading && <div className='flex items-center justify-center h-[calc(100vh-20rem)]'>
          <LoadingSpinner color='fill-zinc-600' />
        </div>
      }
      <div className={'overflow-auto h-[calc(100vh-20rem)] max-w-[calc(100vw-30rem)] ' + (isLoading ? 'hidden' : '')}>
        <Table
          objects={getRequestsFormattedData()}
          noImageIcon='DocumentCheckIcon'
          selectedItemLink='/home/supplies/'
        />
      </div>
      {
        <div className={'flex justify-center mt-6 ' + (isLoading || !totalCount ? 'hidden' : '')}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handleSelectPage}></Pagination>
        </div>
      }
    </>
  )
}

export default SupplyTable;