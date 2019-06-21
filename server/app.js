const http = require('http');
const express = require('express');
const path = require('path');
const config = require('config');
const up = require('universal-pattern');

const hooks = require('./hooks');
const controllers = require('./controllers');

const port = config.get('port');
const app = express();
const server = http.createServer(app);


app.use(express.static('assets'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range, apikey, x-access-token');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  return next();
});


const MyApp = (cb) => {
  up(app, {
    swagger: {
      baseDoc: config.get('basePath'),
      host: `${config.get('host')}:${config.get('port')}`,
      folder: path.join(process.cwd(), 'swagger'),
      info: {
        version: 1.0,
        title: 'Contacts List',
        termsOfService: 'www.domain.com/terms',
        contact: {
          email: 'cesarcasas@bsdsolutions.com.ar',
        },
        license: {
          name: 'Apache License',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
        },
      },
    },
    compress: true,
    cors: true,
    database: {
      uri: config.get('connection.mongodb.uri'),
    },
  })
    .then((upInstance) => {
      hooks(upInstance);
      controllers(upInstance);
      cb(upInstance);
    })
    .catch(err => console.error('Error initializing ', err));
};

if (require.main === module) {
  console.info('is main module');
  MyApp(() => server.listen(port, () => console.info(`listen *:${port}`)));
}

module.exports = MyApp;
