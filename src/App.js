import { useState } from "react";

export default function Gridmaker() {
  const [numRows, setNumRows] = useState(0);

  function addRow() {
    setNumRows(numRows + 1);
    console.log(`numRows incremented to ${numRows}`);
  }

  return (
    <>
      <div className="grid-tools">
        <AddRowButton onAddRowButtonClick={() => addRow()} />
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
