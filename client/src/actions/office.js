import * as api from '../services/index';
import axios from 'axios';

export const listOffices = () => dispatch => {
  return axios({
    method: 'GET',
    url: api.office(),
  })
    .then(res => dispatch(listOfficesSuccess(res.data)))

    .catch(err =>
      listOfficesFailure({
        title: 'Office',
        message: err.response.data.message,
      }),
    );
};

export const listOfficesSuccess = payload => {
  return { type: 'LIST_OFFICES_SUCCESS', payload };
};
export const listOfficesFailure = notif => {
  return { type: 'LIST_OFFICES_FAILURE', notif };
};

export const getOffice = id => dispatch => {
  return axios({
    method: 'GET',
    url: api.office_by_id(id),
  })
    .then(res => dispatch(getOfficeSuccess(res.data)))

    .catch(err =>
      getOfficeFailure({
        title: 'Office',
        message: err.response.data.message,
      }),
    );
};

export const getOfficeSuccess = payload => {
  return { type: 'GET_OFFICE_SUCCESS', payload };
};
export const getOfficeFailure = notif => {
  return { type: 'GET_OFFICE_FAILURE', notif };
};

export const createOffice = data => dispatch => {
  return axios({
    method: 'POST',
    url: api.office(),
    data,
  })
    .then(res =>
      dispatch(
        createOfficeSuccess({
          title: 'Office',
          message: 'Create Office Successfully',
          level: 'success',
        }),
      ),
    )

    .catch(err =>
      createOfficeFailure({
        title: 'Office',
        message: err.response.data.message,
        level: 'error',
      }),
    );
};

export const createOfficeSuccess = notif => {
  return { type: 'CREATE_OFFICE_SUCCESS', notif };
};
export const createOfficeFailure = notif => {
  return { type: 'CREATE_OFFICE_FAILURE', notif };
};

export const removeOffice = id => dispatch => {
  return axios({
    method: 'DELETE',
    url: api.office_by_id(id),
  })
    .then(res =>
      dispatch(
        removeOfficeSuccess({
          title: 'Office',
          message: 'Remove Office Successfully',
          level: 'success',
        }),
      ),
    )

    .catch(err =>
      removeOfficeFailure({
        title: 'Office',
        message: err.response.data.message,
        level: 'error',
      }),
    );
};

export const removeOfficeSuccess = notif => {
  return { type: 'REMOVE_OFFICE_SUCCESS', notif };
};
export const removeOfficeFailure = notif => {
  return { type: 'REMOVE_OFFICE_FAILURE', notif };
};
