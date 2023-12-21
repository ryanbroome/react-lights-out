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

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard(chance = chanceLightStartsOn) {
    let initialBoard = [];
    // True returned chance times
    function isLit() {
      let test = Math.random();
      return test <= chance;
    }
    // loop ncols number of times to create nrows length arrays
    for (let i = 0; i < ncols; i++) {
      initialBoard.push(Array.from({ length: ncols }, isLit));
    }
    // return array of arrays containing true false based on chanceLightStartsOn
    return initialBoard;
  }

  function hasWon() {
    return board.every((row) => row.every((value) => value === !value));
  }
  // create new copy of board, update it with cell flips by coordinates then use it to update state
  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      const boardCopy = oldBoard.map((row) => [...row]);

      flipCell(y, x, boardCopy);
      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);

      return boardCopy;
    });
  }
  // check for winner
  if (hasWon()) {
    return <div>You Won!</div>;
  }

  let tblBoard = [];
  // create rows of table
  for (let y = 0; y < nrows; y++) {
    let row = [];
    // push cells into rows of table
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={(evt) => flipCellsAround(coord)} />);
    }
    // push rows into tableBoard
    tblBoard.push(<tr key={y}>{row}</tr>);
  }
  //render rows of cells in table below
  return (
    <>
      <h2 className="Board-title">Lights Out!</h2>
      <table className="Board">
        <tbody>{tblBoard}</tbody>
      </table>
      <button onClick={() => setBoard(createBoard(0.7))}>More</button>
      <button onClick={() => setBoard(createBoard(0.1))}>Less</button>
    </>
  );
}

Board.defaultProps = { nrows: 5, ncols: 5, chanceLightStartsOn: 0.2 };

export default Board;
