import React, { useRef, useState, useLayoutEffect, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import SimpleTextEditor from './SimpleTextEditor';
import ClickOutside from './ClickOutside';
import { preventDefault } from '../utils';
export default function EditorContainer({ rowIdx, column, row, rowHeight, left, top, onCommit, onCommitCancel, scrollLeft, scrollTop, firstEditorKeyPress: key }) {
    const editorRef = useRef(null);
    const changeCommitted = useRef(false);
    const changeCanceled = useRef(false);
    const [isValid, setValid] = useState(true);
    const prevScrollLeft = useRef(scrollLeft);
    const prevScrollTop = useRef(scrollTop);
    const isUnmounting = useRef(false);
    const getInputNode = useCallback(() => { var _a; return (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.getInputNode(); }, []);
    const commitCancel = useCallback(() => {
        changeCanceled.current = true;
        onCommitCancel();
    }, [onCommitCancel]);
    useLayoutEffect(() => {
        const inputNode = getInputNode();
        if (inputNode instanceof HTMLElement) {
            inputNode.focus();
        }
        if (inputNode instanceof HTMLInputElement) {
            inputNode.select();
        }
    }, [getInputNode]);
    // close editor when scrolling
    useEffect(() => {
        if (scrollLeft !== prevScrollLeft.current || scrollTop !== prevScrollTop.current) {
            commitCancel();
        }
    }, [commitCancel, scrollLeft, scrollTop]);
    useEffect(() => () => {
        isUnmounting.current = true;
    }, []);
    // commit changes when editor is closed
    useEffect(() => () => {
        if (isUnmounting.current && !changeCommitted.current && !changeCanceled.current) {
            commit();
        }
    });
    function getInitialValue() {
        const value = row[column.key];
        if (key === 'Delete' || key === 'Backspace') {
            return '';
        }
        if (key === 'Enter') {
            return value;
        }
        return key || value;
    }
    function isCaretAtBeginningOfInput() {
        const inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionEnd === 0;
    }
    function isCaretAtEndOfInput() {
        const inputNode = getInputNode();
        return inputNode instanceof HTMLInputElement
            && inputNode.selectionStart === inputNode.value.length;
    }
    function editorHasResults() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.hasResults) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function editorIsSelectOpen() {
        var _a, _b, _c;
        return (_c = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.isSelectOpen) === null || _b === void 0 ? void 0 : _b.call(_a)) !== null && _c !== void 0 ? _c : false;
    }
    function isNewValueValid(value) {
        var _a, _b;
        const isValid = (_b = (_a = editorRef.current) === null || _a === void 0 ? void 0 : _a.validate) === null || _b === void 0 ? void 0 : _b.call(_a, value);
        if (typeof isValid === 'boolean') {
            setValid(isValid);
            return isValid;
        }
        return true;
    }
    function preventDefaultNavigation(key) {
        return (key === 'ArrowLeft' && !isCaretAtBeginningOfInput())
            || (key === 'ArrowRight' && !isCaretAtEndOfInput())
            || (key === 'Escape' && editorIsSelectOpen())
            || (['ArrowUp', 'ArrowDown'].includes(key) && editorHasResults());
    }
    function commit() {
        if (!editorRef.current)
            return;
        const updated = editorRef.current.getValue();
        if (isNewValueValid(updated)) {
            changeCommitted.current = true;
            const cellKey = column.key;
            onCommit({ cellKey, rowIdx, updated });
        }
    }
    function onKeyDown(e) {
        if (preventDefaultNavigation(e.key)) {
            e.stopPropagation();
        }
        else if (['Enter', 'Tab', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
            commit();
        }
        else if (e.key === 'Escape') {
            commitCancel();
        }
    }
    function createEditor() {
        // return custom column editor or SimpleEditor if none specified
        if (column.editor) {
            return (React.createElement(column.editor, { ref: editorRef, column: column, value: getInitialValue(), row: row, height: rowHeight, onCommit: commit, onCommitCancel: commitCancel, onOverrideKeyDown: onKeyDown }));
        }
        return (React.createElement(SimpleTextEditor, { ref: editorRef, column: column, value: getInitialValue(), onCommit: commit }));
    }
    const className = classNames('rdg-editor-container', {
        'rdg-editor-invalid': !isValid
    });
    return (React.createElement(ClickOutside, { onClickOutside: commit },
        React.createElement("div", { className: className, style: { height: rowHeight, width: column.width, left, top }, onKeyDown: onKeyDown, onContextMenu: preventDefault }, createEditor())));
}
//# sourceMappingURL=EditorContainer.js.map