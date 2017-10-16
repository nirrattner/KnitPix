export function toSource(image) {
  return new Promise(function(resolve, reject) {
    image.getBase64(image.getMIME(), function(error, source) {
      if (error) {
        reject(error);
      } else {
        resolve(source);
      }
    });
  });
}