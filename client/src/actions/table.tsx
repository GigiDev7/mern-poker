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
    dispatch({ type: "TABLE_ERROR", payload: error });
  }
};

export const joinTable =
  (token: string, tableId: string, navigate: NavigateFunction) =>
  async (dispatch: Dispatch) => {
    try {
      const { data } = await axios.patch(
        `http://localhost:8000/table/join/${tableId}`,
        {},
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      dispatch({ type: "JOIN_TABLE", payload: data });
      navigate(`/table/${tableId}`);
    } catch (error) {
      dispatch({ type: "TABLE_ERROR", payload: error });
    }
  };

export const updateTable = (
  tableData: { players: string[]; _id: string },
  turn: string,
  gameData: { pot: number; playingChips: any; tableCards?: string[] }
) => {
  return { type: "UPDATE_TABLE", payload: { tableData, turn, gameData } };
};

export const updateChips = (chips: number, player: string) => {
  return { type: "UPDATE_CHIPS", payload: { chips, player } };
};
