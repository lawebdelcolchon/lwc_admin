// src/components/DataTable/DataTable.jsx
import React from "react";

function DataTable({ data, columns }) {
  if (!data || !columns || columns.length === 0) {
    return <p>No hay datos para mostrar.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="text-left">
                {col.headerName}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {typeof col.render === "function"
                    ? col.render(row[col.field], row)
                    : row[col.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
