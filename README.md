# 🌈 Pretty Components
Prop-based styled components.
- React components props as selectors
- Sass nested styles
- Use variables
- Generate readable class names (Button, Button--is-selected, ...)

## Install
- `yarn add pretty-components`
- [Add support for `.pss` files using Webpack](https://github.com/eveningkid/pretty-loader)

```scss
// Hello.pss

Hello {
  border: 2px solid yellow;
  background: $background;

  ::isSelected {
    &:hover {
      border-color: purple;
    }
  }

  ::size {
    ::small {
      font-size: 12px;
    }

    ::big {
      font-size: 16px;
    }
  }
}

// Will generate the following
.Hello
.Hello--is-selected
.Hello--size-small
.Hello--size-big

// For a nameless component, use ":root" instead of "Hello";
// it will generate a random identifier
```

![Pretty, pretty, pretty good](https://media.giphy.com/media/d2jjIRvGomz6GMkU/giphy.gif)

## Why?
If you want to apply prop-based styles to your React components so far, you either need to:
- write css classes, then manually map them to each state of our component props  
  `if prop.isSelected, add 'is-selected' css class`
- use expressions (with css-in-js) inside style literals  
  `${props => props.isSelected ? 'blue' : 'red'}`

**Now, let's think for one second: do we have any additional logic for mapping our element to `hover` styles only when it'll be hovered?** Of course we don't, because we already acknowledge that writing `:hover` makes it conditionally styled, based on our element's state.  

**The idea here is similar: making props part of that state, right inside our style declaration.**

## Link Style to its Component
```jsx
import React from 'react';
import { style } from 'pretty-components';
import styles from './Hello.pss'; // only possible when using Webpack

function Hello(props) {
  return <h1 className={props.className}>{props.children}</h1>;
}

// or even simpler
// const Hello = style('h1', styles);

export default style(Hello, styles);

// later
<Hello size="big">Hello World</Hello>
```

## Set variables
```js
import { styleVariables } from 'pretty-components';

// This code needs to be called before any other `pretty-components`'d
// component code is called.
styleVariables({
  background: 'red', // will be available as $background in every stylesheet
  // ...
});
```

## How to Use without Webpack
Without Webpack —at least for now, you won't be able to directly use PSS syntax.
What the Webpack loader actually do is transforming PSS syntax into vanilla javascript code:
```js
import { stylesheet } from 'pretty-components-formatter';

export default stylesheet('Hello', {
  border: '2px solid yellow',
  background: '$background',
  _isSelected: {
    '&:hover': {
      borderColor: 'purple',
    }
  },
  _size: {
    _small: {
      fontSize: 12,
    },
    _big: {
      fontSize: 16,
    }
  }
});
```

## License
[eveningkid](https://twitter.com/eveningkid) @ MIT
