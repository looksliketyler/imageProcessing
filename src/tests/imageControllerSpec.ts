import fs from 'fs';

import * as functions from '../controllers/imageController';
import { ImageRequestObj } from '../models/imageModels.model';

const imageObj: ImageRequestObj = {
  id: '1921681254',
  imageName: 'tree',
  options: {
    resize: { width: 300, height: 500 },
    grayscale: true,
  },
};
const updatedFilePath = `src/assets/updated/${imageObj.imageName}_${imageObj.id}.jpg`;

describe('A function to change an image from changeImage endpoint', () => {
  it('should create a new image dynamically.', async () => {
    const result = await functions.default.createNewImage(imageObj);
    expect(result).toMatch('New Image Created - tree_1921681254!');
    // fs.unlink used to delete newly generated image as running jasmine test again will fail
    fs.unlink(updatedFilePath, () => {
      console.log('deleted file');
    });
  });
});
