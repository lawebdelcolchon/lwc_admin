// src/Input/InputText.jsx
import { useState } from "react";

function InputText({
  inputType,
  labelTitle,
  labelStyle = "",
  containerStyle = "",
  defaultValue,
  placeholder,
  updateFormValue,
  updateType,
  border,
  size,
  labelPosition = "top"
}) {
  const [value, setValue] = useState(defaultValue);

  const updateInputValue = (val) => {
    setValue(val);
    updateFormValue({ updateType, value: val });
  };

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
      <input
        type={inputType || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => updateInputValue(e.target.value)}
        className={`input input-${border || "bordered"} input-${size || "md"} ${
          labelPosition === "left" ? "w-3/4" : "w-full"
        }`}
      />
    </div>
  );
}

export default InputText;
