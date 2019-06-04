/* global jest describe beforeEach expect */

import React from 'react';

import Confirmation from '../src/Confirmation';
import { Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

const onConfirm = jest.fn();

describe('Confirmation component', () => {
  beforeEach(() => {
    onConfirm.mockReset();
  });

  it('renders a modal immediately', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" />);
    expect(wrapper.find(Modal)).toHaveLength(1);
  });

  it('renders the given body into the modal body', () => {
    const body = 'Fake content';
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body={body} />);
    expect(wrapper.find(ModalBody).dive().text()).toBe(body);
  });

  it('Does not render a header without a title', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" />);
    expect(wrapper.find(ModalHeader)).toHaveLength(0);
  });

  it('Renders the title into a header if given', () => {
    const title = 'Fake title';
    const wrapper = shallow(<Confirmation
      onConfirm={onConfirm}
      body="body"
      title={title}
    />);

    const header = wrapper.find(ModalHeader);
    expect(header).toHaveLength(1);
    expect(header.dive().find('.modal-title').text()).toBe(title);
  });

  it('Renders a confirmation button', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" />);

    const firstButton = wrapper.find(Button).first();
    expect(firstButton).not.toBeFalsy();
    expect(firstButton.dive().text()).toBe('Confirm');
  });

  it('Calls the provided confirmation handler when the confirm button is clicked', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" />);

    wrapper.find(Button).first().simulate('click');

    expect(onConfirm).toHaveBeenCalled();
  });

  it('Renders a cancel button when no header is rendered', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" />);

    const secondButton = wrapper.find(Button).at(1);

    expect(secondButton).not.toBeFalsy();
    expect(secondButton.dive().text()).toBe('Cancel');
  });

  it('Doesn\'t render a cancel button if a header is present', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" title="title" />);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('Will render a cancel button if explicitly told', () => {
    const wrapper = shallow(<Confirmation
      onConfirm={onConfirm}
      body="body"
      title="title"
      showDismissButton
    />);

    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('Calls the provided cancel handler when the cancel button is clicked', () => {
    const onCancel = jest.fn();
    const wrapper = shallow(<Confirmation
      onConfirm={onConfirm}
      body="body"
      onCancel={onCancel}
    />);

    wrapper.find(Button).last().simulate('click');

    expect(onCancel).toHaveBeenCalled();
  });

  it('Does not fall over if the provided onCancel function is not a function', () => {
    const wrapper = shallow(<Confirmation
      onConfirm={onConfirm}
      body="body"
      onCancel={null}
    />);

    wrapper.find(Button).last().simulate('click');
  });

  it('Allows custom button text', () => {
    const confirmLabel = 'Go for it';
    const dismissLabel = 'I have changed my mind';

    const wrapper = shallow(<Confirmation
      onConfirm={onConfirm}
      body="body"
      confirmLabel={confirmLabel}
      dismissLabel={dismissLabel}
    />);

    const buttons = wrapper.find(Button);
    expect(buttons).toHaveLength(2);
    expect(buttons.first().dive().text()).toBe(confirmLabel);
    expect(buttons.last().dive().text()).toBe(dismissLabel);
  });

  it('Closes itself when the confirmation button is clicked', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" title="title" />);

    wrapper.find(Button).first().simulate('click');
    expect(wrapper.state().isOpen).toBe(false);
  });

  it('Closes itself when the dismiss button is clicked', () => {
    const wrapper = shallow(<Confirmation onConfirm={onConfirm} body="body" title="title" />);

    wrapper.find(Button).last().simulate('click');
    expect(wrapper.state().isOpen).toBe(false);
  });
});
