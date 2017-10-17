import { Kmeans } from 'clusterfck';
importScripts('kmeansJS.min.js');
/* global smartInit */

Kmeans.prototype.randomCentroids = smartInit;

function toColor(image, idx) {
  return [
    image.bitmap.data[idx + 0],
    image.bitmap.data[idx + 1],
    image.bitmap.data[idx + 2],
  ];
}

function toColors(image) {
  const colors = new Array(image.bitmap.height * image.bitmap.width);
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    colors[idx / 4] = toColor(image, idx);
  });
  return colors;
}

function classify(image, kmeans) {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
    const classification = kmeans.centroids[kmeans.classify(toColor(image, idx))];
    image.bitmap.data[idx + 0] = classification[0];
    image.bitmap.data[idx + 1] = classification[1];
    image.bitmap.data[idx + 2] = classification[2];
  });
}

export function cluster(image, colorQuantity) {
  if (colorQuantity) {
    const colors = toColors(image);
    const kmeans = new Kmeans();
    const clusters = kmeans.cluster(colors, colorQuantity);
    classify(image, kmeans);
  }
  return image;
}
