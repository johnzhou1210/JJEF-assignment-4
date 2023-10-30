import { useState } from "react";

function Cell({ colorValue, onCellClick }) {
  return (
    <button className="cell" onClick={onCellClick}>
      {colorValue}
    </button>
  );
}

export default function Gridmaker() {
  const [numRows, setNumRows] = useState(0);
  const [numColumns, setNumColumns] = useState(0);
  const [grid, setGrid] = useState([]);
  const [currentColor, setCurrentColor] = useState("white");

  function addRow() {
    if (numColumns == 0 && numRows == 0) {
      setNumColumns(1);
      setNumRows(1);
      console.log(`numRows and numCols set to 1`);
      setGrid([["cell"]]);
      return;
    }

    let updatedNumRows = numRows + 1;
    setNumRows(updatedNumRows); // increment number of rows
    console.log(`numRows incremented to ${updatedNumRows}`);

    // add a "default" row to the grid
    let rowSquares = Array(numColumns == 0 ? 1 : numColumns).fill("cell");
    let newGrid = grid.slice();
    newGrid.push(rowSquares);
    setGrid(newGrid);
  }

  function addColumn() {
    if (numColumns == 0 && numRows == 0) {
      setNumRows(1);
      setNumColumns(1);
      console.log(`numRows and numCols set to 1`);
      setGrid([["cell"]]);
      return;
    }
    let updatedNumColumns = numColumns + 1;
    setNumColumns(updatedNumColumns);
    console.log(`numColumns incremented to ${updatedNumColumns}`);

    // push an element to each row
    let newGrid = grid.slice();
    newGrid.forEach((element) => {
      element.push("cell");
    });
  }

  function collectColor(collectedColor) {
    setCurrentColor(collectedColor);
  }

  function fillGrid() {
    setGrid(grid.map((row) => row.map((cell) => currentColor)));
  }

  const canvas = grid.map((currRow, rowKey) => {
    console.log(currRow);
    return (
      <div key={rowKey} className="grid-row">
        {currRow.map((cell, cellKey) => {
          return <Cell key={cellKey} colorValue={cell} />;
        })}
      </div>
    );
  });

  return (
    <>
      <div className="grid-tools">
        <AddRowButton onAddRowButtonClick={() => addRow()} />
        <AddColumnButton onAddColumnButtonClick={() => addColumn()} />
        <ColorDropdownMenu collectColor={collectColor} />
        <FillGridButton onFillGridButtonClick={() => fillGrid()}/>
      </div>

      <div className="canvas">{canvas}</div>
    </>
  );
}

function AddRowButton({ onAddRowButtonClick }) {
  return (
    <button className="add-row-button" onClick={onAddRowButtonClick}>
      Add Row
    </button>
  );
}

function AddColumnButton({ onAddColumnButtonClick }) {
  return (
    <button className="add-column-button" onClick={onAddColumnButtonClick}>
      Add Column
    </button>
  );
}

function ColorDropdownMenu({ collectColor }) {
  const [selectedColor, setSelectedColor] = useState("white");

  function changeColor(color) {
    setSelectedColor(color);
    collectColor(color);
  }

  return (
    <select className="color-dropdown-menu" value={selectedColor} onChange={e => changeColor(e.target.value)}>
      <option value="white">Select a Color</option>
      <option value="white">white</option>
      <option value="blue">blue</option>
      <option value="red">red</option>
      <option value="yellow">yellow</option>
      <option value="green">green</option>
      <option value="pink">pink</option>
      <option value="purple">purple</option>
      <option value="black">black</option>
    </select>
  );
}

function FillGridButton({ onFillGridButtonClick }) {
  return (
    <button className="fill-grid-button" onClick={onFillGridButtonClick}>
      Fill Grid
    </button>
  )
}