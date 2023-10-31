import { useState } from "react";

//Note to remove the color text outside of testing
//Can set font size to 0px for not as practical but quick fix
function Cell({ cellKey, currRow, colorValue, onCellClick}) {
  function giveKey() {
    onCellClick(cellKey, currRow, colorValue);
  }

  //cellStyle added
  //minor change to cellStyle to have the background properly filled with color
  const cellStyle = {
    backgroundColor: colorValue === "cell" ? "transparent" : colorValue,
  };
  
  return (
    <button className="cell" style={cellStyle} onClick={giveKey}>
      {colorValue}
    </button>
  );
}

export default function Gridmaker() {
  //selectedColor and isColored variable added
  const [selectedColor, setSelectedColor] = useState(null);
  const [isColored, setIsColored] = useState(false);
  
  const [numRows, setNumRows] = useState(0);
  const [numColumns, setNumColumns] = useState(0);
  const [grid, setGrid] = useState([]);

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

  const canvas = grid.map((currRow, rowKey) => {
    console.log(currRow);
    return (
      <div key={rowKey} className="grid-row">
        {currRow.map((cell, cellKey) => {
          return <Cell key={cellKey} colorValue={cell} onCellClick={cellClick} cellKey={cellKey} currRow={rowKey} />;
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
      setNumColumns(numColumns - 1);
    }
    if (numColumns === 0) {
      setNumRows(0);
    }
}
function removeRow() {
    if (numRows > 0) {
      const updatedGrid = [...grid];
      updatedGrid.pop(); // Remove the last row
      setGrid(updatedGrid);
      setNumRows(numRows - 1);
    }
    if (numRows === 0) {
      setNumColumns(0);

    }
  }

  function fillGrid() {
    setGrid(grid.map((row) => row.map((cell) => selectedColor)));
  }

  //handleColorSelect added
  function handleColorSelect(color) {
    setSelectedColor(color);
  }

  function cellClick(key, currRow, colorValue) {
    console.log(key, currRow, colorValue);
  }

  //fillUncoloredCells added
  //the cell === "cell" will need to be changed to cell === ""
  //temporary for current cells
  function fillUncoloredCells() {
    if (selectedColor) {
      const updatedGrid = grid.map((row) =>
        row.map((cell) => (cell === "cell" ? selectedColor : cell))
      );
      setGrid(updatedGrid);
    }
  }

  //removeColorFromCells added
  //same thing applies here
  //currently "cell" will be changed to ""
  function removeColorFromCells() {
    const updatedGrid = grid.map((row) => row.map(() => "cell"));
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
        <FillGridButton onFillGridButtonClick={() => fillGrid()}/>
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
    <select className="color-dropdown-menu" value={displayColor} onChange={e => changeColor(e.target.value)}>
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
  )
}