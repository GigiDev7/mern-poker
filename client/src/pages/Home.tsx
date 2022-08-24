import { useState } from "react";
import Auth from "../components/Auth";
import bg from "../images/poker.jpg";
import { useDispatch } from "react-redux";
import { clearErrors } from "../actions/auth";
import { useSelector } from "react-redux";
import { IUserState } from "../reducers/authReducer";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [authType, setAuthType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state: { auth: IUserState }) => state.auth);

  const handleAuthType = (val: string) => {
    setAuthType(val);
  };

  const closeAuthForm = () => {
    setAuthType("");
    dispatch(clearErrors());
  };

  const handleTableNavigate = () => {
    navigate("/tables");
  };

  return (
    <div className="h-[100vh] relative">
      <img src={bg} alt="poker" className="h-full w-full " />
      {!user && (
        <div className="absolute top-5 right-5 flex gap-5">
          <button
            onClick={() => handleAuthType("login")}
            className="text-white  text-lg"
          >
            Login
          </button>
          <button
            onClick={() => handleAuthType("register")}
            className="text-white text-lg"
          >
            Register
          </button>
        </div>
      )}
      {user && (
        <div
          onClick={handleTableNavigate}
          className="absolute top-5 right-5 flex gap-2 items-center cursor-pointer"
        >
          <h1 className="text-white text-xl">Tables</h1>
          <span>
            <BsFillArrowRightCircleFill className="text-white text-xl mt-1" />
          </span>
        </div>
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1 className="text-white text-5xl">Welcome to WSOP Poker</h1>
      </div>
      {authType && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
          <Auth type={authType} closeAuthForm={closeAuthForm} />
        </div>
      )}
    </div>
  );
};

export default Home;
