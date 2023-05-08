import fs from 'fs';

import * as functions from '../controllers/processImage';
import { FilePathObj, ImageRequestObj } from '../models/imageModels.model';

const imageObj: ImageRequestObj = {
  id: '1921681254',
  imageName: 'tree',
  options: {
    resize: { width: 300, height: 500 },
    grayscale: true,
  },
};

const updatedFilePath = `src/assets/updated/${imageObj.imageName}_${imageObj.id}.jpg`;

const filePathObj: FilePathObj = {
  pathExists: true,
  message: '',
  updatedFilePath,
};

describe('A function to create an image from endpoint processImage', () => {
  it('should create a new image dynamically.', async () => {
    const result = await functions.default.createNewImage(imageObj, filePathObj);
    expect(result).toMatch('New Image Created and Added to Gallery - tree_1921681254!');
    // fs.unlink used to delete newly generated image as running jasmine test again will fail
    fs.unlink(updatedFilePath, () => {
      console.log('deleted file');
    });
  });
});
