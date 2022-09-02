import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { IUserState } from "../reducers/authReducer";
import { ITableState } from "../reducers/tableReducer";
import Card from "./Card";
import { BiDollarCircle } from "react-icons/bi";

interface IProps {
  playerInfo: { player: string; cards: string[]; chips: number } | undefined;
  turn: string;
}

const Player = ({ playerInfo, turn }: IProps) => {
  const { table, playingChips } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  const [chipCount, setChipCount] = useState(0);

  const handleChipCountChange = (e: ChangeEvent) => {
    const target = e.target as HTMLInputElement;
    setChipCount(+target.value);
  };

  return (
    <div className="flex  items-center gap-2">
      {playerInfo?.player && (
        <div className="mr-3">
          <BiDollarCircle className="text-blue-700 text-2xl" />
          <p className="text-white text-xl">
            {playingChips[playerInfo!.player]}
          </p>
        </div>
      )}
      <div className="flex gap-2">
        {playerInfo?.cards.map((el, indx) => (
          <Card type="personal" card={el} key={indx} />
        ))}
      </div>
      <div className="flex flex-col items-center">
        <h1
          className={`font-semibold text-lg capitalize ${
            turn === playerInfo?.player && "text-amber-300"
          }`}
        >
          {playerInfo?.player}
        </h1>
        {table?.players && table.players.length > 1 && (
          <>
            <p className=" font-semibold text-md">{playerInfo?.chips}</p>
            <input
              type="range"
              min={0}
              max={playerInfo?.chips}
              value={chipCount}
              onChange={(e) => handleChipCountChange(e)}
            />
            <input
              type="number"
              className="border-[1px] w-[90%]"
              min={0}
              max={playerInfo?.chips}
              value={chipCount}
              onChange={(e) => handleChipCountChange(e)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Player;
