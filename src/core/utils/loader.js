export const loadImage = url =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      console.log('Image Loaded', img);
      resolve(img);
    };
    img.onerror = e => {
      console.error(e);
      reject();
    };
    img.src = url;
  });

export default { loadImage };
