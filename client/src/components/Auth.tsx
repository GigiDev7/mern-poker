import { FormEvent, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../actions/auth";
import { IUserState } from "../reducers/authReducer";
import { useNavigate } from "react-router-dom";

interface IProps {
  type: string;
  closeAuthForm: () => void;
}

const Auth = ({ type, closeAuthForm }: IProps) => {
  const [minDate, setMinDate] = useState("");
  const [valid, setValid] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    username: "",
  });

  const { user } = useSelector((state: { auth: IUserState }) => state.auth);
  console.log(user);

  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setFormData((prev) => {
      return { ...prev, [target.name]: target.value };
    });
  };

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (type === "login") {
      dispatch<any>(loginUser(formData.email, formData.password));
    } else {
      if (formData.confirmPassword !== formData.password) {
        setValid("Passwords don't match");
        return;
      }
      if (
        !formData.email ||
        !formData.password ||
        !formData.dateOfBirth ||
        !formData.username
      ) {
        setValid("All fields are requried");
        return;
      }
      const { confirmPassword, ...userData } = formData;
      dispatch<any>(registerUser(userData));
    }
    navigate("/tavles", { replace: true });
  };

  useEffect(() => {
    const min = new Date().getTime() - 21 * 365 * 24 * 60 * 60 * 1000;
    const year = new Date(min).getFullYear().toString();
    const month = new Date(min).getMonth().toString();
    const day = new Date(min).getDay().toString();
    setMinDate(
      `${year}-${month.length === 2 ? month : `0${month}`}-${
        day.length === 2 ? day : `0${day}`
      }`
    );
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="h-fit py-16 px-6 w-[400px] bg-slate-100 relative flex flex-col gap-2"
    >
      <AiOutlineClose
        onClick={closeAuthForm}
        className="absolute top-0 right-0 text-lg cursor-pointer"
      />
      <h1 className="text-center font-medium text-lg">
        {type === "login" ? "Sign in" : "Register"}
      </h1>
      {valid && (
        <span className="text-md font-semibold text-red-500 text-center">
          {valid}
        </span>
      )}
      {type === "register" && (
        <div className="flex flex-col gap-2">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            onChange={handleChange}
            name="username"
            id="username"
            className="border-[1px] border-gray-400 outline-0 rounded pl-1"
            type="text"
          />
        </div>
      )}
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="email">
          Email
        </label>
        <input
          onChange={handleChange}
          name="email"
          id="email"
          className="border-[1px] border-gray-400 outline-0 rounded pl-1"
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-medium" htmlFor="password">
          Password
        </label>
        <input
          onChange={handleChange}
          name="password"
          id="password"
          className="border-[1px] rounded border-gray-400 outline-0 pl-1"
          type="passwordtext"
        />
      </div>
      {type === "register" && (
        <>
          <div className="flex flex-col gap-2">
            <label className="font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              onChange={handleChange}
              name="confirmPassword"
              id="confirmPassword"
              className="border-[1px] rounded border-gray-400 outline-0 pl-1"
              type="passwordtext"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium">Date of birth</label>
            <input
              onChange={handleChange}
              max={minDate}
              type="date"
              className="border-[1px] rounded border-gray-400 outline-0 pl-1"
            />
          </div>
        </>
      )}
      <button
        type="submit"
        className="mt-4 bg-blue-500 hover:bg-blue-600 rounded py-3 w-1/3 mx-auto"
      >
        {type === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
};

export default Auth;
