import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useCustomersProcess } from "../../../hooks/useCustomers";

const SupplierModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    action,
    customerData,
    handleCustomerDataChange,
    handleSaveCustomer,
    handleRemoveCustomer
  } = useCustomersProcess(data);

  const handleClose = () => {
    state = false;
    onClose();
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (action !== 'remove') {
      await handleSaveCustomer();
    } else {
      await handleRemoveCustomer();
    }
    handleClose();
  };

  const modalButtons = [
    { title: action !== 'remove' ? 'Save' : 'Ok', type: 'filled', form: 'upsertCustomer', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => handleClose() }
  ];

  return (
    <>
      <Modal title="Customer" visible={state} onClose={handleClose} buttons={modalButtons}>
        <form id="upsertCustomer" onSubmit={handleSaveRecord}>
          {
            action !== 'remove'
              ? <div className="flex flex-col gap-4">
                <div className="flex gap-4 w-full">
                  <Input
                    label="First Name"
                    placeholder="Elinor"
                    value={customerData.firstName}
                    onChange={(e) => handleCustomerDataChange(e.target?.value, 'firstName')}
                    isRequired={true}
                  ></Input>
                  <div className="flex-1">
                    <Input
                      label="Last Name"
                      placeholder="Waters"
                      value={customerData.lastName}
                      onChange={(e) => handleCustomerDataChange(e.target?.value, 'lastName')}
                      isRequired={true}
                    ></Input>
                  </div>
                </div>

                <Input
                  label="Email"
                  placeholder="helpfulelinor@gmail.com"
                  type="email"
                  value={customerData.email}
                  onChange={(e) => handleCustomerDataChange(e.target?.value, 'email')}
                  isRequired={true}
                ></Input>

                <Input
                  label="Phone"
                  placeholder="+234342343443"
                  type="phone"
                  value={customerData.phone}
                  onChange={(e) => handleCustomerDataChange(e.target?.value, 'phone')}
                  isRequired={true}
                ></Input>

                <Input
                  label="Address"
                  placeholder="Street 10"
                  value={customerData.address}
                  onChange={(e) => handleCustomerDataChange(e.target?.value, 'address')}
                  isRequired={true}
                ></Input>
              </div>
              : <div>Are you sure you want to remove customer?</div>
          }
        </form>
      </Modal>
    </>
  );
};

export default SupplierModal;