import { Outlet } from "react-router-dom"

import MenuColumn from "./components/MenuColumn/MenuColumn";

const HomePage = () => {
  return (
    <div className="h-screen box-border">
      <div className="h-screen px-56 py-10 flex gap-16">
        <div className="">
          <MenuColumn></MenuColumn>
        </div>
        <div className="h-full flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default HomePage;