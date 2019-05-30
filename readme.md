# Reactstrap Confirm

A confirm "polyfill" that creates a [reactstrap](https://reactstrap.github.io/) modal instead of a browser dialog

### Requirements

- React 15+
- Webpack

### Usage

```typescript jsx
import confirm from '@silverstripe/reactstrap-confirm';
import { Button } from 'reactstrap';

const MyButton = () => {
  const handleClick = async () => {
    if (!await confirm('Are you sure?')) {
      return;
    }
  };

  return <Button onClick={handleClick()}>Click me</Button>;  
}
```

The `confirm` function returns a promise that will be resolved with `true` or `false` depending on the response of the 
user. This will render a reactstrap modal into a given DOM node (or `document.body` by default).

Run `yarn storybook` for a detailed example.
