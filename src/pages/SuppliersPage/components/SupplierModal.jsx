import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useSuppliersProcess } from "../../../hooks/useSuppliers";

const SupplierModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    action,
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier
  } = useSuppliersProcess(data);

  const handleClose = () => {
    state = false;
    onClose();
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (action === 'new') {
      await handleSaveSupplier();
    }
    handleClose();
  };

  const modalButtons = [
    { title: 'Save', type: 'filled', form: 'upserSupplie', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => handleClose() }
  ];

  return (
    <>
      <Modal title="Supplier" visible={state} onClose={handleClose} buttons={action !== 'view' ? modalButtons : []}>
        <form id="upserSupplie" onSubmit={handleSaveRecord}>
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              placeholder="Store"
              value={supplierData.name}
              onChange={(e) => handleSupplierDataChange(e.target?.value, 'name')}
              isRequired={true}
              isReadOnly={action === 'view'}
            ></Input>

            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <Input
                  label="Contact Person"
                  placeholder="Elinor Waters"
                  value={supplierData.contactPerson}
                  onChange={(e) => handleSupplierDataChange(e.target?.value, 'contactPerson')}
                  isRequired={true}
                  isReadOnly={action === 'view'}
                ></Input>
              </div>
              <Input
                label="Phone"
                type="phone"
                placeholder="+234342343443"
                value={supplierData.phone}
                onChange={(e) => handleSupplierDataChange(e.target?.value, 'phone')}
                isRequired={true}
                isReadOnly={action === 'view'}
              ></Input>
            </div>

            <Input
              label="Email"
              placeholder="helpfulelinor@gmail.com"
              type="email"
              value={supplierData.email}
              onChange={(e) => handleSupplierDataChange(e.target?.value, 'email')}
              isRequired={true}
              isReadOnly={action === 'view'}
            ></Input>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default SupplierModal;