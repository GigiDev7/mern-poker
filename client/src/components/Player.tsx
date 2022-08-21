import Card from "./Card";

const Player = () => {
  return (
    <div className="flex  items-center gap-2">
      <div className="flex gap-2">
        <Card />
        <Card />
      </div>
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-lg">Gigicho7</h1>
        <p className=" font-semibold text-md">200.00</p>
      </div>
    </div>
  );
};

export default Player;
