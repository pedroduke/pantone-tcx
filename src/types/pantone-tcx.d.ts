declare module "pantone-tcx" {
  interface PantoneColor {
    name: string;
    tcx: string;
    hex: string;
  }

  export function getNearestPantone(inputHex: string): PantoneColor;

  export function getNearestPantoneName(inputHex: string): string;
  export function getNearestPantoneTcx(inputHex: string): string;

  export function getSimilarColors(
    inputHex: string,
    maxDistance?: number | string
  ): PantoneColor[];
}
