function range(start, end, increment) {
  const array = new Array(1 + Math.floor((end - start) / increment));
  for (let i = 0; i < array.length; i++) {
    array[i] = Math.round(start) + Math.round(i * increment);
  }
  return array;
}

function colorHexToInts(color) {
  const colorInt = parseInt(color.substring(1), 16);
  const red = (colorInt >> 16) & 0xFF;
  const green = (colorInt >> 8) & 0xFF;
  const blue = colorInt & 0xFF;
  return [red, green, blue];
}

export function renderGrid(image, gridColor, stitchesHigh, stitchesWide) {
  const [gridRed, gridGreen, gridBlue] = colorHexToInts(gridColor);
  const gridHeight = image.bitmap.height / stitchesHigh;
  const gridWidth = image.bitmap.width / stitchesWide;

  const horizontalLinePixels = range(gridHeight, image.bitmap.height, gridHeight);
  const veritcalLinePixels = range(gridWidth, image.bitmap.width, gridWidth);

  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    if (horizontalLinePixels.includes(y) || veritcalLinePixels.includes(x)) {
      image.bitmap.data[ idx + 0 ] = gridRed;
      image.bitmap.data[ idx + 1 ] = gridGreen;
      image.bitmap.data[ idx + 2 ] = gridBlue;
    }
  });
  return image;
}
