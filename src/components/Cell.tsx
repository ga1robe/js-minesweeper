import React from "react";

type CellProps = {
  isMine: boolean;
  onClick: () => void;
  revealed: boolean;
};

const Cell: React.FC<CellProps> = ({ isMine, onClick, revealed }) => {
  return (
    <div
      className={`w-8 h-8 border flex items-center justify-center cursor-pointer
        ${revealed ? "bg-gray-300" : "bg-gray-100"} 
        ${revealed && isMine ? "bg-red-500" : ""}
      `}
      onClick={onClick}
    >
      {revealed && isMine ? "💣" : ""}
    </div>
  );
};

export default Cell;

