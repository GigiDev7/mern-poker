import { useState } from "react";
import Auth from "../components/Auth";
import bg from "../images/poker.jpg";
import { useDispatch } from "react-redux";
import { clearErrors } from "../actions/auth";

const Home = () => {
  const [authType, setAuthType] = useState("");
  const dispatch = useDispatch();

  const handleAuthType = (val: string) => {
    setAuthType(val);
  };

  const closeAuthForm = () => {
    setAuthType("");
    dispatch(clearErrors());
  };

  return (
    <div className="h-[100vh] relative">
      <img src={bg} alt="poker" className="h-full w-full " />
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <h1 className="text-white text-5xl">Welcome to WSOP Poker</h1>
        <p className="text-white text-3xl text-center mt-4">Sign in to play</p>
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
