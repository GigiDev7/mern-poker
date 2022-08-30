import {
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
} from "react-icons/bs";
import { GiPokerHand } from "react-icons/gi";

const Card = ({ type, card }: { type: string; card: string }) => {
  const cardObject: any = {
    H: <BsFillSuitHeartFill className="text-red-600" />,
    D: <BsFillSuitDiamondFill className="text-red-600" />,
    C: <BsFillSuitClubFill />,
    S: <BsFillSuitSpadeFill />,
    HB: (
      <BsFillSuitHeartFill className="text-red-600 text-2xl font-bold absolute right-[2px]" />
    ),
    DB: (
      <BsFillSuitDiamondFill className="text-red-600 text-2xl font-bold absolute right-[2px]" />
    ),
    CB: (
      <BsFillSuitClubFill className="text-2xl font-bold absolute right-[2px]" />
    ),
    SB: (
      <BsFillSuitSpadeFill className="text-2xl font-bold absolute right-[2px]" />
    ),
  };

  if (type === "personal") {
    return (
      <div className="w-[50px] h-[75px] shadow-md rounded relative bg-white">
        <p className="text-2xl font-bold">
          {card.length === 2 ? card[0] : "10"}
        </p>
        {card.length === 2 ? cardObject[card[1]] : cardObject[card[2]]}
        {card.length === 2
          ? cardObject[`${card[1]}B`]
          : cardObject[`${card[2]}B`]}
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
