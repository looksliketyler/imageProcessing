# Image Processing

an express project that edits an image

# Endpoints

-this endpoint was created first to use a request body payload. once completed i realized project
should use get request
`app.post('/changeImage', postFunction.default.changeImage);`

-imageName will either be 'tree' or 'mountainView'. grayscale should be sent as false/true
-example: http://localhost:3000/processImage/mountainView/6/200/200/false
`app.get('/processImage/:imageName/:newImageId/:width/:height/:grayscale', getFunction.default.processImage);`

-viewImages will render index.ejs and show original images and a gallery of new ones
`app.get('/viewImages', viewImages.default.viewImages);`

# Run Server

run `npm run start` to start the server and navigate to `http://localhost:3000` to view response messages and send get request

# Run Lint/Prettier

run lint with `npm run lint` and prettier with `npm run prettier`

# Compile

run `npm run build` to compile ts into js

# Test

run `npm run test` to run jasmine testing

# Author

Tyler Regan - looksliketyler@gmail.com
