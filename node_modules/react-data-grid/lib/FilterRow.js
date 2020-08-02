import React, { createElement, memo } from 'react';
import classNames from 'classnames';
function FilterRow({ columns, lastFrozenColumnIndex, filters, onFiltersChange }) {
    function onChange(key, value) {
        const newFilters = { ...filters };
        newFilters[key] = value;
        onFiltersChange === null || onFiltersChange === void 0 ? void 0 : onFiltersChange(newFilters);
    }
    return (React.createElement("div", { className: "rdg-filter-row" }, columns.map(column => {
        const { key } = column;
        const className = classNames('rdg-cell', {
            'rdg-cell-frozen': column.frozen,
            'rdg-cell-frozen-last': column.idx === lastFrozenColumnIndex
        });
        const style = {
            width: column.width,
            left: column.left
        };
        return (React.createElement("div", { key: key, style: style, className: className }, column.filterRenderer && createElement(column.filterRenderer, {
            column,
            value: filters === null || filters === void 0 ? void 0 : filters[column.key],
            onChange: value => onChange(key, value)
        })));
    })));
}
export default memo(FilterRow);
//# sourceMappingURL=FilterRow.js.map