import { useSelector } from "react-redux";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";

const Player = () => {
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  return (
    <div className="flex  items-center gap-2">
      <div className="flex gap-2">
        <Card type="personal" />
        <Card type="personal" />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-lg capitalize">
          {table?.players[0]}
        </h1>
        <p className=" font-semibold text-md">200.00</p>
      </div>
    </div>
  );
};

export default Player;
