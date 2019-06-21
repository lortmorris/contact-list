import axios from 'axios';
import config from '../config';

const BASE_URL = config.ENDPOINT_URL;

const headers = (token) => {
  if (token) axios.defaults.headers.common['x-access-token'] = token;
  axios.defaults.headers.common.Accept = 'application/json';
};

export default async (params) => {
  headers(params.token || '');
  if (params.headers) {
    Object.keys(params.headers).forEach((k) => {
      (axios.defaults.headers.common[k] = params.headers[k]);
      return true;
    });
  }

  const options = {
    method: params.method.toLowerCase(),
    url: [params.microservice, params.module].join('/'),
    baseURL: BASE_URL,
  };
  if (params.query && Object.keys(params.query).length > 0) options.params = { ...params.query };
  if (params.data && Object.keys(params.data).length > 0) options.data = { ...params.data };
  try {
    const data = await axios.request(options);
    return Promise.resolve(data);
  } catch (err) {
    return Promise.reject(err);
  }
};
