import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import confirm from '../src/confirm';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { Button } from 'reactstrap';

const makeExample = (body, args, buttonText = 'Trigger confirmation') => {
  const handler = async () => {
    const response = await confirm(body, args);
    action(response ? 'Confirmed' : 'Dismissed')();
  };

  return () => <Button onClick={handler}>{ buttonText }</Button>;
};

const generateNote = code => `Code:

\`\`\`js
${code}
\`\`\``;

storiesOf('Confirmation', module)
  .add(
    'Simple example',
    makeExample('Custom confirmation message'),
    { notes: { markdown: generateNote('await confirm(\'Custom confirmation message\');') } }
  )
  .add(
    'Full example',
    makeExample('Custom confirmation message', {
      title: 'Are you sure?',
      confirmLabel: 'Yes! Do it!',
      dismissLabel: 'No I have changed my mind',
      showDismissButton: true,
    }),
    { notes: { markdown: generateNote(`
await confirm(
  'Custom confirmation message',
  {
    title: 'Are you sure?',
    confirmLabel: 'Yes! Do it!',
    dismissLabel: 'No I have changed my mind',
    showDismissButton: true,
  }
);
`) } }
  )
;
