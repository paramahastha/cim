const api_url = 'http://localhost:8080/api';

// company endpoint
export const company = () => `${api_url}/company`;
export const company_by_id = id => `${api_url}/company/${id}`;
// office endpoint
export const office = () => `${api_url}/office`;
export const office_by_id = id => `${api_url}/office/${id}`;
