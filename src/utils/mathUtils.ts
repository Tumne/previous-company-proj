import { clamp } from 'lodash';
/**
 * Rounds according to the following logic:
 *
 * <ul>
 *  <li>.01 to round 2 decimals</li>
 *  <li>1 to nearest integer (default)</li>
 *  <li>6 to nearest multiple of 6</li>
 *  <li>0.5 to nearest multiple of 0.5</li>
 * </ul>
 */
export const round = (value: number, roundTo = 1) => Math.round(value / roundTo) * roundTo;

/**
 * Normalizes a value in relation to a certain range ( return is a float between 0 and 1, but it can be different if <code>value</code> is out of range )
 * The normalized value can then be brought to another range by simple multiplications/additions
 *
 * <p>Ex.:
 * <ul>
 *  <li>norm(50, 0, 100) and norm(150, 100, 200) will both return 0.5</li>
 *  <li>norm(0.4, 0, 1) * 2 - 1;     //converts from a 0-1 range to a -1 to 1 range</li>
 *  <li>norm(67, 0, 100) * 255;      //converts from 0-100 range to a 0-255 range (RGB)</li>
 *  <li>norm(67, 0, 100) * 450 + 50; //converts from 0-100 range to a 50-500 range</li>
 * </ul></p>
 */
const norm = (value: number, min: number, max: number, clamped = false) => {
  const result = (value - min) / (max - min);
  return clamped ? clamp(result, 0, 1) : result;
};

/**
 * Linear interpolation
 *
 * <p>Interpolates a value within a range based on a normalized param</p>
 * <p><code>norm</code> argument should be a normalized (0 to 1) value</p>
 *
 * <p>Ex.:
 * <ul>
 *  <li>lerp(0.5, 0, 200)   // returns 100</li>
 *  <li>lerp(0.5, 400, 500) // returns 450</li>
 * </ul></p>
 */
const lerp = (value: number, min: number, max: number, clamped = false) => {
  const result = (max - min) * value + min;
  return clamped ? clamp(result, min, max) : result;
};

/**
 * Like <code>norm</code>, but you specify the new range right away. More concise if you're remapping to a new range.
 *
 * <ul><li>map(50, 0, 100, 500, 1000) // returns 750. The norm result is 0.5, and it's remapped to the 500-1000 range</li></ul>
 */
export const map = (
  value: number,
  sourceMin: number,
  sourceMax: number,
  destMin: number,
  destMax: number,
  clamped = false
) => {
  const result = lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
  return clamped ? clamp(result, destMin, destMax) : result;
};
