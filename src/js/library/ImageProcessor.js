import * as ImageOpaquer from './image-processing/ImageOpaquer';

// eslint-disable-next-line import/no-webpack-loader-syntax
const ImageUpdaterWorker = require('worker-loader!./image-processing/ImageUpdater.worker.js');

export function opaque(image) {
  return new Promise((resolve, reject) =>
    resolve(ImageOpaquer.opaque(image)));
}

export function update(originalImage, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide) {
  return new Promise((resolve, reject) => {
    const worker = new ImageUpdaterWorker();
    worker.addEventListener('message', ({ data }) => resolve(data));
    originalImage.getBuffer(originalImage.getMIME(), (error, imageBuffer) => {
      if (error) {
        reject(error);
      } else {
        worker.postMessage({imageBuffer, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide});
      }
    })
  });
}