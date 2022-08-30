import React from "react";

const GameButtons = () => {
  return (
    <div className=" flex gap-5">
      <button
        type="button"
        className="px-6 rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Call
      </button>
      <button
        type="button"
        className="px-6 rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Check
      </button>
      <button
        type="button"
        className="px-6 rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Raise
      </button>
      <button
        type="button"
        className="px-6 rounded py-3 bg-white hover:bg-gray-200 font-semibold"
      >
        Fold
      </button>
    </div>
  );
};

export default GameButtons;
