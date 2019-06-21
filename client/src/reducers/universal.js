
const initialState = {
  toggles: { openNotification: false },
  storages: {},
  temporalStates: {},
  request: {
    error: false,
    process: false,
  },
};

const Universal = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_MODULE':
      return Object.assign({}, {
        request: {
          error: false,
          process: true,
        },
      });

    case 'FETCH_REQUEST_END':
      return { ...state, request: { ...state.request, process: false } };

    case 'UPDATE_MODULE_SUCCESS':
      return state;

    case 'FETCH_MODULE_SUCCESS':
      return Object.assign({}, state, {
        [(action.module === 'uniques' ? `unique-${action.payload.query.prop}` : action.module)]: {
          docs: action.payload.data.docs,
          page: action.payload.data.page,
          limit: action.payload.data.limit,
          totalPages: action.payload.data.totalPages,
          query: action.payload.query,
          count: action.payload.data.count,
        },
        request: {
          error: false,
          process: false,
        },
      });

    case 'FETCH_MODULE_ERROR':
      return Object.assign({}, state, {
        request: {
          error: true,
          msg: action.payload.error,
          process: false,
        },
      });

    default:
      return state;
  }
};

export default Universal;
