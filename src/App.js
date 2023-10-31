import { useState } from "react";

function Cell({ cKey, rKey, colorValue, onCellClick }) {
  function getKeys() {
    onCellClick(cKey, rKey, colorValue);
  }

  const cellStyle = {
    backgroundColor: colorValue === "" ? "transparent" : colorValue,
  };

  return <button className="cell" style={cellStyle} onClick={getKeys} />;
}

export default function Gridmaker() {
  const [selectedColor, setSelectedColor] = useState(null);

  const [numRows, setNumRows] = useState(0);
  const [numColumns, setNumColumns] = useState(0);
  const [grid, setGrid] = useState([]);

  function addRow() {
    if (numColumns == 0 && numRows == 0) {
      setNumColumns(1);
      setNumRows(1);
      //console.log(`numRows and numCols set to 1`);
      setGrid([[""]]);
      return;
    }

    let updatedNumRows = numRows + 1;
    setNumRows(updatedNumRows);
    //console.log(`numRows incremented to ${updatedNumRows}`);

    // add a "default" row to the grid
    let rowSquares = Array(numColumns == 0 ? 1 : numColumns).fill("");
    let newGrid = grid.slice();
    newGrid.push(rowSquares);
    setGrid(newGrid);
  }

  function addColumn() {
    if (numColumns == 0 && numRows == 0) {
      setNumRows(1);
      setNumColumns(1);
      //console.log(`numRows and numCols set to 1`);
      setGrid([[""]]);
      return;
    }
    let updatedNumColumns = numColumns + 1;
    setNumColumns(updatedNumColumns);
    //console.log(`numColumns incremented to ${updatedNumColumns}`);

    // push an element to each row
    let newGrid = grid.slice();
    newGrid.forEach((element) => {
      element.push("");
    });
  }

  const canvas = grid.map((currRow, rowKey) => {
    //console.log(currRow);
    return (
      <div key={rowKey} className="grid-row">
        {currRow.map((cell, cellKey) => {
          return (
            <Cell
              key={cellKey}
              colorValue={cell}
              onCellClick={cellClick}
              cKey={cellKey}
              rKey={rowKey}
            />
          );
        })}
      </div>
    );
  });

  function removeColumn() {
    if (numColumns > 0) {
      const updatedGrid = grid.map((row) => {
        const newRow = [...row];
        newRow.pop(); // Remove the last column in this row
        return newRow;
      });
      setGrid(updatedGrid);
      let newNumColumns = numColumns - 1;
      setNumColumns(newNumColumns);
      if (newNumColumns === 0) {
        setNumRows(0);
      }
    }
  }
  function removeRow() {
    if (numRows > 0) {
      const updatedGrid = [...grid];
      updatedGrid.pop(); // Remove the last row
      setGrid(updatedGrid);
      let newNumRows = numRows - 1;
      setNumRows(newNumRows);
      if (newNumRows === 0) {
        setNumColumns(0);
      }
    }
  }

  function fillGrid() {
    setGrid(grid.map((row) => row.map((cell) => selectedColor)));
  }

  //handleColorSelect added
  function handleColorSelect(color) {
    setSelectedColor(color);
  }

  function cellClick(cKey, rKey, colorValue) {
    if (colorValue !== selectedColor) {
      const coloredCellGrid = grid;
      coloredCellGrid[rKey][cKey] = selectedColor;
      setGrid(coloredCellGrid.map((row) => row.map((cell) => cell)));
    }
  }

  function fillUncoloredCells() {
    if (selectedColor) {
      const updatedGrid = grid.map((row) =>
        row.map((cell) => (cell === "" ? selectedColor : cell))
      );
      setGrid(updatedGrid);
    }
  }

  function removeColorFromCells() {
    const updatedGrid = grid.map((row) => row.map(() => ""));
    setGrid(updatedGrid);
  }

  return (
    <>
      <div className="grid-tools">
        <AddRowButton onAddRowButtonClick={() => addRow()} />
        <AddColumnButton onAddColumnButtonClick={() => addColumn()} />
        <ColorSelect handleColorSelect={handleColorSelect} />
        <button onClick={removeRow}>Remove Row </button>
        <button onClick={removeColumn}>Remove Column </button>
        <FillGridButton onFillGridButtonClick={() => fillGrid()} />
        <button onClick={fillUncoloredCells}>Fill Uncolored Cells</button>
        <button onClick={removeColorFromCells}>Remove Color</button>
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

//Works with handleColorSelect
function ColorSelect({ handleColorSelect }) {
  const [displayColor, setDisplayColor] = useState("");

  function changeColor(color) {
    setDisplayColor(color);
    handleColorSelect(color);
  }

  return (
    <select
      className="color-dropdown-menu"
      value={displayColor}
      onChange={(e) => changeColor(e.target.value)}
    >
      <option value="">Select a Color</option>
      <option value="red">Red</option>
      <option value="blue">Blue</option>
      <option value="green">Green</option>
      <option value="yellow">Yellow</option>
      <option value="white">White</option>
      <option value="pink">Pink</option>
      <option value="purple">Purple</option>
      <option value="black">Black</option>
    </select>
  );
}

function FillGridButton({ onFillGridButtonClick }) {
  return (
    <button className="fill-grid-button" onClick={onFillGridButtonClick}>
      Fill Grid
    </button>
  );
}
