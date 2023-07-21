# wavejs
A javascript library that allows you to create randomized animated SVG waves.  
  
Demo🌊 https://vedantyadu.github.io/wavejs-updated/

## Setup ##
- Oscillator creates a wave.
- Translate the points into the shape you want.
- Smoothly connect the points using `curve.js`.
```js
import { Oscillator, TWO_PI } from "./src/wave.js"
import { bezier } from "./src/curve.js"
```  
👉 Example implementation in `index.js`
