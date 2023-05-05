import express from 'express';

import * as postFunction from './controllers/imageController';
import * as getFunction from './controllers/processImage';

const app: express.Express = express();
const port = 3000;

app.use(express.json());
app.use(express.static('src'));

// post request - uses changeImage endpoint and calls the controller changeImage
// didnt realize this should be get request so it can be ran in browser.
// leaving here as it passes all tests
app.post('/changeImage', postFunction.default.changeImage);

app.get('/processImage/:imageName/:newImageId/:width/:height/:grayscale', getFunction.default.processImage);

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
