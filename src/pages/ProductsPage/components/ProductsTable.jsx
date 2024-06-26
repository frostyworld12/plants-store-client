import { useProducts } from '../../../hooks/useProducts';
import Pagination from '../../../components/Pagination/Pagination';
import LoadingSpinner from '../../../components/LoadingSpinner/LoadingSpinner';
import Table from '../../../components/Table/Table';

const ProductsTable = ({ onSelect = () => { }, searchQuery = '', isNeedUpdate = false }) => {
  const {
    isLoading,
    pageSize,
    totalCount,
    fetchProducts,
    getProductsFormattedData
  } = useProducts(searchQuery, isNeedUpdate, onSelect);

  const handlePageClick = async (offset) => {
    await fetchProducts(offset - 1);
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
          objects={getProductsFormattedData()}
          noImageIcon='ArchiveBoxIcon'
          selectedItemLink='/home/products/'
        />
      </div>
      {
        <div className={'flex justify-center mt-6 ' + (isLoading || !totalCount ? 'hidden' : '')}>
          <Pagination totalCount={totalCount} pageSize={pageSize} onPageClick={handlePageClick}></Pagination>
        </div>
      }
    </>
  )
}

export default ProductsTable;