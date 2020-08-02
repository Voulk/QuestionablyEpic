import React, { forwardRef } from 'react';
import classNames from 'classnames';
export default forwardRef(function CellMask({ width, height, top, left, zIndex, className, ...props }, ref) {
    return (React.createElement("div", Object.assign({ className: classNames('rdg-cell-mask', className), style: {
            height,
            width,
            zIndex,
            transform: `translate(${left}px, ${top}px)`
        }, "data-test": "cell-mask", ref: ref }, props)));
});
//# sourceMappingURL=CellMask.js.map