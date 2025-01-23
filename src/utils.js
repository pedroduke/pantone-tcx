/**
 * Converts a hexadecimal color string to RGB values
 *
 * @param {string} hex - The hexadecimal color string (with or without # prefix)
 * @returns {{r: number, g: number, b: number}} An object containing RGB values (0-255)
 * @throws {Error} If the hex string format is invalid
 *
 * @example
 * hexRgb('#ff0000') // Returns { r: 255, g: 0, b: 0 }
 * hexRgb('f00')     // Returns { r: 255, g: 0, b: 0 }
 */
const hexRgb = (hex) => {
  const cleanedHex = hex.replace(/^#/, "");

  const isShort = cleanedHex.length === 3;
  const expandedHex = isShort
    ? cleanedHex
        .split("")
        .map((c) => c + c)
        .join("")
    : cleanedHex;

  if (expandedHex.length !== 6) {
    throw new Error("Invalid hex format");
  }

  const r = parseInt(expandedHex.slice(0, 2), 16);
  const g = parseInt(expandedHex.slice(2, 4), 16);
  const b = parseInt(expandedHex.slice(4, 6), 16);

  return { r, g, b };
};

/**
 * Converts RGB color values to CIE XYZ color space
 *
 * @param {{r: number, g: number, b: number}} rgb - Object containing RGB values (0-255)
 * @returns {{x: number, y: number, z: number}} Object containing XYZ values (0-100)
 *
 * @example
 * rgbToXyz({ r: 255, g: 0, b: 0 }) // Returns { x: 41.24, y: 21.26, z: 1.93 }
 *
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_RGB_to_XYZ.html Color conversion formulas}
 */
const rgbToXyz = (rgb) => {
  const { r, g, b } = rgb;

  const normalize = (value) => value / 255;
  const gammaCorrect = (value) =>
    value > 0.04045 ? Math.pow((value + 0.055) / 1.055, 2.4) : value / 12.92;

  const rNorm = gammaCorrect(normalize(r));
  const gNorm = gammaCorrect(normalize(g));
  const bNorm = gammaCorrect(normalize(b));

  const x = rNorm * 0.4124564 + gNorm * 0.3575761 + bNorm * 0.1804375;
  const y = rNorm * 0.2126729 + gNorm * 0.7151522 + bNorm * 0.072175;
  const z = rNorm * 0.0193339 + gNorm * 0.119192 + bNorm * 0.9503041;

  return { x: x * 100, y: y * 100, z: z * 100 };
};

/**
 * Converts CIE XYZ color values to CIE LAB color space using D65 reference white
 *
 * @param {{x: number, y: number, z: number}} xyz - Object containing XYZ values (0-100)
 * @returns {{l: number, a: number, b: number}} Object containing LAB values:
 *   l: Lightness (0-100)
 *   a: Green-Red (-128 to +127)
 *   b: Blue-Yellow (-128 to +127)
 *
 * @example
 * xyzToLab({ x: 41.24, y: 21.26, z: 1.93 }) // Returns { l: 53.23, a: 80.11, b: 67.22 }
 *
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_XYZ_to_Lab.html Color conversion formulas}
 */
const xyzToLab = (xyz) => {
  const { x, y, z } = xyz;

  const refX = 95.047;
  const refY = 100.0;
  const refZ = 108.883;

  const normalize = (value, ref) => value / ref;
  const labTransform = (value) =>
    value > 0.008856 ? Math.pow(value, 1 / 3) : (value * 903.3 + 16) / 116;

  const xNorm = labTransform(normalize(x, refX));
  const yNorm = labTransform(normalize(y, refY));
  const zNorm = labTransform(normalize(z, refZ));

  const l = 116 * yNorm - 16;
  const a = 500 * (xNorm - yNorm);
  const b = 200 * (yNorm - zNorm);

  return { l, a, b };
};

/**
 * Converts RGB color values to CIE LAB color space via XYZ intermediate conversion
 *
 * @param {{r: number, g: number, b: number}} rgb - Object containing RGB values (0-255)
 * @returns {{l: number, a: number, b: number}} Object containing LAB values:
 *   l: Lightness (0-100)
 *   a: Green-Red (-128 to +127)
 *   b: Blue-Yellow (-128 to +127)
 *
 * @example
 * rgbToLab({ r: 255, g: 0, b: 0 }) // Returns { l: 53.23, a: 80.11, b: 67.22 }
 */
const rgbToLab = (rgb) => {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
};

/**
 * Calculates the CIE76 color difference (Delta E) between two colors in LAB space
 *
 * @param {{l: number, a: number, b: number}} lab1 - First LAB color
 * @param {{l: number, a: number, b: number}} lab2 - Second LAB color
 * @returns {number} The color difference value (0 = identical colors)
 *
 * @example
 * deltaE(
 *   { l: 50, a: 50, b: 50 },
 *   { l: 55, a: 45, b: 45 }
 * ) // Returns 8.66
 *
 * @see {@link http://www.brucelindbloom.com/index.html?Eqn_DeltaE_CIE76.html CIE76 Delta E}
 */
const deltaE = (lab1, lab2) => {
  const lDiff = lab1.l - lab2.l;
  const aDiff = lab1.a - lab2.a;
  const bDiff = lab1.b - lab2.b;

  return Math.sqrt(lDiff * lDiff + aDiff * aDiff + bDiff * bDiff);
};

/**
 * Calculates the Euclidean distance between two colors in RGB space
 *
 * @param {{r: number, g: number, b: number}} color1 - First RGB color
 * @param {{r: number, g: number, b: number}} color2 - Second RGB color
 * @returns {number} The distance between colors in RGB space (0-441.67)
 *
 * @example
 * colorDistance(
 *   { r: 255, g: 0, b: 0 },
 *   { r: 0, g: 0, b: 255 }
 * ) // Returns 360.62
 */
const colorDistance = (color1, color2) => {
  const rDiff = color1.r - color2.r;
  const gDiff = color1.g - color2.g;
  const bDiff = color1.b - color2.b;
  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

export { hexRgb, rgbToXyz, xyzToLab, rgbToLab, deltaE, colorDistance };
