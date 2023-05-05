import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

import { FilePathObj, ImageRequestObj } from '../models/imageModels.model';

let resMessage: string;

const processImage = async (req: Request, res: Response): Promise<void> => {
  // create object
  const imageObj: ImageRequestObj = createImageObjFromRequest(req);

  // early return statement
  const filePathObj: FilePathObj = verifyImagePathsExists(imageObj);
  if (!filePathObj.pathExists) {
    res.send(filePathObj.message);
    return;
  }

  resMessage = await createNewImage(imageObj, filePathObj);
  res.send(resMessage);
};

const createNewImage = async (imageObj: ImageRequestObj, filePathObj: FilePathObj): Promise<string> => {
  if (imageObj.options.grayscale) {
    await sharp(`${filePathObj.originalFilePath}`)
      .resize(imageObj.options.resize)
      .grayscale()
      .jpeg()
      .toFile(`${filePathObj.updatedFilePath}`);
  } else {
    await sharp(`${filePathObj.originalFilePath}`)
      .resize(imageObj.options.resize)
      .jpeg()
      .toFile(`${filePathObj.updatedFilePath}`);
  }
  return `New Image Created - ${imageObj.imageName}_${imageObj.id}!<br><hr><br>File path - ${filePathObj.updatedFilePath}`;
};

const verifyImagePathsExists = (imageObj: ImageRequestObj): FilePathObj => {
  const originalFilePath = `src/assets/originals/${imageObj.imageName}.jpg`;
  const updatedFilePath = `src/assets/updated/${imageObj.imageName}_${imageObj.id}.jpg`;
  return {
    pathExists: !fs.existsSync(originalFilePath) ? false : fs.existsSync(updatedFilePath) ? false : true,
    message: !fs.existsSync(originalFilePath) ? 'This image does not exist!' : 'This image path already exists!',
    originalFilePath,
    updatedFilePath,
  };
};

const createImageObjFromRequest = (req: Request): ImageRequestObj => {
  return {
    imageName: req.params.imageName,
    id: req.params.newImageId,
    options: {
      resize: {
        width: parseInt(req.params.width),
        height: parseInt(req.params.height),
      },
      grayscale: Boolean(req.params.grayscale),
    },
  };
};

export default { processImage, createNewImage };
