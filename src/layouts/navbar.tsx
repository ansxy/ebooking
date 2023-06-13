import React, { useContext } from "react";
import { UserContext, UserContextProps } from "@/context/user/UserContext";
const Navbar: React.FC = () => {
  const { logout, user } = useContext<UserContextProps>(UserContext);
  return (
    <div className="navbar bg-base-100/80 justify-center flex">
      <div className="w-[65%] flex flex-cols justify-between">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
        </div>

        <div className="flex-none flex flex-row">
          <div className="flex items-center ">
            <p className="gap-2 flex">
              Balance<span>{user?.balance == null ? "0" : user.balance}</span>
            </p>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                {/* <Image src={}/> */}
                <img src="https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a onClick={() => logout()}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
