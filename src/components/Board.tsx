import React, { useState } from "react";
import Cell from "./Cell";

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

type CellType = {
  isMine: boolean;
  revealed: boolean;
};

const generateBoard = (): CellType[][] => {
  const board: CellType[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isMine: false,
      revealed: false,
    }))
  );

  let minesPlanted = 0;
  while (minesPlanted < MINES_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);

    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlanted++;
    }
  }

  return board;
};

const Board: React.FC = () => {
  const [board, setBoard] = useState(generateBoard());

  const handleCellClick = (row: number, col: number) => {
    const newBoard = [...board];
    newBoard[row][col].revealed = true;
    setBoard(newBoard);
  };

  return (
    <div className="grid grid-cols-8 gap-1">
      {board.map((row, rowIndex) =>
        row.map((cell, colIndex) => (
          <Cell
            key={`${rowIndex}-${colIndex}`}
            isMine={cell.isMine}
            revealed={cell.revealed}
            onClick={() => handleCellClick(rowIndex, colIndex)}
          />
        ))
      )}
    </div>
  );
};

export default Board;

