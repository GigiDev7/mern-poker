import Table from "../components/Table";
import { AiOutlineClose } from "react-icons/ai";

const Game = () => {
  return (
    <div className="bg-gray-800 h-[100vh] flex items-center justify-center relative">
      <div className="absolute right-2 top-2 border-[1px] py-2 px-2 cursor-pointer">
        <AiOutlineClose className=" text-xl  text-red-500" />
      </div>
      <Table />
    </div>
  );
};

export default Game;
