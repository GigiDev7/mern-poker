import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ITableState } from "../reducers/tableReducer";
import { IUserState } from "../reducers/authReducer";
import Card from "./Card";
import GameButtons from "./GameButtons";
import Player from "./Player";
import generateCards from "../utils/generateCards";
import { updateChips, updateTable } from "../actions/table";
import { io } from "socket.io-client";
import { useParams } from "react-router-dom";
import { AiTwotoneDollarCircle } from "react-icons/ai";
import { BiDollarCircle } from "react-icons/bi";

const Table = () => {
  const { table, playingChips, pot, turn } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );
  const { user } = useSelector((state: { auth: IUserState }) => state.auth);

  const [update, setUpdate] = useState({});

  const player = table?.players.find((el) => el.player === user?.username);
  const opponent = table?.players.find((el) => el.player !== user?.username);

  const dispatch = useDispatch();
  const params = useParams();
  const socket = io("http://localhost:8888");

  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("send-tableId", params.tableId);
    });
    socket.on("get-table", (data, turn, gameData) => {
      dispatch(updateTable(JSON.parse(data), turn, gameData));
    });
    socket.on("update-game", (data, turn, gameData) => {
      dispatch(updateTable(JSON.parse(data), turn, gameData));
    });
  }, []);

  const handleFold = () => {
    socket.emit("fold", turn, { table, pot, playingChips });
  };

  const handleAllIn = () => {
    socket.emit("all-in", turn, { table, pot, playingChips });
  };

  return (
    <div className="bg-green-600 w-[600px] h-[350px] rounded-[40%] relative">
      <p className="opacity-40  text-2xl tracking-[2.2em] text-gray-700 font-semibold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        WSOP
      </p>
      {table?.players && table?.players.length > 1 && (
        <div className="absolute top-2 flex gap-2 left-1/3">
          {opponent?.player && playingChips && (
            <div className="mr-3">
              <BiDollarCircle className="text-blue-700 text-2xl" />
              <p className="text-white text-xl">
                {playingChips[opponent!.player]}
              </p>
            </div>
          )}
          {opponent?.cards.map((el, indx) => (
            <Card type="oponnent" card={el} key={indx} />
          ))}
          <div>
            <h1
              className={`font-semibold text-lg capitalize ${
                turn === opponent?.player && "text-amber-300"
              }`}
            >
              {opponent?.player}
            </h1>
            <p className=" font-semibold text-md">{opponent?.chips}</p>
          </div>
        </div>
      )}
      {pot && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 ">
          <p className="text-white text-xl flex items-center gap-1">
            {pot}
            <span>
              <BiDollarCircle className="text-blue-700 text-2xl" />
            </span>
          </p>
        </div>
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
        <Player turn={turn} playerInfo={player} />
      </div>
      {table?.players && table?.players.length > 1 && player?.player === turn && (
        <div className="absolute left-1/2 -translate-x-1/2 -bottom-20">
          <GameButtons handleFold={handleFold} handleAllIn={handleAllIn} />
        </div>
      )}
    </div>
  );
};

export default Table;
