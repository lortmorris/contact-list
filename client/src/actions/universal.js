import config from '../config';

const fetch = (module, payload, microservice = 'service') => ({
  ...payload,
  type: 'UNIVERSAL_FETCH_MODULE',
  host: config.ENDPOINT_URL,
  microservice,
  module,
});

const fetchSuccess = (module, payload) => ({
  type: 'FETCH_MODULE_SUCCESS',
  module,
  payload,
});

const requestError = (module, payload) => ({
  type: 'FETCH_MODULE_ERROR',
  module,
  payload,
});

const remove = (module, payload, microservice = 'service') => ({
  ...payload,
  type: 'UNIVERSAL_REMOVE_MODULE',
  host: config.ENDPOINT_URL,
  module,
  method: 'delete',
  microservice,
});

const update = (module, payload, microservice = 'service') => ({
  type: 'UNIVERSAL_UPDATE_MODULE',
  host: config.ENDPOINT_URL,
  module,
  method: 'patch',
  microservice,
  data: payload.data,
});

const updateSuccess = payload => ({
  type: 'UPDATE_MODULE_SUCCESS',
  host: config.ENDPOINT_URL,
  module: payload.module,
  data: payload.data,
});

const insert = (module, payload, microservice = 'service') => ({
  ...payload,
  type: 'UNIVERSAL_INSERT_MODULE',
  host: config.ENDPOINT_URL,
  method: 'put',
  module,
  microservice,
});


export default {
  fetch,
  fetchSuccess,
  requestError,
  remove,
  update,
  insert,
  updateSuccess,
};
