import { BiWindowClose } from "react-icons/bi";
import { LiaCrossSolid } from "react-icons/lia";

export const Modal = ({ children, onBackgroundClick }) => {
  return (
    <div
      onClick={onBackgroundClick}
      className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 backdrop-blur-sm"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="bg-white rounded-md shadow-slate-200 shadow-md"
      >
        {children}
      </div>
    </div>
  );
};
