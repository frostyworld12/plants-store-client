import { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import SupplyRequestModal from "./components/SupplyRequestModal";
import SupplyRequestsTable from './components/SupplyRequestsTable';
import Toggle from '../../components/Toggle/Toggle';
import { AuthContext } from '../../utility/contexts';

const SupplyRequestPage = () => {
  const [query, setQuery] = useState(false);
  const [currentData, setCurrentData] = useState({});
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const currentUser = useContext(AuthContext);

  const handleProcessRecord = (request, action) => {
    setIsNeedUpdate(false);
    setCurrentData({
      request: request,
      action: currentUser.user.role === 'Supplier' ? 'sign' : action
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = (isNeedUpdate) => {
    navigate('/home/supplyrequest');
    setIsNeedUpdate(isNeedUpdate);
    setIsModalOpen(false);
  };

  const handleQuery = (value) => {
    setQuery(value);
  };

  return (
    <PageContainer>
      <PageHeader>
        <Toggle label={currentUser?.user?.role !== 'Supplier' ? 'Approved by supplier' : 'Approved'} value={query} onChange={handleQuery} />
        {
          currentUser?.user?.role !== 'Supplier' &&
          <ButtonIcon type='outline' iconName='PlusIcon' title='Create Product' onClick={() => handleProcessRecord({}, 'new')} />
        }
      </PageHeader>

      <SupplyRequestsTable
        isNeedUpdate={isNeedUpdate}
        isApprovedBySupplier={query}
        onSelect={(request) => handleProcessRecord(request, 'view')}
      />

      {
        isModalOpen && <SupplyRequestModal onClose={handleCloseModal} data={currentData} />
      }
    </PageContainer>
  );
};

export default SupplyRequestPage;