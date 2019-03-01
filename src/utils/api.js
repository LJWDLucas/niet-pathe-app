import axios from 'axios';

export const api = axios.create();

export const get = config => api({
  method: 'GET',
  ...config
});

export const post = config => api({
  method: 'POST',
  ...config
});

export const del = config => api({
  method: 'DELETE',
  ...config
});

export const put = config => api({
  method: 'PUT',
  ...config
});
