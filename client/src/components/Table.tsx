import { useSelector } from "react-redux";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";
import GameButtons from "./GameButtons";
import Player from "./Player";

const Table = () => {
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  return (
    <div className="bg-green-600 w-[600px] h-[350px] rounded-[40%] relative">
      <p className="text-2xl tracking-[0.2em] text-gray-700 font-semibold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        WSOP
      </p>
      {table?.players && table?.players.length > 1 && (
        <div className="absolute top-2 flex gap-2 left-1/3">
          <Card type="oponnent" />
          <Card type="oponnent" />
          <div>
            <h1 className="font-semibold text-lg">Oponnent7</h1>
            <p className=" font-semibold text-md">300.00</p>
          </div>
        </div>
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
        <Player />
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 -bottom-20">
        <GameButtons />
      </div>
    </div>
  );
};

export default Table;
