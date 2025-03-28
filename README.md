[![NPM version](https://img.shields.io/npm/v/qbem)](https://github.com/scott-linenberger/qbem/)
[![types](https://badgen.net/npm/types/qbem)](https://www.npmjs.com/package/qbem)
[![coverage](https://qbem.scottlinenberger.com/coverage/badge-lines.svg)](https://qbem.scottlinenberger.com/coverage/lcov-report/index.ts.html)
[![coverage](https://qbem.scottlinenberger.com/coverage/badge-branches.svg)](https://qbem.scottlinenberger.com/coverage/lcov-report/index.ts.html)
[![coverage](https://qbem.scottlinenberger.com/coverage/badge-statements.svg)](https://qbem.scottlinenberger.com/coverage/lcov-report/index.ts.html)
[![coverage](https://qbem.scottlinenberger.com/coverage/badge-functions.svg)](https://qbem.scottlinenberger.com/coverage/lcov-report/index.ts.html)
[![License](https://badgen.net/npm/license/qbem)](https://github.com/scott-linenberger/qbem/blob/main/LICENSE)
[![issues](https://badgen.net/github/open-issues/scott-linenberger/qbem?d=1)](https://github.com/scott-linenberger/qbem/issues)

# Qbem

A quick [BEM][bem] helper! Flexible, Readable, BEM (Block, Element, Modifier).

```text
-------------------------------------------------------------------
|                   QUICK! BEM v2.0.1                             |
-------------------------------------------------------------------
+<    ,ad8888ba,    88888888ba                                   >+
+<   d8"'    `"8b   88      "8b                                  >+
+<  d8'        `8b  88      ,8P                                  >+
+<  88          88  88aaaaaa8P'   ,adPPYba,  88,dPYba,,adPYba,   >+
+<  88          88  88""""""8b,  a8P_____88  88P'   "88"    "8a  >+
+< 'Y8,    "88,,8P  88      `8b  8PP"""""""  88     |88      88  >+
+<   Y8a.    Y88P   88      a8P  "8b,   ,aa  88    | 88      88  >+
+<    `"Y8888Y"Y8a  88888888P"    `"Ybbd8"'  88      88      88  >+
-------------------------------------------------------------------
* BLOCK         |           * ELEMENT           |        * MODIFIER
-------------------------------------------------------------------
```

## Quick Start

### Installation

```bash
yarn add qbem
```

**OR**

```bash
npm install qbem
```

### Import or Require

```ts
/* import */
import { QBem } from 'qbem';

/* OR require */
require { QBem } from 'qbem';
```

## Example

### With React & Typescript with simple HTML templating

```ts
import React from 'react'
import { QBem } from 'qbem'

const bem = new QBem('qbem-demo')

const QBemDemo: React.FC = () => {
  /* demo puprposes only */
  const isDarkMode = true
  const isActivated = false

  return (
    <div
      className={bem.block(
        [{ ['dark-mode']: isDarkMode, activated: isActivated }],
        'demo'
      )}
    >
      <div className={bem.elem('header')}>
        <h2 className={bem.elem('title-primary')}>QBem Demo</h2>
        <h3 className={bem.elem('title-secondary')}>Flexible, Readable, Bem</h3>
      </div>
      <div className={bem.elem('content')}>
        <div>
          <span className={bem.elem('dropcap')}>Block</span>
          <span className={bem.elem('dropcap')}>Element</span>
          <span className={bem.elem('dropcap')}>Modifier</span>
        </div>
      </div>
    </div>
  )
}
```

**Outputs**

```html
<div class="qbem-demo qbem-demo--dark-mode demo">
  <div class="qbem-demo__header">
    <h2 class="qbem-demo__title-primary">QBem Demo</h2>
    <h3 class="qbem-demo__title-secondary">Flexible, Readable, Bem</h3>
  </div>
  <div class="qbem-demo__content">
    <div>
      <span class="qbem-demo__dropcap">Block</span>
      <span class="qbem-demo__dropcap">Element</span>
      <span class="qbem-demo__dropcap">Modifier</span>
    </div>
  </div>
</div>
```

## User Guide

### Creating an instance of QBem

```ts
/* initializing a new instance of QBem with a block name */
const bem = new QBem('<block-name-here>')
```

### Block Name

```ts
const bem = new QBem('block')
// ..
bem.block() // -> 'block'
```

### Block Name with Static Modifiers

```ts
const bem = new QBem('block')
// ..
/* single modifier */
bem.block(['mod1']) // -> block block--mod1

/* multiple modifiers */
bem.block(['mod1', 'mod2', 'mod3']) // -> block block--mod1 block--mod2 block--mod3
```

### Block Name with non-BEM Static Classes

```ts
const bem = new QBem('block')
// ..
/* single non-BEM class */
bem.block(null, 'classname-a') // -> 'block classname-a'

/* multiple non-BEM classes */
bem.block(null, 'classname-a', 'classname-b', 'classname-c') // -> 'block classname1 classname2 classname3'
```

### Element Name

```ts
const bem = new QBem('block')
// ..
/* using `element` */
bem.element('element') // -> 'block__element'

/* using `elem` */
bem.elem('element') // -> 'block__element'
```

### Element Name with Static Modifiers

```ts
const bem = new QBem('block')
// ..
/* single modifier */
bem.elem('element', ['mod1']) // -> 'block__element'
/* multiple modifiers */
bem.elem('element', ['mod1', 'mod2', 'mod3']) // -> 'block__element'
// 'block__element block__element--mod1 block__element--mod2 block__element--mod3'

/* single modifier */
bem.element('element', ['mod1']) // -> 'block__element'
/* multiple modifiers */
bem.element('element', ['mod1', 'mod2', 'mod3'])
// 'block__element block__element--mod1 block__element--mod2 block__element--mod3'
```

### Element with non-BEM Static Classes

```ts
const bem = new QBem('block')
// ..

/* single non-BEM class */
bem.elem('element', null, 'classname') // -> 'block__element classname'
bem.elem('element', null, 'classname-a', 'classname-b', 'classname-c')
// -> 'block__element classsname-a classname-b classname-c
```

### QBemConditionalKeys

To conditionally apply classnames and or modifier values, you can create a simple Javascript object with string properties that have boolean values.

**Properties:** become modifiers or classname, must be valid object properties
**Boolean:** values determine if the property is applied

```ts
// modifiers example
{
  mod1: true, // apply this modifier
  mod2: false, // DO NOT apply this modifier
  ['mod-3']: true // apply this modifier
  ['mod-4']: false // DO NOT apply this modifier
}

// classes example
{
  class1: true, // apply this class
  class2: false, // DO NOT apply this class
  ['class-3']: true, // apply this class
  ['class-4']: false // DO NOT  apply this class
}
```

### Block with Conditional Modifiers

```ts
const bem = new QBem('block')
// ..

/* single object, single key */
bem.block([{ mod1: true }]) // -> 'block block--mod1'

/* single object with multiple keys */
bem.block([
  {
    mod1: true,
    mod2: false, // NOT applied
    mod3: true,
  },
]) // -> 'block block--mod1 block--mod2'

/* multiple objects with single key */
bem.block([{ mod1: true }, { mod2: false }, { mod3: true }]) // -> 'block block--mod1 block--mod2'
```

### Block with Conditional Classes

```ts
const bem = new QBem('block')
// ..

/* single object, single key */
bem.block(null, { class1: true }) // -> 'block class1'

/* single object with multiple keys */
bem.block(null, {
  class1: true,
  class2: false, // NOT applied
  class3: true,
}) // -> 'block class1 class2'

/* multiple objects, single key */
bem.block(null, [{ class1: true }, { class2: false }, { class3: true }])
// -> 'block class1 class2'
```

### Element with Conditional Modifiers

```ts
const bem = new QBem('block')
// ..

/* single object, single key */
bem.elem('element', [{ mod1: true }])
bem.element('element', [{ mod1: true }]) // -> 'block__element block__element--mod1'

/* single object with multiple keys */
bem.elem([{ mod1: true, mod2: false, mod3: true }])
bem.element([
  {
    mod1: true,
    mod2: false, // NOT applied
    mod3: true,
  },
])
// -> 'block__element block__element--mod1 block__element--mod3'

/* multiple objects, single key */
bem.elem([{ mod1: true }, { mod2: false }, { mod3: true }])
// -> 'block__element block__element--mod1 block__element--mod3'
```

### Element with Conditional Classes

```ts
const bem = new QBem('block')
// ..

/* single object, single key */
bem.elem('element', null, { class1: true }) // -> 'block__element class1'

/* single object with multiple keys */
bem.elem('element', null, {
  class1: true,
  class2: false, // NOT applied
  class3: true,
})
bem.element('element', null, {
  class1: true,
  class2: false, // NOT applied
  class3: true,
}) // -> 'block__element class1 class3'

/* multiple objects, single key */
bem.elem(
  'element',
  null,
  { class1: true },
  { class2: false }, // NOT applied
  { class3: true }
)
bem.element(
  'element',
  null,
  { class1: true },
  { class2: false }, // NOT applied
  { class3: true }
) // -> 'block__element class1 class3'
```

### Mixed Usage Example

```ts
const bem = new QBem('form')

const isDarkMode = true

bem.elem(
  'section-1', // element name
  [ // modifiers
    {
      ['theme-light']: !isDarkMode,
      ['theme-dark']: isDarkMode,
    },
    'required'
  ],
  'third-party-style' // class string
  {
    ['third-party-dark-mode']: isDarkMode // conditional class object
  }
) // -> 'form__section-1 form__section-1--theme-dark form__section-1--required third-party-style third-party-dark-mode'
```

[bem]: http://getbem.com/naming/
