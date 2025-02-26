import { useState } from "react";

function TextAreaInput({
    labelTitle,
    labelStyle = "",
    containerStyle = "",
    defaultValue,
    placeholder,
    updateFormValue,
    updateType,
    border,
    size,
    labelPosition = "top", // Nueva propiedad para controlar la posición del label
}) {
    const [value, setValue] = useState(defaultValue);

    const updateInputValue = (val) => {
        setValue(val);
        updateFormValue({ updateType, value: val });
    };

    return (
        <div
            className={`form-control ${containerStyle}`}
            style={{
                display: "flex",
                flexDirection: labelPosition === "left" ? "row" : "column", // Cambia la dirección de diseño
                alignItems: labelPosition === "left" ? "center" : "flex-start", // Alineación para filas
            }}
        >
            <label
                className={`label ${labelStyle} ${
                    labelPosition === "left" ? "w-1/4" : "w-full"
                } textarea-${size}`}
                style={{
                    marginRight: labelPosition === "left" ? "1rem" : "0", // Espaciado lateral en filas
                }}
            >
                <span className="label-text text-base-content">{labelTitle}</span>
            </label>
            <textarea
                value={value}
                className={`textarea textarea-${border || "bordered"} ${
                    labelPosition === "left" ? "w-3/4" : "w-full"
                } input-${size || "md"}`}
                placeholder={placeholder || ""}
                onChange={(e) => updateInputValue(e.target.value)}
            ></textarea>
        </div>
    );
}

export default TextAreaInput;
