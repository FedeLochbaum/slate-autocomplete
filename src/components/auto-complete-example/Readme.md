Slate editor with countries auto complete:

```jsx
import React from 'react';
import { Value } from 'slate';
import Editor from './editor-with-suggestions';
const value = {
  object: 'value',
  isVoid: false,
  document: {
    object: 'document',
    nodes: [
      {
        object: 'block',
        type: 'block1',
        nodes: [
          {
            object: 'text',
            leaves: [{ object: 'leaf', text: '', marks: [] }]
          }
        ]
      }
    ]
  }
};
<Example value={Value.fromJSON(value)} />
```