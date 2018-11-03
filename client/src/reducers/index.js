import { combineReducers } from 'redux';

import company from './company';
import office from './office';

export default combineReducers({
  company,
  office,
});
