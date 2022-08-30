import { useSelector } from "react-redux";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";

interface IProps {
  gameData: { cards: string[]; chips: number }[];
}

const Player = ({ gameData }: IProps) => {
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  return (
    <div className="flex  items-center gap-2">
      <div className="flex gap-2">
        {gameData[0]?.cards.map((el) => (
          <Card type="personal" card={el} key={el} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-lg capitalize">
          {table?.players[0]?.player}
        </h1>
        {table?.players && table.players.length > 1 && (
          <p className=" font-semibold text-md">{gameData[0]?.chips}</p>
        )}
      </div>
    </div>
  );
};

export default Player;
