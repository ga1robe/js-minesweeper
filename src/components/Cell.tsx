import React from "react";

type CellProps = {
  isMine: boolean;
  onClick: () => void;
  onRightClick: (e: React.MouseEvent) => void;
  revealed: boolean;
  flagged: boolean;
  neighborMines: number;
};

const Cell: React.FC<CellProps> = ({
  isMine,
  onClick,
  onRightClick,
  revealed,
  flagged,
  neighborMines,
}) => {
  return (
    <div
      className={`w-8 h-8 border flex items-center justify-center cursor-pointer
        ${revealed ? "bg-gray-300" : "bg-gray-100"} 
        ${revealed && isMine ? "bg-red-500" : ""}
      `}
      onClick={onClick}
      onContextMenu={onRightClick}
    >
      {flagged
        ? "🚩"
        : revealed && isMine
        ? "💣"
        : revealed && neighborMines > 0
        ? neighborMines
        : ""}
    </div>
  );
};

export default Cell;
