import { useNavigate } from "react-router-dom";
import { useRegisterSupplierUser } from "../../hooks/useUsers";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    supplierData,
    handleSupplierDataChange,
    handleSaveSupplier
  } = useRegisterSupplierUser();

  const handleLoginClick = () => {
    navigate('/login/supplier');
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    await handleSaveSupplier();
  };

  return <div className="h-screen box-border flex items-center justify-center">
    <div className="w-[25rem] flex flex-col gap-10">
      <form id="register" onSubmit={(e) => handleRegister(e)}>
        <div className="flex flex-col gap-3">
          <Input
            label="Organization Name"
            placeholder="Gardenity"
            onChange={(e) => handleSupplierDataChange(e.target.value, 'name')}
            value={supplierData?.name}
            isRequired={true}
          />
          <Input
            label="Contact person"
            placeholder="Genny Subary"
            onChange={(e) => handleSupplierDataChange(e.target.value, 'contactPerson')}
            value={supplierData?.contactPerson}
            isRequired={true}
          />
          <div className="flex gap-3">
            <Input
              label="Email"
              type="email"
              placeholder="mail@gmail.com"
              onChange={(e) => handleSupplierDataChange(e.target.value, 'email')}
              value={supplierData?.email}
              isRequired={true}
            />
            <Input
              label="Phone"
              placeholder="+38839992882"
              onChange={(e) => handleSupplierDataChange(e.target.value, 'phone')}
              value={supplierData?.phone}
              isRequired={true}
            />
          </div>
          <Input
            label="Username"
            type="email"
            placeholder="username@gmail.com"
            onChange={(e) => handleSupplierDataChange(e.target.value, 'username')}
            value={supplierData?.username}
            isRequired={true}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => handleSupplierDataChange(e.target.value, 'password')}
            value={supplierData?.password}
            isRequired={true}
          />

          {
            <a
              className="underline text-sm text-zinc-500 cursor-pointer"
              onClick={handleLoginClick}
            >
              Already have an account?
            </a>
          }

          <Button
            title="Logup"
            type="filled"
            form="register"
            buttonType="submit"
            className="mt-3"
          />
        </div>
      </form>
    </div>
  </div>
};

export default RegisterPage;