import { useState } from "react";
import { Toaster } from "react-hot-toast";

import PageContainer from "../../components/PageContainer/PageContainer";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import ProductsTable from "./components/ProductsTable";
import ProductModal from "./components/ProductModal";
import Input from "../../components/Input/Input";

const ProductsPage = () => {
  const [isProcessingProduct, setIsProcessingProduct] = useState(false);
  const [isNeedUpdate, setIsNeedUpdate] = useState(true);
  const [currentData, setCurrentData] = useState({});
  const [query, setQuery] = useState('');

  const handleRecord = (product, action) => {
    const data = {
      product: product,
      action: action
    }
    setCurrentData(data);
    setIsNeedUpdate(false);
    setIsProcessingProduct(true);
  };

  const handleCloseModal = () => {
    setIsProcessingProduct(false);
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
        <ButtonIcon type="outline" iconName="PlusIcon" title="Create Product" onClick={() => handleRecord({}, 'new')}/>
      </PageHeader>

      <ProductsTable
        searchQuery={query}
        isNeedUpdate={isNeedUpdate}
        onRecordEdit={(data) => handleRecord(data, 'edit')}
        onRecordRemove={(data) => handleRecord(data, 'remove')}
      />

      <ProductModal state={isProcessingProduct} onClose={handleCloseModal} data={currentData} />

      <Toaster />
    </PageContainer>
  )
};

export default ProductsPage;