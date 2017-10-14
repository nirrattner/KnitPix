export function opaque(image) {
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    if (image.bitmap.data[idx + 3] !== 255) {
      image.bitmap.data[idx + 0] = 255;
      image.bitmap.data[idx + 1] = 255;
      image.bitmap.data[idx + 2] = 255;
      image.bitmap.data[idx + 3] = 255;
    }
  });
  return image;
}