"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _Confirmation = _interopRequireDefault(require("./Confirmation"));

var confirmation = function confirmation(message, additionalProps, mountNode, unmountDelay, Component) {
  if (additionalProps === void 0) {
    additionalProps = {};
  }

  if (mountNode === void 0) {
    mountNode = document.body;
  }

  if (unmountDelay === void 0) {
    unmountDelay = 350;
  }

  var ConfirmComponent = Component || _Confirmation.default;
  var wrapper = mountNode.appendChild(document.createElement('div'));
  return new Promise(function (resolve) {
    var createCompleteHandler = function createCompleteHandler(result) {
      return function () {
        resolve(result);
        setTimeout(function () {
          _reactDom.default.unmountComponentAtNode(wrapper);

          setTimeout(function () {
            return mountNode.removeChild(wrapper);
          });
        }, unmountDelay);
      };
    };

    _reactDom.default.render(_react.default.createElement(ConfirmComponent, (0, _extends2.default)({}, additionalProps, {
      onConfirm: createCompleteHandler(true),
      onCancel: createCompleteHandler(false),
      body: message
    })), wrapper);
  });
};

var _default = confirmation;
exports.default = _default;