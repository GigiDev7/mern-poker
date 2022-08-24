import axios from "axios";
import { Dispatch } from "redux";

export const loginUser =
  (email: string, password: string) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
      dispatch({ type: "SET_USER", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error: any) {
      const errorData = error.response.data;
      let msg;
      if (errorData?.message) msg = errorData.message;
      if (errorData?.errors?.length) msg = errorData.errors[0].msg;
      dispatch({ type: "AUTH_ERROR", payload: msg });
    }
  };

export const registerUser =
  (userData: {
    email: string;
    password: string;
    dateOfBirth: string;
    username: string;
  }) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/user/register",
        userData
      );
      dispatch({ type: "SET_USER", payload: data });
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error: any) {
      const errorData = error.response.data;
      let msg;
      if (errorData?.message) msg = errorData.message;
      if (errorData?.errors?.length) msg = errorData.errors[0].msg;
      dispatch({ type: "AUTH_ERROR", payload: msg });
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: "LOGOUT" });
};

export const clearErrors = () => {
  return { type: "CLEAR_ERRORS" };
};
