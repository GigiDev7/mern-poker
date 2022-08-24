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
      dispatch({ type: "AUTH_ERROR", payload: error.response.data });
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
      dispatch({ type: "AUTH_ERROR", payload: error.response.data });
    }
  };

export const logout = () => async (dispatch: Dispatch) => {
  localStorage.removeItem("user");
  return { type: "LOGOUT" };
};
