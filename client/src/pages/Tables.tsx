import { useSelector, useDispatch } from "react-redux";
import { IUserState } from "../reducers/authReducer";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTable } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";
import { useState } from "react";

const Tables = () => {
  const [isModalShown, setIsModalShown] = useState(true);

  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const { user } = useSelector((state: { auth: IUserState }) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch<any>(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="bg-slate-700 h-[100vh] w-full relative flex justify-center items-center">
      <div className="flex items-center gap-2 absolute left-5 top-3">
        <h1 className="text-white text-xl capitalize">{user?.username}</h1>
        <span>
          <CgProfile className="text-white text-xl" />
        </span>
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center gap-2 absolute right-5 top-3 cursor-pointer"
      >
        <h1 className="text-white text-xl capitalize">Logout</h1>
        <span>
          <BiLogOut className="text-white text-xl" />
        </span>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-white text-xl">Create Table</h1>
          <AiOutlinePlusCircle className="text-white text-xl" />
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <h1 className="text-white text-xl">Join Table</h1>
          <FaTable className="text-white text-xl" />
        </div>
      </div>

      {isModalShown && (
        <Modal tableId="asdxasdxasd8" handleModalClose={handleModalClose} />
      )}
    </div>
  );
};

export default Tables;
