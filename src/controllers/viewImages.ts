import { Request, Response } from 'express';

import * as viewData from './processImage';

/**
 * @description - renders an ejs template - index.ejs - and sends an array of image info
 * @param {Request} req - http request
 * @param {Response} res - http response
 * @returns {void}
 */
const viewImages = (req: Request, res: Response): void => {
  res.render('index', { viewData: viewData.default.viewData });
};

export default { viewImages };
