import { useState } from "react";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import EmployeesTable from "./components/EmployeesTable";
import EmployeeModal from "./components/EmployeeModal";
import Input from "../../components/Input/Input";

const EmployeesPage = () => {
  const [isProcessingEmployee, setIsProcessingEmployee] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [currentData, setCurrentData] = useState({});
  const [query, setQuery] = useState('');

  const handleRecord = (employee, action) => {
    const data = {
      employee: employee,
      action: action
    }
    setCurrentData(data);
    setIsNeedUpdate(false);
    setIsProcessingEmployee(true);
  };

  const handleCloseModal = () => {
    setIsProcessingEmployee(false);
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
        <ButtonIcon type="outline" iconName="PlusIcon" title="Create Employee" onClick={() => handleRecord({}, 'new')}/>
      </PageHeader>

      <EmployeesTable
        searchQuery={query}
        isNeedUpdate={isNeedUpdate}
        onRecordEdit={(data) => handleRecord(data, 'edit')}
        onRecordRemove={(data) => handleRecord(data, 'remove')}
      />

      <EmployeeModal state={isProcessingEmployee} onClose={handleCloseModal} data={currentData} />

    </PageContainer>
  )
};

export default EmployeesPage;