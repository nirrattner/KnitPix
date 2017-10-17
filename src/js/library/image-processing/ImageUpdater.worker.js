import 'babel-polyfill';
/* global Jimp */
importScripts('jimp.min.js');

import * as ImageSerializer from '../ImageSerializer';
import * as ImageUpdater from './ImageUpdater';

self.onmessage = ({ data: { imageBuffer, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide }}) => {
  Jimp.read(imageBuffer.buffer)
    .then(image => ImageUpdater.update(image, colorQuantity, gridColor, stitchesHigh, stitchesWide, hasGaugeAdjustments, gaugeHigh, gaugeWide))
    .then(ImageSerializer.toSource)
    .then(imageSource => {
      self.postMessage(imageSource);
      self.close();
    });
};
