import { pantoneColors } from "./pantoneColors.js";
import { hexRgb, rgbToLab, deltaE, colorDistance } from "./utils.js";

/**
 * Finds the closest Pantone TCX color to a given hex color value using CIELAB color space
 *
 * @param {string} inputHex - The input hex color to match (with or without # prefix)
 * @returns {{
 *   name: string,
 *   tcx: string,
 *   hex: string
 * }} The closest matching Pantone color object
 * @throws {Error} If no Pantone color could be found or hex format is invalid
 *
 * @example
 * getNearestPantone('#FF0000')
 * // Returns:
 * // {
 * //   name: "Cherry Tomato",
 * //   tcx: "17-1563",
 * //   hex: "#EB3C27"
 * // }
 */
const getNearestPantone = (inputHex) => {
  const inputRGB = hexRgb(inputHex);
  const inputLab = rgbToLab(inputRGB);

  let closestColor = null;
  let closestDistance = Infinity;

  for (const pantone of pantoneColors) {
    const pantoneRGB = hexRgb(pantone.hex);
    const pantoneLab = rgbToLab(pantoneRGB);

    const distance = deltaE(inputLab, pantoneLab);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = pantone;
    }
  }

  if (!closestColor) {
    throw new Error("No closest Pantone color found.");
  }

  return closestColor;
};

/**
 * Gets the name of the closest Pantone TCX color to a given hex color value
 *
 * @param {string} inputHex - The input hex color to match (with or without # prefix)
 * @returns {string} The name of the closest matching Pantone color
 * @throws {Error} If no Pantone color could be found or hex format is invalid
 *
 * @example
 * getNearestPantoneName('#FF0000') // Returns "Cherry Tomato"
 */
const getNearestPantoneName = (inputHex) => {
  const inputRGB = hexRgb(inputHex);
  const inputLab = rgbToLab(inputRGB);

  let closestColor = null;
  let closestDistance = Infinity;

  for (const pantone of pantoneColors) {
    const pantoneRGB = hexRgb(pantone.hex);
    const pantoneLab = rgbToLab(pantoneRGB);

    const distance = deltaE(inputLab, pantoneLab);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = pantone;
    }
  }

  if (!closestColor) {
    throw new Error("No closest Pantone color found.");
  }

  return closestColor.name;
};

/**
 * Gets the TCX code of the closest Pantone color to a given hex color value
 *
 * @param {string} inputHex - The input hex color to match (with or without # prefix)
 * @returns {string} The TCX code of the closest matching Pantone color (e.g. "18-1664")
 * @throws {Error} If no Pantone color could be found or hex format is invalid
 *
 * @example
 * getNearestPantoneTcx('#FF0000') // Returns "17-1563"
 */
const getNearestPantoneTcx = (inputHex) => {
  const inputRGB = hexRgb(inputHex);
  const inputLab = rgbToLab(inputRGB);

  let closestColor = null;
  let closestDistance = Infinity;

  for (const pantone of pantoneColors) {
    const pantoneRGB = hexRgb(pantone.hex);
    const pantoneLab = rgbToLab(pantoneRGB);

    const distance = deltaE(inputLab, pantoneLab);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestColor = pantone;
    }
  }

  if (!closestColor) {
    throw new Error("No closest Pantone color found.");
  }

  return closestColor.tcx;
};

/**
 * Finds similar Pantone TCX colors within a specified distance threshold
 *
 * @param {string} inputHex - The input hex color to match (with or without # prefix)
 * @param {number || string} [maxDistance=64] - Maximum RGB distance threshold (0-441.67) (it accepts both numbers and strings)
 * @returns {Array<{name: string, hex: string, tcx: string}>} Array of similar Pantone colors, sorted by closeness
 *
 * @example
 * getSimilarColors('#FF0000', 24)
 * // Returns:
 * //   [
 * //     { name: 'Cherry Tomato', hex: '#EB3C27', tcx: '17-1563' },
 * //     { name: 'Tangerine Tango', hex: '#DD4124', tcx: '17-1463' },
 * //     { name: 'Grenadine', hex: '#DF3F32', tcx: '17-1558' },
 * //     { name: 'Fiesta', hex: '#DD4132', tcx: '17-1564' },
 * //     { name: 'Mandarin Red', hex: '#E74A33', tcx: '17-1562' },
 * //     { name: 'Spicy Orange', hex: '#D73C26', tcx: '18-1445' },
 * //     { name: 'Orange Com', hex: '#DA321C', tcx: '18-1561' }
 * //   ]
 */
function getSimilarColors(inputHex, maxDistance = 64) {
  const nearest = getNearestPantone(inputHex);
  const targetRGB = hexRgb(nearest.hex);

  const similarColors = pantoneColors
    .map((color) => ({
      ...color,
      distance: colorDistance(targetRGB, hexRgb(color.hex)),
    }))
    .filter(
      (color) =>
        color.distance <= parseInt(maxDistance) && color.hex !== nearest.hex
    )
    .sort((a, b) => a.distance - b.distance)
    .map(({ distance, ...color }) => color);

  return [nearest, ...similarColors];
}

console.log(getSimilarColors("FF0000", "12"));

export {
  getNearestPantone,
  getNearestPantoneName,
  getNearestPantoneTcx,
  getSimilarColors,
};
