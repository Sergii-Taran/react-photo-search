import axios from 'axios';

axios.defaults.baseURL = 'https://api.pexels.com/v1/';
axios.defaults.headers.common['Authorization'] =
  import.meta.env.VITE_PEXELS_API_KEY;

axios.defaults.params = {
  orientation: 'landscape',
};
