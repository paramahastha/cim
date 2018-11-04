import * as api from '../services/index';
import axios from 'axios';

export const listCompanies = () => dispatch => {
  return axios({
    method: 'GET',
    url: api.company(),
  })
    .then(res => dispatch(listCompaniesSuccess(res.data)))

    .catch(err =>
      listCompaniesFailure({
        title: 'Company',
        message: err.response.data.message,
      }),
    );
};

export const listCompaniesSuccess = payload => {
  return { type: 'LIST_COMPANIES_SUCCESS', payload };
};
export const listCompaniesFailure = notif => {
  return { type: 'LIST_COMPANIES_FAILURE', notif };
};

export const getCompany = id => dispatch => {
  return axios({
    method: 'GET',
    url: api.company_by_id(id),
  })
    .then(res => dispatch(getCompanySuccess(res.data)))

    .catch(err =>
      getCompanyFailure({
        title: 'Company',
        message: err.response.data.message,
      }),
    );
};

export const getCompanySuccess = payload => {
  return { type: 'GET_COMPANY_SUCCESS', payload };
};
export const getCompanyFailure = notif => {
  return { type: 'GET_COMPANY_FAILURE', notif };
};

export const createCompany = data => dispatch => {
  return axios({
    method: 'POST',
    url: api.company(),
    data,
  })
    .then(res =>
      dispatch(
        createCompanySuccess({
          title: 'Company',
          message: 'Create Company Successfully',
          level: 'success',
        }),
      ),
    )

    .catch(err =>
      createCompanyFailure({
        title: 'Company',
        message: err.response.data.message,
        level: 'error',
      }),
    );
};

export const createCompanySuccess = notif => {
  return { type: 'CREATE_COMPANY_SUCCESS', notif };
};
export const createCompanyFailure = notif => {
  return { type: 'CREATE_COMPANY_FAILURE', notif };
};

export const removeCompany = id => dispatch => {
  return axios({
    method: 'DELETE',
    url: api.company_by_id(id),
  })
    .then(res =>
      dispatch(
        removeCompanySuccess({
          title: 'Company',
          message: 'Remove Company Successfully',
          level: 'success',
        }),
      ),
    )

    .catch(err =>
      removeCompanyFailure({
        title: 'Company',
        message: err.response.data.message,
        level: 'error',
      }),
    );
};

export const removeCompanySuccess = notif => {
  return { type: 'REMOVE_COMPANY_SUCCESS', notif };
};
export const removeCompanyFailure = notif => {
  return { type: 'REMOVE_COMPANY_FAILURE', notif };
};
