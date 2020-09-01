import { Effects } from './const';
import { isEffectSet, transformValueToRange } from './mapDataManipulationUtils';

export function runGainEffectFunction(rgbaArray: number[], effects: Effects): number[] {
  // change the values according to the algorithm (gain)
  const minValue = 0.0;
  const maxValue = 1.0;
  const gain = isEffectSet(effects.gain) ? effects.gain : 1.0;
  const factor = gain / (maxValue - minValue);
  let offset = 0.0;
  offset = offset - factor * minValue;

  if (gain === 1.0) {
    return rgbaArray;
  }

  const transformValueWithGain = (x: number): number => Math.max(0.0, x * factor + offset);
  for (let i = 0; i < rgbaArray.length; i += 4) {
    rgbaArray[i] = transformValueWithGain(rgbaArray[i]);
    rgbaArray[i + 1] = transformValueWithGain(rgbaArray[i + 1]);
    rgbaArray[i + 2] = transformValueWithGain(rgbaArray[i + 2]);
  }

  return rgbaArray;
}

export function runGammaEffectFunction(rgbaArray: number[], effects: Effects): number[] {
  // change the values according to the algorithm (gamma)
  const gamma = isEffectSet(effects.gamma) ? effects.gamma : 1.0;

  if (gamma === 1.0) {
    return rgbaArray;
  }

  const transformValueWithGamma = (x: number): number => Math.pow(x, gamma);
  for (let i = 0; i < rgbaArray.length; i += 4) {
    rgbaArray[i] = transformValueWithGamma(rgbaArray[i]);
    rgbaArray[i + 1] = transformValueWithGamma(rgbaArray[i + 1]);
    rgbaArray[i + 2] = transformValueWithGamma(rgbaArray[i + 2]);
  }

  return rgbaArray;
}

export function runColorEffectFunction(rgbaArray: number[], effects: Effects): number[] {
  for (let i = 0; i < rgbaArray.length; i += 4) {
    const red = rgbaArray[i];
    const green = rgbaArray[i + 1];
    const blue = rgbaArray[i + 2];

    if (isEffectSet(effects.redRange)) {
      rgbaArray[i] = transformValueToRange(red, effects.redRange.from, effects.redRange.to, 0, 1);
    }

    if (isEffectSet(effects.greenRange)) {
      rgbaArray[i + 1] = transformValueToRange(green, effects.greenRange.from, effects.greenRange.to, 0, 1);
    }

    if (isEffectSet(effects.blueRange)) {
      rgbaArray[i + 2] = transformValueToRange(blue, effects.blueRange.from, effects.blueRange.to, 0, 1);
    }
  }

  return rgbaArray;
}

export function runCustomEffectFunction(rgbaArray: number[], effects: Effects): number[] {
  if (!isEffectSet(effects.customEffect)) {
    return rgbaArray;
  }

  for (let i = 0; i < rgbaArray.length; i += 4) {
    const red = rgbaArray[i];
    const green = rgbaArray[i + 1];
    const blue = rgbaArray[i + 2];
    const alpha = rgbaArray[i + 3];

    const { r, g, b, a } = effects.customEffect({ r: red, g: green, b: blue, a: alpha });

    rgbaArray[i] = r;
    rgbaArray[i + 1] = g;
    rgbaArray[i + 2] = b;
    rgbaArray[i + 3] = a;
  }

  return rgbaArray;
}
