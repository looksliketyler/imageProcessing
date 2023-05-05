import { Request, Response } from 'express';
import sharp from 'sharp';
import fs from 'fs';

import { ImageRequestObj, PathExists } from '../models/imageModels.model';

/** @description - global variable to assign message to response */
let resMessage: string;

/**
 * @description - helper function to check for request body. sets message to global variable for resMessage
 * and returns boolean value
 * @param {Response} req - http request
 * @returns {boolean}
 */
const checkRequest = (req: Request): boolean => {
  let hasBody = true;
  if (!req?.body) {
    resMessage = 'Request has no body!';
    hasBody = false;
  }
  return hasBody;
};

/**
 * @async
 * @description - function that creates imageObj from request body. passes to createNewImage function
 * to create image and returns response to user
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {Promise<void>}
 */
const changeImage = async (req: Request, res: Response): Promise<void> => {
  try {
    if (checkRequest(req)) {
      // assign values to image object
      const imageObj: ImageRequestObj = {
        id: req.body?.id || '',
        imageName: req.body?.imageName || '',
        options: req.body?.options || {},
      };
      resMessage = await createNewImage(imageObj);
      res.send(resMessage);
    } else {
      console.log('error');
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description - helper function to verify that either original image exists or new image path exists
 * if current path doesnt exists or new path already exists, we dont want to keep processing image
 * @param {string} imagePath - path determined from request body imageName
 * @param {string} newPath = path determined from request body id and imageName
 * @returns {PathExists}
 */
const verifyImagePathsExists = (imagePath: string, newPath: string): PathExists => {
  return {
    pathExists: !fs.existsSync(imagePath) ? false : fs.existsSync(newPath) ? false : true,
    message: !fs.existsSync(imagePath) ? 'This image does not exist!' : 'This image path already exists!',
  };
};

/**
 * @async
 * @description - function that uses imageObj. uses sharp api to edit an image based on parameters send in request body
 * @param {ImageRequestObj} imageObj - image info to edit and set
 * @returns {Promise<string>}
 */
const createNewImage = async (imageObj: ImageRequestObj): Promise<string> => {
  if (imageObj.id && imageObj.imageName && Object.values(imageObj.options.resize).length > 0) {
    const originalFilePath = `src/assets/originals/${imageObj.imageName}.jpg`;
    const updatedFilePath = `src/assets/updated/${imageObj.imageName}_${imageObj.id}.jpg`;

    const imagePathCheck: PathExists = verifyImagePathsExists(originalFilePath, updatedFilePath);
    if (!imagePathCheck.pathExists) {
      return imagePathCheck.message;
    }

    // truthy checking that the resize object has content
    if (imageObj.options.grayscale) {
      await sharp(`${originalFilePath}`)
        .resize(imageObj.options.resize)
        .grayscale()
        .jpeg()
        .toFile(`${updatedFilePath}`);
    } else {
      await sharp(`${originalFilePath}`).resize(imageObj.options.resize).jpeg().toFile(`${updatedFilePath}`);
    }
    return `New Image Created - ${imageObj.imageName}_${imageObj.id}!`;
  } else {
    return 'Resize object is missing width and/or height!';
  }
};

export default { changeImage, createNewImage };
