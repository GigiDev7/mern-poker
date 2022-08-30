import { useSelector } from "react-redux";
import { IUserState } from "../reducers/authReducer";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";

interface IProps {
  playerInfo: { player: string; cards: string[]; chips: number } | undefined;
}

const Player = ({ playerInfo }: IProps) => {
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  return (
    <div className="flex  items-center gap-2">
      <div className="flex gap-2">
        {playerInfo?.cards.map((el, indx) => (
          <Card type="personal" card={el} key={indx} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h1 className={`font-semibold text-lg capitalize `}>
          {playerInfo?.player}
        </h1>
        {table?.players && table.players.length > 1 && (
          <p className=" font-semibold text-md">{playerInfo?.chips}</p>
        )}
      </div>
    </div>
  );
};

export default Player;
