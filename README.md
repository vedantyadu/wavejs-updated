# wavejs
A javascript module that allows you to create random animated SVG waves.  
  
Demo🌊 https://vedantyadu.github.io/wavejs-updated/

## Setup ##
- Oscillator creates a wave.
- Translate the points into the shape you want.
- Smoothly connect the points using the `curve.js` module.
```js
import { Oscillator, TWO_PI } from "./src/wave.js"
import { bezier } from "./src/curve.js"
```  
👉 Example implementation in `index.js`
