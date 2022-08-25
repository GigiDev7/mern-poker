import { useSelector, useDispatch } from "react-redux";
import { IUserState } from "../reducers/authReducer";
import { CgProfile } from "react-icons/cg";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { FaTable } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../actions/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { createTable, joinTable } from "../actions/table";
import Modal from "../components/Modal";
import { ITableState } from "../reducers/tableReducer";

const Tables = () => {
  const [isTableIdFormShown, setIsTableIdFormShown] = useState(false);
  const [isModalShown, setIsModalShown] = useState(false);
  const [tableId, setTableId] = useState("");

  const { user } = useSelector((state: { auth: IUserState }) => state.auth);
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  useEffect(() => {
    if (table) {
      setIsModalShown(true);
    }
  }, [table]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleTableIdFormClose = () => {
    setIsTableIdFormShown(false);
  };

  const handleTableIdFormShow = () => {
    setIsTableIdFormShown(true);
  };

  const handleModalClose = () => {
    setIsModalShown(false);
  };

  const handleLogout = () => {
    dispatch<any>(logout());
    navigate("/", { replace: true });
  };

  const handleTableCreate = () => {
    dispatch<any>(createTable(user!.token));
  };

  const handleJoin = () => {
    dispatch<any>(joinTable(user!.token, tableId, navigate));
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
        <div
          onClick={handleTableCreate}
          className="flex items-center gap-2 cursor-pointer"
        >
          <h1 className="text-white text-xl">Create Table</h1>
          <AiOutlinePlusCircle className="text-white text-xl" />
        </div>
        <div
          onClick={handleTableIdFormShow}
          className="flex items-center gap-2 cursor-pointer"
        >
          <h1 className="text-white text-xl">Join Table</h1>
          <FaTable className="text-white text-xl" />
        </div>
      </div>

      {isModalShown && (
        <Modal tableId={table!._id} handleModalClose={handleModalClose} />
      )}

      {isTableIdFormShown && (
        <div className="bg-white  w-[350px] h-[200px] rounded-sm absolute z-10">
          <AiOutlineClose
            onClick={handleTableIdFormClose}
            className="absolute right-0 text-xl cursor-pointer"
          />
          <div className="flex flex-col justify-center h-full gap-3">
            <label className="font-semibold mx-auto">Enter Table Id:</label>
            <input
              value={tableId}
              onChange={(e) => setTableId(e.target.value)}
              type="text"
              className="border-[1px] border-black w-[80%] mx-auto"
            />
            <button
              type="button"
              onClick={handleJoin}
              className="bg-blue-500 w-1/2 mx-auto py-2 rounded text-white hover:bg-blue-600"
            >
              Join
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tables;
