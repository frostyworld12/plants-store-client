import Modal from "../../../components/Modal/Modal";
import Input from "../../../components/Input/Input";
import { useEmployeesProcess } from "../../../hooks/useEmployees";
import FileInput from "../../../components/FileInput/FileInput";

const EmployeeModal = ({ data = {}, state = false, onClose = () => { } }) => {
  const {
    action,
    employeeData,
    handleEmployeeDataChange,
    handleSaveEmployee,
    handleRemoveEmployee
  } = useEmployeesProcess(data);

  const handleClose = () => {
    state = false;
    onClose();
  };

  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (action !== 'remove') {
      await handleSaveEmployee();
    } else {
      await handleRemoveEmployee();
    }
    handleClose();
  };

  const modalButtons = [
    { title: action !== 'remove' ? 'Save' : 'Ok', type: 'filled', form: 'upsertEmployee', buttonType: 'submit' },
    { title: 'Cancel', type: 'outline', action: () => handleClose() }
  ];

  return (
    <>
      <Modal title="Employee" visible={state} onClose={handleClose} buttons={modalButtons}>
        <form id="upsertEmployee" onSubmit={handleSaveRecord}>
          {
            action !== 'remove'
              ? <div className="flex flex-col gap-4">
                <FileInput value={employeeData.image} onChange={(image) => handleEmployeeDataChange(image, 'image')} />
                <div className="flex gap-4 w-full mt-3">
                  <Input
                    label="First Name"
                    placeholder="Elinor"
                    value={employeeData.firstName}
                    onChange={(e) => handleEmployeeDataChange(e.target?.value, 'firstName')}
                    isRequired={true}
                  ></Input>
                  <div className="flex-1">
                    <Input
                      label="Last Name"
                      placeholder="Waters"
                      value={employeeData.lastName}
                      onChange={(e) => handleEmployeeDataChange(e.target?.value, 'lastName')}
                      isRequired={true}
                    ></Input>
                  </div>
                </div>

                <Input
                  label="Position"
                  placeholder="Seller"
                  value={employeeData.position}
                  onChange={(e) => handleEmployeeDataChange(e.target?.value, 'position')}
                  isRequired={true}
                ></Input>

                <Input
                  label="Email"
                  placeholder="helpfulelinor@gmail.com"
                  type="email"
                  value={employeeData.username}
                  onChange={(e) => handleEmployeeDataChange(e.target?.value, 'username')}
                  isRequired={true}
                ></Input>

                <Input
                  label="Password"
                  placeholder="Password"
                  type="password"
                  value={employeeData.password}
                  onChange={(e) => handleEmployeeDataChange(e.target?.value, 'password')}
                  isRequired={action === 'new'}
                ></Input>
              </div>
              : <div>Are you sure you want to remove employee?</div>
          }
        </form>
      </Modal>
    </>
  );
};

export default EmployeeModal;