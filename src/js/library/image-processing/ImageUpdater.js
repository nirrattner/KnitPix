/* global Jimp */
import * as GridRenderer from './GridRenderer';
import * as ColorClusterer from './ColorClusterer';

export function update(originalImage, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  const cappedStitchesHigh = Math.min(stitchesHigh, originalImage.bitmap.height);
  const cappedStitchesWide = Math.min(stitchesWide, originalImage.bitmap.width);
  const smallImage = originalImage
    .clone()
    .resize(cappedStitchesWide, cappedStitchesHigh, Jimp.RESIZE_NEAREST_NEIGHBOR);
  const modifiedImage = ColorClusterer.cluster(smallImage, colorQuantity)
    .resize(originalImage.bitmap.width, originalImage.bitmap.height, Jimp.RESIZE_NEAREST_NEIGHBOR);
  return GridRenderer.renderGrid(modifiedImage, gridColor, cappedStitchesHigh, cappedStitchesWide);
}
