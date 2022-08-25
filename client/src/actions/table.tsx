import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Dispatch } from "redux";

export const createTable =
  (token: string, navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8000/table/create",
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch({ type: "CREATE_TABLE", payload: data });
      navigate(`/table/${data._id}`);
    } catch (error) {
      console.log(error);
    }
  };
