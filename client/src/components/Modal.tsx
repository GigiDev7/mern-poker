import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineCopy } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ITableState } from "../reducers/tableReducer";

interface IProps {
  tableId: string;
  handleModalClose: () => void;
}

const Modal = ({ handleModalClose, tableId }: IProps) => {
  const [isTextShown, setIsTextShown] = useState(false);
  const { table } = useSelector(
    (state: { tables: ITableState }) => state.tables
  );

  const navigate = useNavigate();

  const handleCopy = () => {
    navigator.clipboard.writeText(tableId);
    setIsTextShown(true);
    handleTextHide();
  };

  const handleTextHide = () => {
    setTimeout(() => {
      setIsTextShown(false);
    }, 1500);
  };

  const handleNavigate = () => {
    navigate(`/table/${table?._id}`);
    handleModalClose();
  };

  return (
    <>
      <div className="fixed z-10 top-0 bottom-0 left-0 right-0 bg-[rgba(0,0,0,0.5)]"></div>
      <div className="bg-white rounded-sm w-[400px] h-[250px] z-10 fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center">
        <AiOutlineClose
          onClick={handleModalClose}
          className="fixed top-0 right-0 text-xl cursor-pointer"
        />
        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-medium text-md">Your Code Is :</h1>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-xl">{tableId}</p>
            <AiOutlineCopy
              onClick={handleCopy}
              className="cursor-pointer text-xl"
            />
          </div>
          {isTextShown && <h1 className="">Copied to clipboard!</h1>}
          <button
            onClick={handleNavigate}
            type="button"
            className="flex items-center gap-1 font-medium mt-2"
          >
            Go to table
            <span>
              <BsFillArrowRightCircleFill className="mt-1" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
