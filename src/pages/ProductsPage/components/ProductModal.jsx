import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useProductsProcess } from "../../../hooks/useProducts";
import FileInput from "../../../components/FileInput/FileInput";
import Textarea from "../../../components/Textarea/Textarea";
import AutoCompleteCombobox from "../../../components/AutoCompleteCombobox/AutoCompleteCombobox";

const ProductsModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    action,
    productData,
    suppliers,
    retrieveAllSuppliers,
    handleProductDataChange,
    handleSaveProduct,
    handleRemoveProduct
  } = useProductsProcess(data);

  const handleClose = () => {
    state = false;
    onClose();
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (action !== 'remove') {
      await handleSaveProduct();
    } else {
      await handleRemoveProduct();
    }
    handleClose();
  };

  const handleSuppliersSearch = (value) => {
    retrieveAllSuppliers(value);
  };

  const modalButtons = [
    { title: action !== 'remove' ? 'Save' : 'Ok', type: 'filled', form: 'upsertProduct', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => handleClose() }
  ];

  return (
    <>
      <Modal title="Product" visible={state} onClose={handleClose} buttons={modalButtons} width={35}>
        <form id="upsertProduct" onSubmit={handleSaveRecord}>
          {
            action !== 'remove'
              ? <div className="flex flex-col gap-4">
                <FileInput value={productData.image} onChange={(image) => handleProductDataChange(image, 'image')} />

                <div className="flex gap-4">
                  <div className="w-full">
                    <Input
                      label="Name"
                      placeholder="Flower pot"
                      value={productData.name}
                      onChange={(e) => handleProductDataChange(e.target?.value, 'name')}
                      isRequired={true}
                    />
                  </div>
                  <Input
                    label="Price"
                    type="number"
                    placeholder="10"
                    value={productData.price}
                    onChange={(e) => handleProductDataChange(e.target?.value, 'price')}
                    isRequired={true}
                  />
                </div>

                <AutoCompleteCombobox
                  label="Suppliers"
                  isMultiSelect={true}
                  predefinedItems={suppliers}
                  predefinedSelectedItems={productData.suppliers}
                  onSearch={handleSuppliersSearch}
                  onSelect={(suppliers) => handleProductDataChange(suppliers, 'suppliers')}
                />

                <Textarea
                  label="Description"
                  value={productData.description}
                  onChange={(e) => handleProductDataChange(e.target?.value, 'description')}
                  isRequired={true}
                  rows={10}
                />
              </div>
              : <div>Are you sure you want to remove product?</div>
          }
        </form>
      </Modal>
    </>
  );
};

export default ProductsModal;