
const initialState = {
  docs: [],
  filter: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CONTACTS_LIST_DOCS':
      return { ...state, docs: action.payload.data.docs };

    case 'REMOVE_CONTACT':
      return { ...state, docs: state.docs.filter(c => c._id !== action.payload.data._id) };

    case 'ADD_NEW_CONTACT':
      console.info('payload: ', action.payload);
      return {
        ...state,
        docs: [
          ...state.docs,
          { ...action.payload.data },
        ],
      };
    default:
      return state;
  }
};

export default reducer;
