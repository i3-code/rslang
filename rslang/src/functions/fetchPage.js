import axios from 'axios';
import urls from '../constants/urls';

const cache = {};

export const fetchPage = async (groupNum = 0, pageNum = 1) => {
  const request = `${urls.words.all}?group=${groupNum}&page=${pageNum - 1}`;
  if (cache[request]) return cache[request];
  return new Promise((resolve, reject) => {
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
