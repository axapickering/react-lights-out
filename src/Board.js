import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows=4, ncols=4, chanceLightStartsOn=.85 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];

    for (let rowsIdx = 0; rowsIdx < ncols; rowsIdx++) {
      let row = [];
      for (let colsIdx = 0; colsIdx < nrows; colsIdx++) {
        row.push(Math.random() > chanceLightStartsOn ? false : true);
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    for (let row of board) {
      if (row.includes(true)) return false;
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = [...oldBoard];

      flipCell(y, x, boardCopy);

      return boardCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) return <h2>You won!</h2>;

  let display = board.map(row => row.map(cell => <Cell isLit={cell} />));
  display = display.map(row => <tr>{row}</tr>);

  console.log("board to display,",display);

  return <table><tbody>{display}</tbody></table>;

}

export default Board;
