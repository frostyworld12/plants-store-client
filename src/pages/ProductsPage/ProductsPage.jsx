import { useState } from 'react';
import { useNavigate } from "react-router-dom";

import PageContainer from '../../components/PageContainer/PageContainer';
import PageHeader from '../../components/PageHeader/PageHeader';
import ButtonIcon from '../../components/ButtonIcon/ButtonIcon';
import ProductsTable from './components/ProductsTable';
import ProductModal from './components/ProductModal';
import Input from '../../components/Input/Input';

const ProductsPage = () => {
  const [query, setQuery] = useState('');
  const [currentData, setCurrentData] = useState({});
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleProcessRecord = (product, action) => {
    setIsNeedUpdate(false);
    setCurrentData({
      product: product,
      action: action
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = (isNeedUpdate) => {
    navigate('/home/products');
    setIsNeedUpdate(isNeedUpdate);
    setIsModalOpen(false);
  };

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  return (
    <PageContainer>
      <PageHeader>
        <div className='w-2/5'>
          <Input iconName='MagnifyingGlassIcon' classType='bare' value={query} onChange={handleQuery}></Input>
        </div>
        <ButtonIcon type='outline' iconName='PlusIcon' title='Create Product' onClick={() => handleProcessRecord({}, 'new')} />
      </PageHeader>

      <ProductsTable
        searchQuery={query}
        isNeedUpdate={isNeedUpdate}
        onSelect={(data) => handleProcessRecord(data, 'view')}
      />

      {
        isModalOpen && <ProductModal onClose={handleCloseModal} data={currentData} />
      }
    </PageContainer>
  )
};

export default ProductsPage;