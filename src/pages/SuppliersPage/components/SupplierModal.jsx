import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useSuppliersProcess } from "../../../hooks/useSuppliers";

const SupplierModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    action,
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier,
    handleRemoveSupplier
  } = useSuppliersProcess(data);

  const handleClose = () => {
    state = false;
    onClose();
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (action !== 'remove') {
      await handleSaveSupplier();
    } else {
      await handleRemoveSupplier();
    }
    handleClose();
  };

  const modalButtons = [
    { title: action !== 'remove' ? 'Save' : 'Ok', type: 'filled', form: 'upserSupplie', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => handleClose() }
  ];

  return (
    <>
      <Modal title="Supplier" visible={state} onClose={handleClose} buttons={modalButtons}>
        <form id="upserSupplie" onSubmit={handleSaveRecord}>
          {
            action !== 'remove'
              ? <div className="flex flex-col gap-4">
                <Input
                  label="Name"
                  placeholder="Store"
                  value={supplierData.name}
                  onChange={(e) => handleSupplierDataChange(e.target?.value, 'name')}
                  isRequired={true}
                ></Input>

                <div className="flex gap-4 w-full">
                  <div className="flex-1">
                    <Input
                      label="Contact Person"
                      placeholder="Elinor Waters"
                      value={supplierData.contactPerson}
                      onChange={(e) => handleSupplierDataChange(e.target?.value, 'contactPerson')}
                      isRequired={true}
                    ></Input>
                  </div>
                  <Input
                    label="Phone"
                    type="phone"
                    placeholder="+234342343443"
                    value={supplierData.phone}
                    onChange={(e) => handleSupplierDataChange(e.target?.value, 'phone')}
                    isRequired={true}
                  ></Input>
                </div>

                <Input
                  label="Email"
                  placeholder="helpfulelinor@gmail.com"
                  type="email"
                  value={supplierData.email}
                  onChange={(e) => handleSupplierDataChange(e.target?.value, 'email')}
                  isRequired={true}
                ></Input>
              </div>
              : <div>Are you sure you want to remove supplier?</div>
          }
        </form>
      </Modal>
    </>
  );
};

export default SupplierModal;