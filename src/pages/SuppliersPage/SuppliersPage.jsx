import { useState } from "react";
import { Toaster } from "react-hot-toast";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import SuppliersTable from "./components/SuppliersTable";
import SupplierModal from "./components/SupplierModal";
import Input from "../../components/Input/Input";

const SuppliersPage = () => {
  const [isProcessingSupplier, setIsProcessingSupplier] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [currentData, setCurrentData] = useState({});
  const [query, setQuery] = useState('');

  const handleRecord = (supplier, action) => {
    const data = {
      supplier: supplier,
      action: action
    }
    setCurrentData(data);
    setIsNeedUpdate(false);
    setIsProcessingSupplier(true);
  };

  const handleCloseModal = () => {
    setIsProcessingSupplier(false);
    setIsNeedUpdate(true);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <PageContainer>
      <PageHeader>
        <div className="w-2/5">
          <Input iconName="MagnifyingGlassIcon" classType="bare" value={query} onChange={handleQuery}></Input>
        </div>
        <ButtonIcon type="outline" iconName="PlusIcon" title="Add Supplie" onClick={() => handleRecord({}, 'new')}/>
      </PageHeader>

      <SuppliersTable
        searchQuery={query}
        isNeedUpdate={isNeedUpdate}
        onRecordEdit={(data) => handleRecord(data, 'edit')}
        onRecordRemove={(data) => handleRecord(data, 'remove')}
      />

      <SupplierModal state={isProcessingSupplier} onClose={handleCloseModal} data={currentData} />

      <Toaster />
    </PageContainer>
  )
};

export default SuppliersPage;