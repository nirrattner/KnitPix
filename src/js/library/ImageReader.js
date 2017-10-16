import Jimp from './Jimp';

export function readImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      Jimp.read(reader.result)
        .then(resolve)
        .catch(reject);
    });
    reader.addEventListener('error', error => reject(error));
    reader.readAsArrayBuffer(file);
  });
}
