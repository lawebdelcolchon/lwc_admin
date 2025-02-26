import React, { useState } from 'react';
import InformationCircleIcon from '@heroicons/react/24/outline/InformationCircleIcon';

function SelectBox(props) {
    const {
        labelTitle,
        labelDescription,
        defaultValue,
        containerStyle = "",
        placeholder,
        labelStyle = "",
        options,
        updateType,
        updateFormValue,
        border = "bordered",
        size = "md",
        labelPosition = "top"
    } = props;

    const fieldSize = `select select-${border} select-${size} ${labelPosition === "left" ? "w-3/4" : "w-full"}`;

    const [value, setValue] = useState(defaultValue || "");

    const updateValue = (newValue) => {
        updateFormValue({ updateType, value: newValue });
        setValue(newValue);
    };

    return (
        <div
            className={`inline-block ${containerStyle}`}
            style={{
                display: "flex",
                flexDirection: labelPosition === "left" ? "row" : "column", // Cambia la dirección
                alignItems: labelPosition === "left" ? "center" : "flex-start", // Centra en modo fila
            }}
        >
            <label
                className={`label ${labelStyle} ${
                    labelPosition === "left" ? "w-1/4" : "w-full"
                }`}
                style={{
                    marginRight: labelPosition === "left" ? "1rem" : "0", // Espaciado lateral para fila
                }}
            >
                <div className="label-text">
                    {labelTitle}
                    {labelDescription && (
                        <div
                            className="tooltip tooltip-right"
                            data-tip={labelDescription}
                        >
                            <InformationCircleIcon className="w-4 h-4" />
                        </div>
                    )}
                </div>
            </label>

            <select
                className={fieldSize}
                value={value}
                onChange={(e) => updateValue(e.target.value)}
            >
                <option disabled value="">
                    {placeholder}
                </option>
                {options.map((o, k) => (
                    <option value={o.value || o.name} key={k}>
                        {o.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectBox;
