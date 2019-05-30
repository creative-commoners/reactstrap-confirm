import confirm from '../src/confirm';
import Confirmation from '../src/Confirmation';

import Enzyme, { ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ReactDOM from 'react-dom';

Enzyme.configure({ adapter: new Adapter() });

ReactDOM.render = jest.fn();

describe('confirm', () => {
  beforeEach(() => {
    ReactDOM.render.mockReset();
  });

  it('Renders the confirmation component', () => {
    confirm('Message');
    expect(ReactDOM.render).toHaveBeenCalled();

    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);

    expect(wrapper.type()).toBe(Confirmation);
  });

  it('Attempts to render into the given DOM node', () => {
    // Mock a node
    const node = document.createElement('article');
    confirm('Message', {}, node);

    const renderedNode = ReactDOM.render.mock.calls[0][1];
    expect(renderedNode).toBeInstanceOf(Element);
    expect(renderedNode.parentNode).toBe(node);
    expect(node.innerHTML).not.toBeFalsy();
  });

  it('Provides the given message as the body', () => {
    confirm('Message');
    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);
    const props = wrapper.props();

    expect(props.body).toBe('Message');
  });

  it('Unpacks additional given properties into the confirmation component', () => {
    const moreProps = {
      a: 1,
      b: 2,
      c: 'three',
    };

    confirm('Message', moreProps);
    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);
    const props = wrapper.props();

    expect(props).toMatchObject(moreProps);
  });

  it('Resolves the promise when the confirmation handler is called', async () => {
    const promise = confirm('Message');

    // Fetch the handler that will be called when the confirm button is clicked
    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);
    const { onConfirm } = wrapper.props();

    // Call the handler
    onConfirm();

    // Wait for the promise to be resolved
    await expect(promise).resolves.toBe(true);
  });

  it('Resolves the promise when the dismiss handler is called', async () => {
    const promise = confirm('Message');

    // Fetch the handler that will be called when the confirm button is clicked
    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);
    const { onCancel } = wrapper.props();

    // Call the handler
    onCancel();

    // Wait for the promise to be resolved
    await expect(promise).resolves.toBe(false);
  });

  it('Unmounts when confirmed/dismissed', async () => {
    // Mock a node
    const node = document.createElement('article');
    // Mock the unmount method of ReactDOM
    ReactDOM.unmountComponentAtNode = jest.fn();

    // Trigger the dialogue with a custom unmount delay
    const promise = confirm('Message', {}, node, 20);

    // Assert that we have something rendered
    expect(node.innerHTML).not.toHaveLength(0);

    // Fetch the handler that will be called when the confirm button is clicked
    const wrapper = new ShallowWrapper(ReactDOM.render.mock.calls[0][0], true);
    wrapper.props().onConfirm();

    // Wait for the promise to be resolved
    await promise;

    // Await a promise to check we've unmounted after 25ms (longer than the unmount delay)
    await expect(new Promise(resolve => setTimeout(() => resolve(node.innerHTML), 25)))
      .resolves.toHaveLength(0);

    expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalled();
  });
});
