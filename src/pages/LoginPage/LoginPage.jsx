import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { Toaster } from "react-hot-toast";
import { useLogin } from "../../hooks/useLogin";
import { useUser } from "../../hooks/useUsers";

const LoginPage = () => {
  const {
    currentState,
    loginStates,
    handleChangeLoginState,
    handleRegisterClick
  } = useLogin();

  const {
    userData,
    handleUserDataChange,
    handleGetUser
  } = useUser(currentState);

  const handleLogin = async (e) => {
    e.preventDefault();
    await handleGetUser();
  }

  return <div className="h-screen box-border flex items-center justify-center">
    <div className="w-[20rem] flex flex-col gap-10">
      <li className="flex gap-3 font-semibold">
        {
          loginStates.map((state, i) => {
            return <ul
              key={i}
              className={"rounded-lg px-3 py-1 font-semibold cursor-pointer transition-all duration-300 " + (state.selected ? "bg-zinc-800 text-zinc-100" : "text-zinc-800")}
              onClick={() => handleChangeLoginState(state)}
            >
              {state.label}
            </ul>
          })
        }
      </li>

      <form id="login" onSubmit={(e) => handleLogin(e)}>
        <div className="flex flex-col gap-3">
          <Input
            label="Username"
            type="email"
            placeholder="username@gmail.com"
            onChange={(e) => handleUserDataChange(e.target.value, 'username')}
            value={userData?.username}
            isRequired={true}
          />
          <Input
            label="Password"
            type="password"
            onChange={(e) => handleUserDataChange(e.target.value, 'password')}
            value={userData?.password}
            isRequired={true}
          />

          {
            currentState === 'Supplier' && <a
              className="underline text-sm text-zinc-500 cursor-pointer"
              onClick={handleRegisterClick}
            >
              Do not have an account?
            </a>
          }

          <Button
            title="Login"
            type="filled"
            form="login"
            buttonType="submit"
            className="mt-3"
          />
        </div>
      </form>
      <Toaster />
    </div>
  </div>
};

export default LoginPage;