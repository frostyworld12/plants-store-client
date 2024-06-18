import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import SuppliersTable from "./components/SuppliersTable";
import SupplierModal from "./components/SupplierModal";
import Input from "../../components/Input/Input";

const SuppliersPage = () => {
  const [query, setQuery] = useState('');
  const [currentData, setCurrentData] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleRecord = (supplier) => {
    setCurrentData({
      supplier: supplier,
      action: 'view'
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    navigate('/home/suppliers');
    setIsModalOpen(false);
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
      </PageHeader>

      <SuppliersTable
        searchQuery={query}
        onSelect={(data) => handleRecord(data)}
      />

      {
        isModalOpen && <SupplierModal onClose={handleCloseModal} data={currentData} />
      }
    </PageContainer>
  )
};

export default SuppliersPage;