import React, { useState, useEffect } from "react";
import Cell from "./Cell";

const BOARD_SIZE = 8;
const MINES_COUNT = 10;

type CellType = {
  isMine: boolean;
  revealed: boolean;
  flagged: boolean;
  neighborMines: number;
};

const generateBoard = (): CellType[][] => {
  const board: CellType[][] = Array.from({ length: BOARD_SIZE }, () =>
    Array.from({ length: BOARD_SIZE }, () => ({
      isMine: false,
      revealed: false,
      flagged: false,
      neighborMines: 0,
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

const countNeighborMines = (
  board: CellType[][],
  row: number,
  col: number
): number => {
  let count = 0;
  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      const newRow = row + i;
      const newCol = col + j;
      if (
        newRow >= 0 &&
        newRow < BOARD_SIZE &&
        newCol >= 0 &&
        newCol < BOARD_SIZE
      ) {
        if (board[newRow][newCol].isMine) count++;
      }
    }
  }
  return count;
};

const Board: React.FC = () => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newBoard = generateBoard();
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        newBoard[i][j].neighborMines = countNeighborMines(newBoard, i, j);
      }
    }
    setBoard(newBoard);
    setGameOver(false);
    setGameWon(false);
  };

  const handleCellClick = (row: number, col: number) => {
    if (gameOver || gameWon || board[row][col].flagged) return;

    const newBoard = [...board];
    newBoard[row][col].revealed = true;

    if (newBoard[row][col].isMine) {
      setGameOver(true);
    } else {
      revealAdjacentCells(newBoard, row, col);
    }

    setBoard(newBoard);
    checkWinCondition(newBoard);
  };

  const handleRightClick = (e: React.MouseEvent, row: number, col: number) => {
    e.preventDefault();
    if (gameOver || gameWon || board[row][col].revealed) return;

    const newBoard = [...board];
    newBoard[row][col].flagged = !newBoard[row][col].flagged;
    setBoard(newBoard);
  };

  const revealAdjacentCells = (
    board: CellType[][],
    row: number,
    col: number
  ) => {
    if (board[row][col].neighborMines === 0) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          const newRow = row + i;
          const newCol = col + j;
          if (
            newRow >= 0 &&
            newRow < BOARD_SIZE &&
            newCol >= 0 &&
            newCol < BOARD_SIZE
          ) {
            if (
              !board[newRow][newCol].revealed &&
              !board[newRow][newCol].flagged
            ) {
              board[newRow][newCol].revealed = true;
              revealAdjacentCells(board, newRow, newCol);
            }
          }
        }
      }
    }
  };

  const checkWinCondition = (board: CellType[][]) => {
    const allNonMinesRevealed = board.every((row) =>
      row.every((cell) => cell.isMine || cell.revealed)
    );
    if (allNonMinesRevealed) {
      setGameWon(true);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-8 gap-1 mb-4">
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              isMine={cell.isMine}
              revealed={cell.revealed}
              flagged={cell.flagged}
              neighborMines={cell.neighborMines}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              onRightClick={(e) => handleRightClick(e, rowIndex, colIndex)}
            />
          ))
        )}
      </div>
      {gameOver && (
        <div className="text-red-500 font-bold">
          Przegrałeś! Spróbuj ponownie.
        </div>
      )}
      {gameWon && (
        <div className="text-green-500 font-bold">Gratulacje! Wygrałeś!</div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={resetGame}
      >
        Resetuj grę
      </button>
    </div>
  );
};

export default Board;
