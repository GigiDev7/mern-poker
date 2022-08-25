import {
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
} from "react-icons/bs";
import { GiPokerHand } from "react-icons/gi";

const Card = ({ type }: { type: string }) => {
  if (type === "personal") {
    return (
      <div className="w-[50px] h-[75px] shadow-md rounded relative bg-white">
        <p className="text-2xl font-bold">8</p>
        <BsFillSuitClubFill className="font-bold" />
        <BsFillSuitClubFill className="text-2xl font-bold absolute right-[2px]" />
      </div>
    );
  } else {
    return (
      <div className="w-[50px] h-[75px] shadow-md rounded relative bg-white">
        <div className="flex flex-col h-full justify-between py-1 px-1">
          <div className="flex justify-between">
            <BsFillSuitClubFill className="font-bold" />
            <BsFillSuitSpadeFill className="font-bold" />
          </div>
          <div className="mx-auto">
            <GiPokerHand className="text-3xl " />
          </div>
          <div className="flex justify-between">
            <BsFillSuitHeartFill className="font-bold text-red-600" />
            <BsFillSuitDiamondFill className="font-bold text-red-600" />
          </div>
        </div>
      </div>
    );
  }
};

export default Card;
