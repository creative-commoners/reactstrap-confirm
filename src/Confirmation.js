import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

/**
 * Renders a confirmation modal immediately with an onConfirm action. Used with `lib/confirm`.
 */
class Confirmation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
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
    const { isOpen } = this.state;

    const handleToggle = () => {
      if (typeof onCancel === 'function') {
        onCancel();
      }
      this.setState({
        isOpen: false,
      });
    };
    const handleConfirm = () => {
      onConfirm();
      this.setState({
        isOpen: false,
      });
    };

    return (
      <Modal isOpen={isOpen} toggle={handleToggle}>
        {title && <ModalHeader toggle={handleToggle}>{title}</ModalHeader>}
        <ModalBody>
          {body}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleConfirm}>{confirmLabel}</Button>
          {
            (showDismissButton || !title)
            && <Button onClick={handleToggle}>{dismissLabel || 'Cancel'}</Button>
          }
        </ModalFooter>
      </Modal>
    );
  }
}

Confirmation.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  body: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  confirmLabel: PropTypes.string,
  dismissLabel: PropTypes.string,
};

Confirmation.defaultProps = {
  confirmLabel: 'Confirm',
};


export default Confirmation;
