import React from 'react';
import classNames from 'classnames';
export function SelectCellFormatter({ value, disabled = false, onChange }) {
    function handleChange(e) {
        onChange(e.target.checked, e.nativeEvent.shiftKey);
    }
    return (React.createElement("label", { className: classNames('rdg-checkbox-label', { 'rdg-checkbox-label-disabled': disabled }) },
        React.createElement("input", { type: "checkbox", className: "rdg-checkbox-input", disabled: disabled, onChange: handleChange, checked: value }),
        React.createElement("div", { className: "rdg-checkbox" })));
}
//# sourceMappingURL=SelectCellFormatter.js.map