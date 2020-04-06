[![issues](https://badgen.net/github/open-issues/scott-linenberger/qbem)](https://github.com/scott-linenberger/qbem/issues)
[![NPM version](https://badgen.net/npm/v/qbem)](https://github.com/scott-linenberger/qbem/tree/0.7.3)
[![License](https://badgen.net/npm/license/qbem)](https://github.com/scott-linenberger/qbem/blob/0.7.3/LICENSE)
[![types](https://badgen.net/npm/types/qbem)](https://www.npmjs.com/package/qbem)
[![minified size](https://badgen.net/bundlephobia/min/qbem)](https://www.npmjs.com/package/qbem)

# qbem
A quick [BEM][BEM] helper! More BEM. Less Typing.

```text
/*
 *         ._.
 *         | | +-+ QUICK-BEM +-+
 *     __._| |_.   .__.   ._. ._.
 *  . / _. | ._ \./ _  \. / _V_ \.   * Block
 *   | (_| | |_) |  __./.| ||_|| |   * Element
 *  . \__, |_.__/.\___|. |_|   |_|.  * Modifier
 * ------| |------------------------
 *      .|_|. More BEM. Less Typing.
 */
```

## Install

Using yarn

```bash
yarn add qbem
```

Using npm

```bash
npm install qbem
```

## Usage

Quick Guide

```ts
/* import or require */
import { QBem } from 'qbem';

/* or */
require { QBem } from 'qbem';

/* create an instance of QBem with your block name */
/*        doesn't matter what you name it          */
/*          I like 'qb' b/c it's short             */

const qb = new QBem('form');


/* need your block style? Do this: */
qb.block(); // returns: 'form'

/* need modifiers for your block? Do this: */
qb.block(['active']); // returns: 'form form--active'

/* want to make those modifiers conditional? Do this: */
qb.block([
  {
   ['active']: someTrueCondition,
   ['inactive']: someFalsyCondition, // modifiers with falsy conditions won't be added
  }
]); // returns: 'form form-active'

/* need an element? Do this: */
qb.element('input'); // returns: 'form__input'

/* need modifiers for your element? Do this: */
qb.element('input', ['active']); // returns: 'form__input form__input--active'

/* want to make those modifiers conditional? Do this: */
qb.element(
  'input',
  [
    {
      ['active']: someTrueCondition,
      ['inactive']: someFalsyCondition, // modifiers with falsy conditions won't be added
    }
  ]
); // returns: 'form__input form__input--active`
```

### Use anywhere you template HTML

```ts
const qb = new QBem('form');

const template = `
<form class="${qb.block(['theme-xmas', 'simple'])}">
  <input class="${qb.element('input')}" type="text" />
  <input
  class="${qb.element('submit', ['disabled'])}"
  type="submit" />
</form>
`;
```

Results in:
```html
<form class="form form--theme-xmas form--simple">
  <input class="form__input" type="text" />
  <input
  class="form__submit form__submit--disabled"
  type="submit" />
</form>
```

### Use with React
```tsx

// ToggleBtn.tsx
// ...
const qb = new QBem('toggle-btn');

const ToggleBtn: FC = (props) => {
  const { text, isActive } = props;

  return (
    <div className={qb.block()}>
      <span className={qb.element('text')}>
        {text}
      </span>
      <button
        className={qb.element(
          'button',
          [{
            enabled: isActive,
            disabled: !isActive,
          }]
        )} />
    </div>
  );
}
```

### Creating a new instance of QBem
```ts
/* import */
import { QBem } from 'qbem';

/* create an instance per block */
const qb = new QBem('block-name');
```

### Block

```ts
qb.block(); // block-name
```

Add modifiers to a block using a string array

```ts
qb.block(['active']); // block-name block-name--active
qb.block(['active', 'dark-mode']); // block-name block-name--active block-name--dark-mode
```

Use conditional modifiers (conditional object keys added as BEM modifier when values are true)

```ts
qb.block([
  {
    active: true,
    ['dark-mode']: true,
    disabled: false, // falsy values not added
  },
]); // block-name block-name--active block-name--dark-mode
```

Use mixed modifiers

```ts
qb.block([
  'active',
  'dark-mode',
  {
    disabled: false, // falsy values not added
  },
]); // block-name block-name--active block-name--dark-mode
```

### Element
Block name is automatically added to elements

```ts
qb.element('element'); // block-name__element
```

Add modifiers to elements using a string array
```ts
qb.element('element', ['active']);
// block-name__element block-name__element--active

qb.element('element', ['active', 'dark-mode']);
// block-name__element block-name__element--active block-name__element--dark-mode
```

## API

### Constructor

`QBem(blockName: string)` -- Creates a new `QBem` object using the supplied `blockName`.

The `blockName` will be used as the "block" portion of BEM strings created with the instance.

### Methods

#### `blockWithModifier(modifier: string)`

Manual method for creating a BEM style class string for a BEM block with a BEM modifier using the BEM block name associated with this instance of `QBem`.

#### `elementWithModifier(element: string, modifider: string)`

Manual method for creating a BEM style class string for a BEM element with a BEM modifier using the BEM block name associated with this instance of `QBem`.

#### `block(modifiers: (string | QBemConditionalModifier)[] | undefined = []) `

Method for creating a BEM style class string. Uses the BEM block name associated with this instance of `QBem`.

#### `element(element: string, modifiers: (string | QBemConditionalModifier)[] | undefined = [])`

Method for creating a BEM style class string. Uses the BEM block name associated with this instance of `QBem` and the supplied BEM element name.

[BEM]: http://getbem.com/naming/
