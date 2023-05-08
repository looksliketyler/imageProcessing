import { Request, Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';

import { FilePathObj, ImageRequestObj, ValidatedParams } from '../models/imageModels.model';

/** @description - GLOBAL VARIABLE - array that will be added to and used in index.ejs */
const viewData: object[] = [];

/**
 * @async
 * @description - function to run needed helper. called by get request with endpoint /processImage and needed params
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {<void>Promise}
 */
const processImage = async (req: Request, res: Response): Promise<void> => {
  const validatedParams: ValidatedParams = validateParams(req);
  if (!validatedParams.validated) {
    res.send(validatedParams.resMessage);
    return;
  }
  const imageObj: ImageRequestObj = createImageObjFromRequest(req);
  const filePathObj: FilePathObj = createFilePathObj(imageObj);
  // if image exists
  if (!filePathObj.pathExists) {
    sendHTMLContent(res, filePathObj.message, filePathObj.updatedFilePath, imageObj, filePathObj.pathExists);
    return;
  }
  const resMessage = await createNewImage(imageObj, filePathObj);
  sendHTMLContent(res, resMessage, filePathObj.updatedFilePath, imageObj, filePathObj.pathExists);
};

/**
 * @async
 * @description - helper function to create new image. uses sharp api
 * @param {ImageRequestObj} imageObj - object of passed image info
 * @param {FilePathObj} filePathObj - object for filepath info
 * @returns {Promise<string>} - generated message to return to html
 */
const createNewImage = async (imageObj: ImageRequestObj, filePathObj: FilePathObj): Promise<string> => {
  const originalFilePath = `src/assets/originals/${imageObj.imageName}.jpg`;
  if (imageObj.options.grayscale) {
    await sharp(`${originalFilePath}`).resize(imageObj.options.resize).grayscale().jpeg().toFile(`${filePathObj.updatedFilePath}`);
  } else {
    await sharp(`${originalFilePath}`).resize(imageObj.options.resize).jpeg().toFile(`${filePathObj.updatedFilePath}`);
  }
  return `New Image Created and Added to Gallery - ${imageObj.imageName}_${imageObj.id}!`;
};

/**
 * @description - creates the file path object for use in file
 * @param {ImageRequestObj} imageObj - object of passed image info
 * @returns {FilePathObj} - newly created file path object
 */
const createFilePathObj = (imageObj: ImageRequestObj): FilePathObj => {
  const updatedFilePath = `src/assets/updated/${imageObj.imageName}_${imageObj.id}.jpg`;
  return {
    pathExists: fs.existsSync(updatedFilePath) ? false : true,
    message: fs.existsSync(updatedFilePath) ? 'Image exists in Gallery!' : '',
    updatedFilePath,
  };
};

/**
 * @description - created image object used in file from http request params
 * @param {Request} req - http request
 * @returns {ImageRequestObj} - newly created image object
 */
const createImageObjFromRequest = (req: Request): ImageRequestObj => {
  return {
    imageName: req.params.imageName,
    id: req.params.newImageId,
    options: {
      resize: {
        width: parseInt(req.params.width),
        height: parseInt(req.params.height),
      },
      grayscale: req.params.grayscale === 'true' ? true : false,
    },
  };
};

/**
 * @description - helper function to validate passed params will work in file
 * @param {Request} req - http request
 * @returns {ValidatedParams}
 */
const validateParams = (req: Request): ValidatedParams => {
  const params = req.params;
  const imageNameArr = ['tree', 'mountainView'];
  let validated = false;
  let resMessage = '';
  // verify passed imageName is usable
  for (let i = 0; i < imageNameArr.length; i++) {
    resMessage = `${params.imageName} is not a known image`;
    if (params.imageName === imageNameArr[i]) {
      validated = true;
      break;
    }
  }
  // verify width/height is a numer and is between 0-1000
  if (+params.width > 1000 || +params.width <= 0 || +params.height > 1000 || +params.height <= 0) {
    validated = false;
    resMessage = `${resMessage} width/height must be greater than 0 and smaller than 1000`;
  }
  return { validated, resMessage };
};

/**
 * @description - function that generates html data and image, tells user new image has been created. will not generate
 * new image and pass to gallery if the file path already exists
 * @param {Response} res -http request
 * @param {string} resMessage - response message to send to user
 * @param {string} filePath - file path of new image
 * @param {ImageRequestObj} imageObj - object of image data passed
 * @param {boolean} pathExists - whether or not current image file path exists
 * @returns {void}
 */
const sendHTMLContent = (res: Response, resMessage: string, filePath: string, imageObj: ImageRequestObj, pathExists: boolean): void => {
  filePath = filePath.slice(3);
  const htmlInfo = `
    <h2>${resMessage}</h2>
    <br><hr><br>
    <ul>
      <li>Image Used: ${imageObj.imageName}</li>
      <li>Passed ID: ${imageObj.id}</li>
      <li>Options:</li>
        <ul>
          <li>Height: ${imageObj.options.resize.height}</li>
          <li>Width: ${imageObj.options.resize.width}</li>
          <li>Grayscale: ${imageObj.options.grayscale}</li>
        </ul>
    </ul>
    <br><hr><hr><br>
    <img src='${filePath}' alt="new image">
  `;
  if (pathExists) {
    const viewDataObj = { imageObj, filePath };
    viewData.push(viewDataObj);
  }
  res.send(htmlInfo);
};

export default { processImage, createNewImage, viewData };
