/* global Jimp */
import * as GridRenderer from './GridRenderer';

export function update(originalImage, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  const cappedStitchesHigh = Math.min(stitchesHigh, originalImage.bitmap.height);
  const cappedStitchesWide = Math.min(stitchesWide, originalImage.bitmap.width);
  const modifiedImage = originalImage
    .clone()
    .resize(cappedStitchesWide, cappedStitchesHigh, Jimp.RESIZE_NEAREST_NEIGHBOR)
    .resize(originalImage.bitmap.width, originalImage.bitmap.height, Jimp.RESIZE_NEAREST_NEIGHBOR);
  return GridRenderer.renderGrid(modifiedImage, gridColor, cappedStitchesHigh, cappedStitchesWide);
}
