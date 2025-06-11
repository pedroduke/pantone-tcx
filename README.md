# pantone-tcx

## Pantone TCX Color Matcher

A lightweight and easy-to-use NPM package for working with Pantone TCX colors. This package allows you to:

- Find the nearest Pantone TCX color by providing a HEX color code.
- Get a list of similar Pantone TCX colors based on a distance threshold.
- Return only specific details like the Pantone name, TCX code.

## Features

- **Accurate Color Matching**: Uses the LAB color space (Delta-E) to find the nearest Pantone TCX color.
- **Similar Colors**: Retrieve Pantone TCX colors similar to the provided HEX color within a specified distance.
- **Flexible Output**: Choose to get only the Pantone name, TCX code, or the full color object.
- **Easy Integration**: Simple and fast to integrate into any design system or color-related project.

## Installation

To install the package, run the following command:

```bash
npm install pantone-tcx
```

## Usage

### 1. Find the Nearest Pantone TCX Color `getNearestPantone`

Use getNearestPantone to find the Pantone TCX color closest to a given HEX color. It will return the nearest Pantone color with its name, TCX code, and HEX value.

- Possible to use hex3 or hex6 vales. (e.g., #fff or #ffffff)

```javascript
import { getNearestPantone } from "pantone-tcx";

const nearestColor = getNearestPantone("#ffffff");

console.log(nearestColor);

// Output:
// {
//   name: 'Stalactite',
//   tcx: '11-4101',
//   hex: '#F7F6F2'
// }
```

### 2. Get Similar Pantone TCX Colors `getSimilarColors`

Use getSimilarColors to retrieve Pantone TCX colors that are similar to the input HEX color. You can specify a maxDistance to control how similar the colors should be.

- Possible to use hex3 or hex6 vales. (e.g., #fff or #ffffff) & for maxDistance a number or string (e.g., 12 or "12")

```javascript
import { getSimilarColors } from "pantone-tcx";

const similarColors = getSimilarColors("#ffffff", 24);

console.log(similarColors);

// Output:
// [
//   { name: 'Stalactite', tcx: '11-4101', hex: '#F7F6F2' },
//   { name: 'Lucent White', tcx: '11-0700', hex: '#F4F7FF' },
//   { name: 'Bright White', tcx: '11-0601', hex: '#F4F5F0' },
//   ...
// ]
```

### 3. Get Only the Pantone TCX Name `getNearestPantoneName`

You can easily access just the Pantone TCX name of the nearest color:

```javascript
import { getNearestPantone } from "pantone-tcx";

const nearestColorName = getNearestPantoneName("#ffffff");

console.log(nearestColorName);

// Output: 'Stalactite'
```

### 4. Get Only the Pantone TCX code `getNearestPantoneTcx`

You can easily access just the Pantone TCX code of the nearest color:

```javascript
import { getNearestPantone } from "pantone-tcx";

const nearestColorName = getNearestPantoneTcx("#ffffff");

console.log(getNearestPantoneTcx);

// Output: '11-4101'
```

## Visit our Website Developed to help textile, fashion & interior designers boots their productivity with Pantone TCX colors

- [ColorBook | Website](https://www.colorbook.online/)
- [ColorBook | Chrome Extension](https://chromewebstore.google.com/detail/colorbook/lllficopkmdkahnoimfhmbdgdbkhcclp)

## Author

pantone-tcx is written by [Pedro Duque](https://pedroduke.dev/)
