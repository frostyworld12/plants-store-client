import { useSuppliers } from '../../../hooks/useSuppliers';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Table from '../../../components/Table/Table';

const SuppliersTable = ({ searchQuery = '', onSelect = () => { } }) => {
  const {
    isLoading,
    pageSize,
    setOffset,
    totalCount,
    processSuppliers,
    getSuppliersFormattedData
  } = useSuppliers(searchQuery, onSelect);

  const handlePageClick = async (offset) => {
    setOffset(offset - 1);
    await processSuppliers();
  };

  return (
    <>
      {
        isLoading && <div className='flex items-center justify-center h-[calc(100vh-20rem)]'>
          <LoadingSpinner color='fill-zinc-600' />
        </div>
      }
      <div className={'overflow-auto h-[calc(100vh-20rem)] max-w-[calc(100vw-30rem)] ' + (isLoading ? 'hidden' : '')}>
        <Table
          objects={getSuppliersFormattedData()}
          selectedItemLink="/home/suppliers/"
          noImageIcon='BuildingOfficeIcon'
        />
      </div>
      {
        <div className={'flex justify-center mt-6 ' + (isLoading ? 'hidden' : '')}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
    </>
  )
}

export default SuppliersTable;