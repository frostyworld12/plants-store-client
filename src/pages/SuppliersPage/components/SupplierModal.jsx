import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useSuppliersProcess } from "../../../hooks/useSuppliers";

const SupplierModal = ({ data = {}, onClose = () => { } }) => {
  const {
    action,
    supplierData,
  } = useSuppliersProcess(data);

  return (
    <>
      <Modal title="Supplier" onClose={onClose}>
        <form id="upserSupplie">
          <div className="flex flex-col gap-4">
            <Input
              label="Name"
              placeholder="Store"
              value={supplierData.name}
              isRequired={true}
              isReadOnly={action === 'view'}
            ></Input>

            <div className="flex gap-4 w-full">
              <div className="flex-1">
                <Input
                  label="Contact Person"
                  placeholder="Elinor Waters"
                  value={supplierData.contactPerson}
                  isRequired={true}
                  isReadOnly={action === 'view'}
                ></Input>
              </div>
              <Input
                label="Phone"
                type="phone"
                placeholder="+234342343443"
                value={supplierData.phone}
                isRequired={true}
                isReadOnly={action === 'view'}
              ></Input>
            </div>

            <Input
              label="Email"
              placeholder="helpfulelinor@gmail.com"
              type="email"
              value={supplierData.email}
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