import axios from 'axios';
import urls from '../constants/urls';

const cache = {};

export const fetchPage = async (groupNum = 0, pageNum = 0) => {
  const request = `${urls.words.all}?group=${groupNum}&page=${pageNum}`;
  return new Promise((resolve, reject) => {
    if (cache[request]) resolve(cache[request]);
    axios
      .get(request)
      .then((response) => {
        cache[request] = response.data;
        resolve(cache[request]);
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  });
};

export default fetchPage;
