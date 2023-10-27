export default function Gridmaker() {
  function addRow() {
    return;
  }

  return <AddRowButton onAddRowButtonClick={()=> addRow() } />
}

function AddRowButton({ onAddRowButtonClick }) {
  return <button className="AddRowButton" onClick={onAddRowButtonClick}>Add Row</button>;
}
