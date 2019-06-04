"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactstrap = require("reactstrap");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

/**
 * Renders a confirmation modal immediately with an onConfirm action. Used with `lib/confirm`.
 */
class Confirmation extends _react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true
    };
  }

  render() {
    const {
      onConfirm,
      onCancel,
      title,
      body,
      confirmLabel,
      dismissLabel,
      showDismissButton
    } = this.props;
    const {
      isOpen
    } = this.state;

    const handleToggle = () => {
      if (typeof onCancel === 'function') {
        onCancel();
      }

      this.setState({
        isOpen: false
      });
    };

    const handleConfirm = () => {
      onConfirm();
      this.setState({
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
  }

}

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