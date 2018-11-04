const initialState = {
  companyList: [],
  companyData: { company: {}, offices: [] },
  notif: { title: '', message: '', level: '' },
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LIST_COMPANIES_SUCCESS':
      return {
        ...state,
        companyList: action.payload,
      };
    case 'LIST_COMPANIES_FAILURE':
      return { ...state, notif: action.notif };
    case 'GET_COMPANY_SUCCESS':
      return {
        ...state,
        companyData: {
          company: action.payload.company,
          offices: action.payload.offices,
        },
      };
    case 'GET_COMPANY_FAILURE':
      return { ...state, notif: action.notif };

    case 'CREATE_COMPANY_SUCCESS':
      return {
        ...state,
        notif: action.notif,
      };
    case 'CREATE_COMPANY_FAILURE':
      return { ...state, notif: action.notif };
    case 'REMOVE_COMPANY_SUCCESS':
      return {
        ...state,
        notif: action.notif,
      };
    case 'REMOVE_COMPANY_FAILURE':
      return { ...state, notif: action.notif };
    default:
      return state;
  }
};
