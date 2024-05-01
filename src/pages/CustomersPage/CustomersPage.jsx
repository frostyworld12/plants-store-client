import { useState } from "react";
import { Toaster } from "react-hot-toast";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import CustomersTable from "./components/CustomersTable";
import CustomerModal from "./components/CustomerModal";
import Input from "../../components/Input/Input";

const CustomersPage = () => {
  const [isProcessingCustomer, setIsProcessingCustomer] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [currentData, setCurrentData] = useState({});
  const [query, setQuery] = useState('');

  const handleRecord = (customer, action) => {
    const data = {
      customer: customer,
      action: action
    }
    setCurrentData(data);
    setIsNeedUpdate(false);
    setIsProcessingCustomer(true);
  };

  const handleCloseModal = () => {
    setIsProcessingCustomer(false);
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

      <CustomersTable
        searchQuery={query}
        isNeedUpdate={isNeedUpdate}
        onRecordEdit={(data) => handleRecord(data, 'edit')}
        onRecordRemove={(data) => handleRecord(data, 'remove')}
      />

      <CustomerModal state={isProcessingCustomer} onClose={handleCloseModal} data={currentData} />

      <Toaster />
    </PageContainer>
  )
};

export default CustomersPage;