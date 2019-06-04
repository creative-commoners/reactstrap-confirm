"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Confirmation = _interopRequireDefault(require("./Confirmation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const confirmation = (message, additionalProps = {}, mountNode = document.body, unmountDelay = 350, Component) => {
  const ConfirmComponent = Component || _Confirmation.default;
  const wrapper = mountNode.appendChild(document.createElement('div'));
  return new Promise(resolve => {
    const createCompleteHandler = result => () => {
      resolve(result);
      setTimeout(() => {
        _reactDom.default.unmountComponentAtNode(wrapper);

        setTimeout(() => mountNode.removeChild(wrapper));
      }, unmountDelay);
    };

    _reactDom.default.render(_react.default.createElement(ConfirmComponent, _extends({}, additionalProps, {
      onConfirm: createCompleteHandler(true),
      onCancel: createCompleteHandler(false),
      body: message
    })), wrapper);
  });
};

var _default = confirmation;
exports.default = _default;