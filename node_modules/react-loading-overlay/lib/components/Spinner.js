"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _emotion = require("emotion");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Spinner = function Spinner(_ref) {
  var getStyles = _ref.getStyles,
      cx = _ref.cx;
  return _react.default.createElement("div", {
    className: cx('spinner', (0, _emotion.css)(getStyles('spinner')))
  }, _react.default.createElement("svg", {
    viewBox: "25 25 50 50"
  }, _react.default.createElement("circle", {
    cx: "50",
    cy: "50",
    r: "20",
    fill: "none",
    strokeWidth: "2",
    strokeMiterlimit: "10"
  })));
};

Spinner.propTypes = {
  getStyles: _propTypes.default.func.isRequired,
  cx: _propTypes.default.func.isRequired
};
var _default = Spinner;
exports.default = _default;