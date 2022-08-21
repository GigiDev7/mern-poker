import {
  BsFillSuitClubFill,
  BsFillSuitSpadeFill,
  BsFillSuitHeartFill,
  BsFillSuitDiamondFill,
} from "react-icons/bs";

const Card = () => {
  return (
    <div className="w-[50px] h-[75px] shadow-md rounded relative bg-white">
      <p className="text-2xl font-bold">8</p>
      <BsFillSuitClubFill className="font-bold" />
      <BsFillSuitClubFill className="text-2xl font-bold absolute right-[2px]" />
    </div>
  );
};

export default Card;
