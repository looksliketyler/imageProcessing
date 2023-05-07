import express from 'express';

import * as postFunction from './controllers/imageController';
import * as processImage from './controllers/processImage';
import * as viewImages from './controllers/viewImages';
import * as listenFunctions from './controllers/listenController';

const app: express.Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static('src'));
app.set('view engine', 'ejs');

// post request - uses changeImage endpoint and calls the controller changeImage
// didnt realize this should be get request so it can be ran in browser.
// leaving here as it passes all tests
app.post('/changeImage', postFunction.default.changeImage);

// endpoint for creating/processing the image
app.get('/processImage/:imageName/:newImageId/:width/:height/:grayscale', processImage.default.processImage);

// endpoint to load all images on a page
app.get('/viewImages', viewImages.default.viewImages);

app.listen(port, () => {
  listenFunctions.default.listen(port);
});
