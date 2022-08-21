import Player from "./Player";

const Table = () => {
  return (
    <div className="bg-green-600 w-[600px] h-[350px] rounded-[40%] relative">
      <p className="text-2xl tracking-[0.2em] text-gray-700 font-semibold fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        WSOP
      </p>
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 ">
        <Player />
      </div>
    </div>
  );
};

export default Table;
