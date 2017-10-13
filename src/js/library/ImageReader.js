import Jimp from './Jimp';

export function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      resolve(Jimp.read(reader.result));
    });
    reader.addEventListener('error', error => reject(error));
    reader.readAsArrayBuffer(file);
  });
}

export function toImageSource(image) {
  return new Promise((resolve, reject) => {
    image.getBase64(Jimp.AUTO, (error, source) => {
      if (error) {
        reject(error);
      } else {
        resolve(source);
      }
    })
  });
}
