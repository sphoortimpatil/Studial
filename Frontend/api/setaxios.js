import storage from '../auth/storage';

import axios from 'axios';

let instance = axios.create({
  headers: {
    post: {
      // can be common or any other method
      'x-auth-token': 'value1',
    },
  },
});

export default instance;
