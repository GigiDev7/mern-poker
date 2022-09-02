import { useSelector } from "react-redux";
import { IPlayer, ITableState } from "../reducers/tableReducer";

const GameButtons = () => {
  const { playingChips } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  const vals: number[] = Object.values(playingChips);
  const differenceChips = Math.abs(vals[1] - vals[0]);

  return (
    <div className=" flex gap-5">
      {playingChips && (
        <button
          type="button"
          className="w-[7em] rounded py-3 bg-white hover:bg-gray-200 font-semibold"
        >
          Call {differenceChips}
        </button>
      )}
      <button
        type="button"
        className="w-[7em] rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Check
      </button>
      <button
        type="button"
        className="w-[7em] rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Raise
      </button>
      <button
        type="button"
        className="w-[7em] rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        All In
      </button>
      <button
        type="button"
        className="w-[7em] rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Fold
      </button>
    </div>
  );
};

export default GameButtons;
