import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../utility/contexts';

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import Toggle from '../../components/Toggle/Toggle';
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import SupplieModal from "./components/SupplieModal";
import SupplyTable from "./components/SupplyTable";

const SuppliesPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);

  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  const handleProcessRecord = (request, action) => {
    setIsNeedUpdate(false);
    setCurrentData({
      request: request,
      action: currentUser.user.role === 'Employee' ? 'sign' : action
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = (isNeedUpdate) => {
    navigate('/home/supplies');
    setIsNeedUpdate(isNeedUpdate);
    setIsModalOpen(false);
  };

  const handleQuery = (value) => {
    setQuery(value);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Toggle label={currentUser?.user?.role === 'Supplier' ? 'Approved by employee' : 'Approved'} value={query} onChange={handleQuery} />
        {
          currentUser?.user?.role !== 'Employee' &&
          <ButtonIcon type='outline' iconName='PlusIcon' title='Create Product' onClick={() => handleProcessRecord({}, 'new')} />
        }
      </PageHeader>

      <SupplyTable
        isNeedUpdate={isNeedUpdate}
        isApprovedByEmployee={query}
        onSelect={(request) => handleProcessRecord(request, 'view')}
      />

      {isModalOpen && <SupplieModal onClose={handleCloseModal} data={currentData} />}
    </PageContainer>
  )
};

export default SuppliesPage;