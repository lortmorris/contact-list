const request = require('supertest');

const MyApp = require('../app');

const apiPath = '/services';
const doSearch = path => `${apiPath}${path}?page=1&limit=30`;


const runTest = up => () => {
  request(up.app)
    .get(doSearch('/contacts'))
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      if (err) throw err;
      console.info(res.body);
    });
};

const initTest = up => setTimeout(runTest(up), 1000);

MyApp(initTest);
