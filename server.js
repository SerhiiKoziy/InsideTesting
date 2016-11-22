var mockServer = require('node-mock-server');
mockServer({
  restPath: __dirname + '/mock/',
  dirName: __dirname + '/mock/',
  title: 'Api mock server',
  version: 2,
  urlBase: 'http://localhost:3003',
  urlPath: '/rest/v2',
  port: 3003,
});