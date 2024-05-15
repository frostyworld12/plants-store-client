import { useSuppliers } from "../../../hooks/useSuppliers";
import Pagination from "../../../components/Pagination/Pagination";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import Table from "../../../components/Table/Table";

const SuppliersTable = ({ searchQuery = '', onSelect = () => {} }) => {
  const {
    isLoading,
    pageSize,
    setOffset,
    totalCount,
    processSuppliers,
    getSuppliersFormattedData,
    handleSelectSupplier
  } = useSuppliers(searchQuery, onSelect);

  const handlePageClick = async (offset) => {
    setOffset(offset);
    await processSuppliers();
  };

  return (
    <>
      {
        isLoading && <div className="flex items-center justify-center h-[calc(100vh-20rem)]">
          <LoadingSpinner color="fill-zinc-600" />
        </div>
      }
      <div className={"overflow-y-auto h-[calc(100vh-20rem)] " + (isLoading ? "hidden" : "")}>
        <Table objects={getSuppliersFormattedData()} onSelect={(id) => handleSelectSupplier(id)}/>
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