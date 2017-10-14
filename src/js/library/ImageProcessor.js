import Jimp from './Jimp';

import * as ImageOpaquer from './image-processing/ImageOpaquer';
import * as GridRenderer from './image-processing/GridRenderer';

export function opaque(image) {
  return new Promise((resolve, reject) =>
    setTimeout(() => resolve(ImageOpaquer.opaque(image)), 0));
}

export function update(originalImage, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      const cappedStitchesHigh = Math.min(stitchesHigh, originalImage.bitmap.height);
      const cappedStitchesWide = Math.min(stitchesWide, originalImage.bitmap.width);
      const modifiedImage = originalImage
        .clone()
        .resize(cappedStitchesWide, cappedStitchesHigh, Jimp.RESIZE_NEAREST_NEIGHBOR)
        .resize(originalImage.bitmap.width, originalImage.bitmap.height, Jimp.RESIZE_NEAREST_NEIGHBOR);
      resolve(GridRenderer.renderGrid(modifiedImage, gridColor, cappedStitchesHigh, cappedStitchesWide));
    }, 0));
}
