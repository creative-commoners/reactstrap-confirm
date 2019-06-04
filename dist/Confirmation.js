"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactstrap = require("reactstrap");

/**
 * Renders a confirmation modal immediately with an onConfirm action. Used with `lib/confirm`.
 */
var Confirmation =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2.default)(Confirmation, _Component);

  function Confirmation(props) {
    var _this;

    _this = _Component.call(this, props) || this;
    _this.state = {
      isOpen: true
    };
    return _this;
  }

  var _proto = Confirmation.prototype;

  _proto.render = function render() {
    var _this2 = this;

    var _this$props = this.props,
        onConfirm = _this$props.onConfirm,
        onCancel = _this$props.onCancel,
        title = _this$props.title,
        body = _this$props.body,
        confirmLabel = _this$props.confirmLabel,
        dismissLabel = _this$props.dismissLabel,
        showDismissButton = _this$props.showDismissButton;
    var isOpen = this.state.isOpen;

    var handleToggle = function handleToggle() {
      if (typeof onCancel === 'function') {
        onCancel();
      }

      _this2.setState({
        isOpen: false
      });
    };

    var handleConfirm = function handleConfirm() {
      onConfirm();

      _this2.setState({
        isOpen: false
      });
    };

    return _react.default.createElement(_reactstrap.Modal, {
      isOpen: isOpen,
      toggle: handleToggle
    }, title && _react.default.createElement(_reactstrap.ModalHeader, {
      toggle: handleToggle
    }, title), _react.default.createElement(_reactstrap.ModalBody, null, body), _react.default.createElement(_reactstrap.ModalFooter, null, _react.default.createElement(_reactstrap.Button, {
      color: "primary",
      onClick: handleConfirm
    }, confirmLabel), (showDismissButton || !title) && _react.default.createElement(_reactstrap.Button, {
      onClick: handleToggle
    }, dismissLabel || 'Cancel')));
  };

  return Confirmation;
}(_react.Component);

Confirmation.propTypes = {
  onConfirm: _propTypes.default.func.isRequired,
  body: _propTypes.default.string.isRequired,
  onCancel: _propTypes.default.func,
  title: _propTypes.default.string,
  confirmLabel: _propTypes.default.string,
  dismissLabel: _propTypes.default.string
};
Confirmation.defaultProps = {
  confirmLabel: 'Confirm'
};
var _default = Confirmation;
exports.default = _default;