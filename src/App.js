import { useState } from "react";

export default function Gridmaker() {
  const [numRows, setNumRows] = useState(0);
  const [numColumns, setNumColumns] = useState(0);

  function addRow() {
    setNumRows(numRows + 1);
    console.log(`numRows incremented to ${numRows}`);
  }

  function addColumn() {
    setNumColumns(numColumns + 1);
    console.log(`numColumns incremented to ${numColumns}`);
  }

  return (
    <>
      <div className="grid-tools">
        <AddRowButton onAddRowButtonClick={() => addRow()} />
        <AddColumnButton onAddColumnButtonClick={() => addColumn()} />
      </div>

      <div className="grid-row"></div>
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
