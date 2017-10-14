export function byHeight(stitchesHigh, originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  const stitchesWide = hasGaugeAdjustments && gaugeHigh && gaugeWide
    ? Math.round(stitchesHigh * gaugeHigh * originalImage.bitmap.width / originalImage.bitmap.height / gaugeWide)
    : Math.round(stitchesHigh * originalImage.bitmap.width / originalImage.bitmap.height);
  return {
    isHeightLastModified: true,
    stitchesHigh,
    stitchesWide,
  };
}

export function byWidth(stitchesWide, originalImage, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  const stitchesHigh = hasGaugeAdjustments && gaugeHigh && gaugeWide
    ? Math.round(stitchesWide * gaugeWide * originalImage.bitmap.height / originalImage.bitmap.width / gaugeHigh)
    : Math.round(stitchesWide * originalImage.bitmap.height / originalImage.bitmap.width);
  return {
    isHeightLastModified: false,
    stitchesHigh,
    stitchesWide,
  };
}