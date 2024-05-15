import { Outlet } from "react-router-dom"
import Menu from "./components/Menu";
import UserInfo from "./components/UserInfo";
import Logout from "./components/Logout";

const HomePage = () => {
  return (
    <div className="h-screen box-border">
      <div className="h-screen px-56 py-10 flex gap-16">
        <div className="flex flex-col">
          <div className="mb-5 py-1 border-b">
            <UserInfo />
          </div>
          <div className="flex-1">
            <Menu />
          </div>
          <div className="mb-5 py-1 border-t">
            <Logout />
          </div>
        </div>
        <div className="h-full flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;