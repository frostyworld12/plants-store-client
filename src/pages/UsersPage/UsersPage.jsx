import TableList from "../../components/Table/TableList";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import PageHeader from "../../components/PageHeader/PageHeader";
import ButtonIcon from "../../components/ButtonIcon/ButtonIcon";
import Modal from "../../components/Modal/Modal";
import Input from "../../components/Input/Input";
import { Toaster } from 'react-hot-toast';
import * as userHooks from "../../hooks/useUsers";
import ConfirmationDialog from "../../components/ConfirmationDialog/ConfirmationDialog";

const UsersPage = () => {
  const {
    isLoading,
    users,
    isModalUserOpen,
    isConfirmOpen,
    isInsertMode,
    userData,
    handleSaveUser,
    handleRemoveUser,
    handleSetUpUserData,
    handleUserDataChange,
    handleOpenModal,
    handleConfirmOpen
  } = userHooks.useUsers();

  const handleEmployeeSave = async (e) => {
    e.preventDefault();

    console.log('userData handleEmployeeSave', userData)
    await handleSaveUser(userData, isInsertMode);
    handleOpenModal(false, isInsertMode);
    return false;
  }

  const handleEditUser = (userId) => {
    if (userId) {
      const data = {...users.find(user => user.userId === userId)};
      handleSetUpUserData(data);

      handleOpenModal(true, false);
    }
  }

  const handleRemoveEmployee = async (state) => {
    if (state) {
      await handleRemoveUser();
    }
    handleConfirmOpen(false);
  }

  const modalButtons = [
    { title: 'Save'  , type: 'filled' , form: 'upsertUser', buttonType:'submit'},
    { title: 'Cancel', type: 'outline', action: () => handleOpenModal(false)   }
  ];

  const actionsColumns = [
    { title: 'Edit'  , iconName: 'PencilSquareIcon', type: 'bare', action: (userId) => handleEditUser(userId)},
    { title: 'Delete', iconName: 'TrashIcon'       , type: 'bare', action: (userId) => handleConfirmOpen(true, userId) }
  ];

  const columns = users?.length ? Object.keys(users[0]) : [];
  const columnsToExclude = ['userId', 'employeeId'];
  const columnsToMark = ['username', 'position'];

  return (
    <div className="h-full">
      <PageHeader>
        <ButtonIcon
          iconName="PlusIcon"
          type="outline"
          title="Create User"
          onClick={() => handleOpenModal(true, true)}
        />
      </PageHeader>

      {
        isLoading
          ? <div className="h-screen flex items-center justify-center">
              <LoadingSpinner color="fill-zinc-600"/>
            </div>
          : <TableList data={users} idColumn="userId" columns={columns} actionsColumns={actionsColumns} columnsToExclude={columnsToExclude} columnsToMark={columnsToMark}></TableList>
      }
      <Toaster />

      {
        isModalUserOpen && <Modal width={35} title={isInsertMode ? "New Employee" : "Edit Employee"} onCloseClick={() => handleOpenModal(false)} buttons={modalButtons}>
          <form id="upsertUser" onSubmit={handleEmployeeSave}>
            <div className="flex flex-col gap-4">
              <Input
                label="Username"
                type="email"
                placeholder="helpfulelinor@gmail.com"
                value={userData.username}
                onChange={(e) => handleUserDataChange(e, 'username')}
                isRequired={true}
              ></Input>

              <div className="flex gap-4">
                <div>
                  <Input
                    label="First name"
                    placeholder="Elinor"
                    value={userData.firstName}
                    onChange={(e) => handleUserDataChange(e, 'firstName')}
                    isRequired={true}
                  ></Input>
                </div>
                <div className="flex-1">
                  <Input
                    label="Last name"
                    placeholder="Waters"
                    value={userData.lastName}
                    onChange={(e) => handleUserDataChange(e, 'lastName')}
                    isRequired={true}
                  ></Input>
                </div>
              </div>

              <Input
                label="Position"
                placeholder="Seller"
                value={userData.position}
                onChange={(e) => handleUserDataChange(e, 'position')}
                isRequired={true}
              ></Input>
              <Input
                label="Password"
                type="password"
                value={userData.password}
                onChange={(e) => handleUserDataChange(e, 'password')}
                isRequired={isInsertMode}
              ></Input>
            </div>
          </form>
        </Modal>
      }

      <ConfirmationDialog isOpen={isConfirmOpen} onCloseClick={() => handleConfirmOpen(false)} onConfirmClick={(state) => handleRemoveEmployee(state)}>
        <div>Are you sure you want to remove the employee?</div>
      </ConfirmationDialog>
    </div>
  );
}


export default UsersPage;