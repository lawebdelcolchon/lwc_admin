// src/Input/InputText.jsx
import { useState } from "react";

function InputFile({
  labelTitle,
  labelStyle = "",
  containerStyle = "",
  defaultValue,
  updateFormValue,
  updateType,
  border,
  size="md",
  labelPosition = "top",
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

  const fieldSize = `file-input file-input-${size} file-input-${border || "bordered"} ${ value ? " join-item" : "" }`;
  const joinSize = `join ${labelPosition === "left" ? "w-3/4" : "w-full"}`

  return (
    <div
      className={`form-control w-full ${containerStyle}`}
      style={{
        flexDirection: labelPosition === "left" ? "row" : "column", // Cambia la disposición
        alignItems: labelPosition === "left" ? "center" : "flex-start", // Alinea el contenido si es en fila
      }}
    >
      <label
        className={`label ${labelPosition === "left" ? "w-1/4" : "w-full"}`} // Ajusta el ancho
        style={{
          marginRight: labelPosition === "left" ? "1rem" : "0", // Espacio entre el label y el input
        }}
      >
        <span className={"label-text text-base-content " + labelStyle}>
          {labelTitle}
        </span>
      </label>
      <div className={joinSize}>
          <input
            type="file"
            value={value}
            onChange={(e) => updateInputValue(e.target.value)}
            className={fieldSize}
          />
          {value && <button className="btn btn-sm join-item rounded-r-full">Ver</button>}
        </div>
    </div>
  );
}

export default InputFile;