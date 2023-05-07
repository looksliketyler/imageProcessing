import fs from 'fs';
import path from 'path';

/**
 * @description - function used in callback of app.listen. this function checks for images in the updated folder.
 * if those images are found we remove them on start up as we dont want to keep every image. images should only be kept
 * as long as server is running to avoid creating a large file size
 * @param {number} port - port number server running on
 * @returns {void}
 */
const listen = (port: number): void => {
  const dirname: string = path.join(__dirname, '..');
  console.log(`Listening on port ${port}...`);
  fs.readdir(`${dirname}/assets/updated`, (err, files) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log(`${files.length} image(s) being removed.`);
    files.forEach((file) => {
      console.log(`Removing ${file}`);
      fs.unlink(`${dirname}/assets/updated/${file}`, () => {
        // do nothing
      });
    });
  });
};

export default { listen };
