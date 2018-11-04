const initialState = {
  officeList: [],
  officeData: {},
  notif: { title: '', message: '', level: '' },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LIST_OFFICES_SUCCESS':
      return {
        ...state,
        officeList: action.payload,
      };
    case 'LIST_OFFICES_FAILURE':
      return { ...state, notif: action.notif };
    case 'GET_OFFICE_SUCCESS':
      return {
        ...state,
        officeData: action.payload,
      };
    case 'GET_OFFICE_FAILURE':
      return { ...state, notif: action.notif };

    case 'CREATE_OFFICE_SUCCESS':
      return {
        ...state,
        notif: action.notif,
      };
    case 'CREATE_OFFICE_FAILURE':
      return { ...state, notif: action.notif };
    case 'REMOVE_OFFICE_SUCCESS':
      return {
        ...state,
        notif: action.notif,
      };
    case 'REMOVE_OFFICE_FAILURE':
      return { ...state, notif: action.notif };
    default:
      return state;
  }
};
