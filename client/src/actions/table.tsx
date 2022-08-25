import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

export const createTable = (token: string) => async (dispatch: Dispatch) => {
  try {
    const { data } = await axios.post(
      "http://localhost:8000/table/create",
      {},
      {
        headers: { Authorization: "Bearer " + token },
      }
    );
    dispatch({ type: "CREATE_TABLE", payload: data });
  } catch (error) {
    console.log(error);
  }
};
