import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";
import GameButtons from "./GameButtons";
import Player from "./Player";
import generateCards from "../utils/generateCards";
import { updateTable } from "../actions/table";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";

const Table = () => {
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  const dispatch = useDispatch();
  const params = useParams();
  const socket = io("http://localhost:8888");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("send-tableId", params.tableId);
    });
    socket.on("get-table", (data) => {
      dispatch(updateTable(JSON.parse(data)));
    });
  }, []);

  const [gameData, setGameData] = useState<
    { cards: string[]; chips: number }[]
  >([]);

  useEffect(() => {
    if (table?.players && table?.players.length > 1) {
      const cards = generateCards(4);
      setGameData([
        { cards: [cards[0], cards[1]], chips: 20000 },
        { cards: [cards[2], cards[3]], chips: 20000 },
      ]);
    }
  }, [table?.players]);

  return (
    <div className="bg-green-600 w-[600px] h-[350px] rounded-[40%] relative">
      <p className="text-2xl tracking-[0.2em] text-gray-700 font-semibold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        WSOP
      </p>
      {table?.players && table?.players.length > 1 && (
        <div className="absolute top-2 flex gap-2 left-1/3">
          {gameData[1]?.cards.map((el) => (
            <Card type="oponnent" card={el} key={el} />
          ))}
          <div>
            <h1 className="font-semibold text-lg">Oponnent7</h1>
            <p className=" font-semibold text-md">300.00</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
        <Player gameData={gameData} />
      </div>
      {table?.players && table?.players.length > 1 && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-20">
          <GameButtons />
        </div>
      )}
    </div>
  );
};

export default Table;
