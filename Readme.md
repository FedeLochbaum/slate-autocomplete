
<h3 align="center"><code>slate-autocomplete</code></h3>

A [**Slate**](https://github.com/ianstormtaylor/slate) plugin to suggestion replacements or actions based on input. Useful for implementing autocomplete suggestions by node type.

<p align="center"><img src="./src/example/demo.gif"></p>

---

### Install

```

```

_You will need to have installed `slate` as a dependency already._

---

### Usage

```js

```

Option | Type | Description
--- | --- | ---
**`trigger`** | `String` | The trigger to match the inputed character, use to open the portal.
**`capture`** | `RegExp` | A regexp that must match the text after the trigger to keep the portal open and extract the text to filter suggestions.
**`suggestions`** | `Array` | An array of suggestions object which have the following keys `key`, `value` and `suggestion`. `suggestion` can be string or react component.
**`onEnter`** | `Function` | A function use to handle return/enter keypress to append suggestion into editor.
**`startOfParagraph`** | `Bool` | An optional flag that use to check that portal will trigger only when trigger string is at the start of paragraph.
**`resultSize`** | `Number` | An optional number use to set size of suggestion result. Default is 5.

---

### Development

Clone the repository and then run:

```
yarn
yarn storybook
```

And open the example page in your browser:

```
http://localhost:6006/
```