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
    //? TODO: create array-of-arrays of true/false values
    // determine true or false based on percent chance vs random number
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

  // check all values are false in our board arrays
  function hasWon() {
    //? TODO: check the board in state to determine whether the player has won.
    // check every value in every row in  board for false values
    return board.every((row) => row.every((value) => value === false));
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      //?! TODO: Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map((row) => [...row]);

      //?! TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy);

      flipCell(y, x + 1, boardCopy);
      flipCell(y, x - 1, boardCopy);
      flipCell(y + 1, x, boardCopy);
      flipCell(y - 1, x, boardCopy);

      return boardCopy;
    });
  }
  //? TODO
  if (hasWon()) {
    return <div>You Won!</div>;
  }

  let tblBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(<Cell key={coord} isLit={board[y][x]} flipCellsAroundMe={(evt) => flipCellsAround(coord)} />);
    }

    tblBoard.push(<tr key={y}>{row}</tr>);
  }
  // Playing around with adding buttons to change difficulty
  return (
    <table className="Board">
      <tbody>
        <tr id="Table-title">
          <th>
            <button onClick={() => setBoard(createBoard(0.7))}>Hard</button>
          </th>
          <th>Lights Out!</th>
          <th>
            <button onClick={() => setBoard(createBoard(0.1))}>Easy</button>
          </th>
        </tr>
        {tblBoard}
      </tbody>
    </table>
  );
}

Board.defaultProps = { nrows: 8, ncols: 8, chanceLightStartsOn: 0.2 };

export default Board;
